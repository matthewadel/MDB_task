import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { vs } from 'react-native-size-matters';

import { DateSection } from '@/components';
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
      <DropDown
        hasError={true}
        showErrors={showErrors}
        label={'Transaction Type'}
        placeholder={'Transaction Type'}
        options={[{ id: 1, label: 'ss' }]}
        choose={() => null}
        style={styles.topOffset}
        // selectedItem={{
        //   label: time
        //     ? `${(time as ITime)?.time_from} - ${(time as ITime)?.time_to}`
        //     : undefined,
        // }}
      />

      <TextInput
        hasError={!amount}
        errorMessage={'Amount Is Required'}
        showErrors={showErrors}
        title="Amount"
        value={amount}
        onChangeText={setAmount}
        placeholder="Add Amount"
        containerStyle={styles.topOffset}
      />

      <DropDown
        hasError={true}
        showErrors={showErrors}
        label={'Category'}
        placeholder={'Choose Category'}
        options={[{ id: 1, label: 'ss' }]}
        choose={() => null}
        style={styles.topOffset}
        // selectedItem={{
        //   label: time
        //     ? `${(time as ITime)?.time_from} - ${(time as ITime)?.time_to}`
        //     : undefined,
        // }}
      />

      <DateSection />

      <TextInput
        title="Description (optional)"
        value={description}
        onChangeText={setDescription}
        placeholder="Write A Description"
        style={styles.decriptionInputStyle}
        containerStyle={styles.topOffset}
      />

      <Button onPress={addTransaction} style={styles.topOffset}>
        Add Transaction
      </Button>
    </ScreenContainer>
  );
};

export { AddTransaction };

const styles = StyleSheet.create({
  containerStyle: { alignItems: 'center' },
  topOffset: { marginTop: vs(20) },
  decriptionInputStyle: { height: vs(80) },
});
