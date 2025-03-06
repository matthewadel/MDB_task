import React from 'react';
import { StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { s, vs } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';

import { deleteCategory } from '@/store';
import { ICategory } from '@/types';
import {
  closeAlert,
  COLORS,
  ICONS,
  showAlert,
  Text,
  VectorIcons,
  View,
} from '@/ui';

export const CategroyCardHeight = vs(40);

const CategoryCard = ({ category }: { category: ICategory }) => {
  const dispatch = useDispatch();

  const deleteCategoryWarning = () => {
    showAlert({
      title: 'Are you sure?',
      message: `${category.label} Category Will Be Deleted!`,
      alertType: 'warning',
      onPress: deleteCategoryByID,
    });
  };

  const deleteCategoryByID = () => {
    dispatch(deleteCategory({ id: category.id }));
    closeAlert();
    setTimeout(() => {
      showMessage({
        message: 'Category Deleted Successfully',
      });
    }, 100);
  };

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelStyle}>{category.label}</Text>
      <VectorIcons
        icon={ICONS.Entypo}
        name="trash"
        color={COLORS.Red}
        size={s(15)}
        onPress={deleteCategoryWarning}
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
