import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

import { CategoryCard, CategroyCardHeight } from '@/components';
import { useCategories } from '@/hooks';
import { ICategory, IRootState } from '@/types';
import { Button, FlatList, ScreenContainer, Text, TextInput } from '@/ui';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const { createCategory: createCategoryHook } = useCategories();
  const { Categories }: { Categories?: ICategory[] } = useSelector(
    (state: IRootState) => ({
      Categories: state.Categories.categories,
    }),
  );

  const createCategory = () => {
    createCategoryHook(categoryName);
    setCategoryName('');
  };

  const renderCategory = useCallback(({ item }: { item: ICategory }) => {
    return <CategoryCard category={item} key={item.id} />;
  }, []);

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

      <FlatList
        getItemLayout={(_, index) => ({
          length: CategroyCardHeight,
          offset: CategroyCardHeight * index,
          index,
        })}
        data={Categories}
        renderItem={renderCategory}
      />
    </ScreenContainer>
  );
};

export { CreateCategory };

const styles = StyleSheet.create({
  topOffset: { marginTop: vs(20) },
  buttonStyle: { alignSelf: 'center', paddingHorizontal: s(30) },
  textStyle: { fontWeight: 'bold' },
});
