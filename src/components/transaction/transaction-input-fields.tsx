import { useNavigation } from '@react-navigation/native';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

import { DateSection } from '@/components';
import { ICategory, IRootState, ITransaction, TransactionType } from '@/types';
import { COLORS, DropDown, TextInput, TouchableOpacity, View } from '@/ui';

const defaultTransactionTypes = [
  { id: 1, label: TransactionType.EXPENSE },
  { id: 2, label: TransactionType.INCOME },
];

interface ITransactionFields {
  transaction: Partial<ITransaction>;
}

const TransactionInputFields = forwardRef((props: ITransactionFields, ref) => {
  const Navigation = useNavigation<any>();

  const [amount, setAmount] = useState(
    props.transaction.amount?.toString() || '',
  );
  const [amountHasError, setAmountHasError] = useState(false);
  const [description, setDescription] = useState(
    props.transaction.description || '',
  );
  const DateSectionRef = useRef<{ getDate: Function }>(null);

  const [transactionType, setTransactionType] = useState(
    props.transaction.type
      ? defaultTransactionTypes.find(
          (item) => item.label === props.transaction.type,
        )
      : defaultTransactionTypes[0],
  );
  const [category, setCategory] = useState<ICategory | undefined>(
    props.transaction.category,
  );
  const [categoryHasError, setCategoryHasError] = useState(false);
  const { Categories }: { Categories?: ICategory[] } = useSelector(
    (state: IRootState) => ({
      Categories: state.Categories.categories,
    }),
  );

  const validateInputs = useCallback(() => {
    if (!!amount && !!category?.id) return true;
    else {
      if (!amount) setAmountHasError(true);
      if (!category?.id) setCategoryHasError(true);
      return false;
    }
  }, [amount, category?.id]);

  useImperativeHandle(
    ref,
    () => ({
      validateInputs,
      getAmount: () => amount,
      getDescription: () => description,
      getTransactionType: () => transactionType?.label,
      getCategory: () => category,
      getDate: () => DateSectionRef.current?.getDate(),
    }),
    [amount, category, description, transactionType, validateInputs],
  );

  useEffect(() => {
    setAmountHasError(false);
  }, [amount]);

  useEffect(() => {
    setCategoryHasError(false);
  }, [category?.id]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollviewStyle}
    >
      <DropDown
        label={'Transaction Type'}
        placeholder={'Transaction Type'}
        options={defaultTransactionTypes}
        choose={setTransactionType}
        style={styles.topOffset}
        selectedItem={transactionType}
      />

      <TextInput
        hasError={amountHasError}
        errorMessage={'Amount Is Required'}
        title="Amount"
        value={amount}
        onChangeText={setAmount}
        placeholder="Add Amount"
        containerStyle={styles.topOffset}
      />

      <View style={{ ...styles.topOffset, ...styles.categoryContainer }}>
        <TouchableOpacity
          onPress={() => Navigation.navigate('CreateCategory')}
          style={styles.createCategoryButton}
          textStyle={styles.createCategoryText}
        >
          Create
        </TouchableOpacity>

        <DropDown
          hasError={categoryHasError}
          label={'Category'}
          placeholder={'Choose Category'}
          options={Categories}
          choose={setCategory}
          selectedItem={category}
        />
      </View>

      <DateSection date={props.transaction.date} ref={DateSectionRef} />

      <TextInput
        title="Description (optional)"
        value={description}
        onChangeText={setDescription}
        placeholder="Write A Description"
        style={styles.decriptionInputStyle}
        containerStyle={styles.topOffset}
      />
    </ScrollView>
  );
});

export { TransactionInputFields };

const styles = StyleSheet.create({
  topOffset: { marginTop: vs(20) },
  decriptionInputStyle: { height: vs(80) },
  categoryContainer: { width: '100%' },
  createCategoryButton: {
    position: 'absolute',
    top: 0,
    right: s(10),
    zIndex: 2,
  },
  createCategoryText: {
    color: COLORS.Primary,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  scrollviewStyle: { width: '100%', overflow: 'visible' },
});
