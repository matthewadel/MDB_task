import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { s, vs } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

import { CategoryCard } from '@/components';
import { addCategory } from '@/store';
import { ICategory, IRootState } from '@/types';
import { Button, ScreenContainer, Text, TextInput } from '@/ui';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const dispatch = useDispatch();

  const { Categories }: { Categories?: ICategory[] } = useSelector(
    (state: IRootState) => ({
      Categories: state.Categories.categories,
    }),
  );

  const createCategory = () => {
    dispatch(addCategory({ label: categoryName }));
    setCategoryName('');
    showMessage({
      message: 'Category Created Successfully',
    });
  };

  const renderCategory = ({ item }: { item: ICategory }) => {
    return <CategoryCard category={item} key={item.id} />;
  };

  return (
    <ScreenContainer screenHeaderProps={{ title: 'Create Category' }}>
      <TextInput
        title="Category Name"
        value={categoryName}
        onChangeText={setCategoryName}
        placeholder="Enter Category Name"
        containerStyle={styles.topOffset}
      />

      <Button
        disabled={!categoryName}
        onPress={createCategory}
        style={[styles.topOffset, styles.buttonStyle]}
      >
        Create
      </Button>

      <Text style={[styles.topOffset, styles.textStyle]}>
        Available Categories
      </Text>

      <FlatList data={Categories} renderItem={renderCategory} />
    </ScreenContainer>
  );
};

export { CreateCategory };

const styles = StyleSheet.create({
  topOffset: { marginTop: vs(20) },
  buttonStyle: { alignSelf: 'center', paddingHorizontal: s(30) },
  textStyle: { fontWeight: 'bold' },
});
