/* eslint-disable unicorn/filename-case */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureResponderEvent } from 'react-native';
import { s } from 'react-native-size-matters';

import { COLORS, ICONS, VectorIcons } from '@/ui';

interface ISortFIlter {
  openSortModal: (event: GestureResponderEvent) => void;
  openFilterModal: (event: GestureResponderEvent) => void;
}

const SortFIlter = (props: ISortFIlter) => {
  const Navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <View style={[styles.iconStyle, { marginRight: s(6) }]}>
        <VectorIcons
          icon={ICONS.AntDesign}
          name="piechart"
          color={COLORS.Primary}
          size={s(25)}
          onPress={() => Navigation.navigate('TransactionsSummary')}
        />
      </View>
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
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
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
