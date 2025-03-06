import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { vs } from 'react-native-size-matters';

import { Button, ScreenContainer, TextInput } from '@/ui';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');

  const createCategory = () => {};

  return (
    <ScreenContainer screenHeaderProps={{ title: 'Create Category' }}>
      <TextInput
        title="Category Name"
        value={categoryName}
        onChangeText={setCategoryName}
        placeholder="Enter Category Name"
        containerStyle={styles.topOffset}
      />

      <Button onPress={createCategory} style={styles.topOffset}>
        Create
      </Button>
    </ScreenContainer>
  );
};

export { CreateCategory };

const styles = StyleSheet.create({
  topOffset: { marginTop: vs(20) },
});
