/* eslint-disable unicorn/filename-case */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureResponderEvent } from 'react-native';
import { s } from 'react-native-size-matters';

import { COLORS, ICONS, TextInput, VectorIcons } from '@/ui';

interface ISortFIlter {
  openSortModal: (event: GestureResponderEvent) => void;
  openFilterModal: (event: GestureResponderEvent) => void;
}

const SortFIlter = (props: ISortFIlter) => {
  return (
    <View style={styles.container}>
      <TextInput
        containerStyle={styles.textInputContainerStyle}
        style={styles.textInputStyle}
        placeholder="search"
      />

      <View style={[styles.iconStyle, { marginRight: s(6) }]}>
        <VectorIcons
          icon={ICONS.MaterialIcons}
          name="sort"
          color={COLORS.Primary}
          size={s(25)}
          onPress={props.openSortModal}
        />
      </View>

      <View style={styles.iconStyle}>
        <VectorIcons
          icon={ICONS.FontAwesome}
          name="filter"
          color={COLORS.Primary}
          size={s(25)}
          onPress={props.openFilterModal}
        />
      </View>
    </View>
  );
};

export { SortFIlter };

const styles = StyleSheet.create({
  container: { width: '100%', flexDirection: 'row', alignItems: 'center' },
  iconStyle: {
    borderWidth: 1,
    borderColor: COLORS.Primary,
    borderRadius: s(6),
    width: s(35),
    height: s(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainerStyle: { flex: 1, marginRight: s(8) },
  textInputStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.Primary,
    borderRadius: s(6),
    height: s(35),
  },
});
