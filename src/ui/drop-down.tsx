import React, { useState } from 'react';
import {
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  TextProps,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Popover as RNPopover } from 'react-native-modal-popover';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { s, vs } from 'react-native-size-matters';

import { ITouchableOpacity } from '@/types';
import {
  COLORS,
  CONSTANTS,
  ICONS,
  NoData,
  ShadowStyle,
  Text,
  TouchableOpacity,
  VectorIcons,
  View,
} from '@/ui';

interface IOption {
  id: number;
  label: string;
}

export interface IDropDown extends ITouchableOpacity {
  hasError?: boolean;
  showErrors?: boolean;
  errorMessage?: string;
  choose: Function;
  contentStyle?: ViewStyle;
  optionStyle?: ViewStyle;
  optionTextStyle?: TextProps;
  optionComponent?: Function;
  options: IOption[];
  selectedItem?: any;
  placeHolderComponentstyle?: any;
  placement?: any;
  placeholderTextStyle?: any;
  placeholder?: string;
  label?: string;
  labelStyle?: any;
}

const DropDown = (props: IDropDown) => {
  const { height: HEIGHT, width: WIDTH } = useWindowDimensions();
  const [showPopover, setShowPopover] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [selectedItem, setSelectedItem] = useState(props.selectedItem);
  const { top } = useSafeAreaInsets();

  let hasError = props?.showErrors && props?.hasError;

  const setButton = (e: LayoutChangeEvent) => {
    let { x, y, width, height } = e.nativeEvent.layout;

    setPopoverAnchor({ x, y: y + top + vs(45), width, height });
  };

  const openPopover = () => {
    setShowPopover(true);
  };

  const closePopover = () => setShowPopover(false);

  const renderPlaceholderComponent = () => {
    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.label,
            { color: hasError ? COLORS.Error : COLORS.Dark },
            props.labelStyle,
          ]}
        >
          {props.label}
        </Text>

        <TouchableOpacity onPress={openPopover} activeOpacity={0.8}>
          <Animatable.View
            animation={props?.showErrors ? 'shake' : ''}
            style={[
              styles.placeholderContainer,
              ShadowStyle,
              hasError ? styles.placehoderContainerErrorStyle : {},
              props.placeHolderComponentstyle,
            ]}
          >
            <Text
              style={[
                styles.placeholderText,
                {
                  color: selectedItem?.label
                    ? COLORS.Dark
                    : hasError
                      ? COLORS.Error
                      : '#A7A7A7',
                },
                props.placeholderTextStyle,
              ]}
            >
              {selectedItem?.label ? selectedItem?.label : props.placeholder}
            </Text>

            <VectorIcons
              icon={ICONS.Ionicons}
              name="caret-down-outline"
              color={hasError ? COLORS.Error : COLORS.Primary}
              size={s(20)}
            />
          </Animatable.View>
        </TouchableOpacity>

        {hasError && !!props?.errorMessage && (
          <Text style={styles.errorMsg}>*{props?.errorMessage}</Text>
        )}
      </View>
    );
  };

  return (
    <React.Fragment>
      {renderPlaceholderComponent()}
      <View onLayout={setButton} />

      <RNPopover
        contentStyle={[
          { width: WIDTH - 2 * CONSTANTS.PADDING_HORIZONTAL },
          styles.popoverContent,
          props.contentStyle,
        ]}
        arrowStyle={styles.popoverArrow}
        visible={showPopover}
        onClose={closePopover}
        fromRect={popoverAnchor}
        supportedOrientations={['portrait']}
        displayArea={{
          x: CONSTANTS.PADDING_HORIZONTAL,
          y: 0,
          width: WIDTH,
          height: HEIGHT,
        }}
        placement={'bottom'}
      >
        <ScrollView style={styles.scrollView}>
          {!props.options.length ? (
            <NoData style={styles.noData} />
          ) : (
            props.options.map((item: IOption, i: number) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  textStyle={[styles.optionText, props.optionTextStyle]}
                  onPress={() => {
                    closePopover();
                    setSelectedItem(item);
                    props.choose(item, i);
                  }}
                  style={[
                    styles.option,
                    {
                      borderBottomWidth: i === props.options.length - 1 ? 0 : 1,
                    },
                    props.optionStyle,
                  ]}
                >
                  {props.optionComponent
                    ? props.optionComponent(item)
                    : item.label}
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </RNPopover>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    width: '100%',
    fontWeight: 'bold',
  },
  placeholderContainer: {
    marginTop: vs(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: s(6),
    paddingHorizontal: s(8),
    height: vs(35),
  },
  placeholderText: {
    flex: 1,
    paddingVertical: 0,
    color: COLORS.PlaceholderTextColor,
  },
  popoverContent: {
    // position: 'relative',
    margin: 0,
    // paddingHorizontal: s(16),
    backgroundColor: COLORS.White,
    borderRadius: s(8),
  },
  popoverArrow: {
    borderTopColor: 'transparent',
  },
  scrollView: {
    maxHeight: s(200),
    width: '100%',
  },
  noData: {
    height: s(60),
  },
  option: {
    width: '100%',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    paddingVertical: s(10),
  },
  optionText: {
    fontSize: s(14),
  },
  errorMsg: {
    marginLeft: s(4),
    marginTop: vs(2),
    fontSize: s(12),
    color: COLORS.Error,
  },
  placehoderContainerErrorStyle: {
    borderWidth: 1,
    borderColor: COLORS.Red,
  },
});

export { DropDown };
