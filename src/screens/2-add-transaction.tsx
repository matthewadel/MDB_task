import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { vs } from 'react-native-size-matters';

import { Button, DropDown, ScreenContainer, TextInput } from '@/ui';

const AddTransaction = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
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
        onChangeText={setAmount}
        placeholder="Add Amount"
      />

      <DropDown
        hasError={true}
        showErrors={showErrors}
        label={'Transaction Type'}
        placeholder={'Transaction Type'}
        options={[{ id: 1, label: 'ss' }]}
        choose={() => null}
        // selectedItem={{
        //   label: time
        //     ? `${(time as ITime)?.time_from} - ${(time as ITime)?.time_to}`
        //     : undefined,
        // }}
      />

      <DropDown
        hasError={true}
        showErrors={showErrors}
        label={'Transaction Type'}
        placeholder={'Transaction Type'}
        options={[{ id: 1, label: 'ss' }]}
        choose={() => null}
        // selectedItem={{
        //   label: time
        //     ? `${(time as ITime)?.time_from} - ${(time as ITime)?.time_to}`
        //     : undefined,
        // }}
      />

      <TextInput
        title="Description (optional)"
        value={description}
        onChangeText={setDescription}
        placeholder="Write A Description"
        style={{ height: vs(80) }}
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
