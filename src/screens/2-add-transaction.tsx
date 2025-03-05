import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { vs } from 'react-native-size-matters';

import { Button, ScreenContainer, TextInput } from '@/ui';

const AddTransaction = () => {
  const [amount, setAmount] = useState('');
  // const [amountHasError, setAmountHasError] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const Navigation = useNavigation<any>();

  const validateInputs = () => {
    return false;
  };

  const addTransaction = () => {
    setShowErrors(false);
    if (validateInputs()) Navigation.goBack();
    else
      setTimeout(() => {
        setShowErrors(true);
      }, 100);
  };

  return (
    <ScreenContainer
      screenHeaderProps={{ title: 'Add Transaction' }}
      style={styles.containerStyle}
    >
      <TextInput
        hasError={!amount}
        errorMessage={'Amount Is Required'}
        showErrors={showErrors}
        title="Amount"
        value={amount}
        onChangeText={(txt) => {
          // setAmountHasError(false);
          setAmount(txt);
        }}
        placeholder="Add Amount"
      />

      <Button onPress={addTransaction} style={{ marginBottom: vs(10) }}>
        Add Transaction
      </Button>
    </ScreenContainer>
  );
};

export { AddTransaction };

const styles = StyleSheet.create({
  containerStyle: { justifyContent: 'space-between', alignItems: 'center' },
});
