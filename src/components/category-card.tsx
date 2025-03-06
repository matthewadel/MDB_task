import React from 'react';
import { StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { s, vs } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';

import { deleteCategory } from '@/store';
import { ICategory } from '@/types';
import { COLORS, ICONS, Text, VectorIcons, View } from '@/ui';

const CategoryCard = ({ category }: { category: ICategory }) => {
  const dispatch = useDispatch();

  const deleteCategoryByID = () => {
    dispatch(deleteCategory(category.id));
    showMessage({
      message: 'Category Deleted Successfully',
    });
  };

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelStyle}>{category.label}</Text>
      <VectorIcons
        icon={ICONS.Entypo}
        name="trash"
        color={COLORS.Red}
        size={s(15)}
        onPress={deleteCategoryByID}
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
    paddingHorizontal: s(5),
  },
  labelStyle: { flex: 1, marginBottom: vs(4) },
});
