import React from 'react';
import { StyleSheet } from 'react-native';
import { s, vs } from 'react-native-size-matters';

import { useCategories } from '@/hooks';
import { ICategory } from '@/types';
import { COLORS, ICONS, Text, VectorIcons, View } from '@/ui';

export const CategroyCardHeight = vs(40);

const CategoryCard = ({ category }: { category: ICategory }) => {
  const { deleteCategory: deleteCategoryHook } = useCategories();

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelStyle}>{category.label}</Text>
      <VectorIcons
        icon={ICONS.Entypo}
        name="trash"
        color={COLORS.Red}
        size={s(15)}
        onPress={() => deleteCategoryHook(category)}
      />
    </View>
  );
};

export { CategoryCard };

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BorderColor,
    paddingVertical: vs(6),
    height: CategroyCardHeight,
  },
  labelStyle: { flex: 1, marginBottom: vs(4) },
});
