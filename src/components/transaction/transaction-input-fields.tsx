import { useNavigation } from '@react-navigation/native';
import React, {
  forwardRef,
  Fragment,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet } from 'react-native';
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
  const [description, setDescription] = useState(
    props.transaction.description || '',
  );
  const [showErrors, setShowErrors] = useState(false);
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
  const { Categories }: { Categories?: ICategory[] } = useSelector(
    (state: IRootState) => ({
      Categories: state.Categories.categories,
    }),
  );

  const validateInputs = useCallback(() => {
    setShowErrors(false);
    if (!!amount && !!category?.id) return true;
    else {
      setTimeout(() => {
        setShowErrors(true);
      }, 100);
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

  return (
    <Fragment>
      <DropDown
        label={'Transaction Type'}
        placeholder={'Transaction Type'}
        options={defaultTransactionTypes}
        choose={setTransactionType}
        style={styles.topOffset}
        selectedItem={transactionType}
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

      <View style={{ ...styles.topOffset, ...styles.categoryContainer }}>
        <TouchableOpacity
          onPress={() => Navigation.navigate('CreateCategory')}
          style={styles.createCategoryButton}
          textStyle={styles.createCategoryText}
        >
          Create
        </TouchableOpacity>

        <DropDown
          hasError={!category?.id}
          showErrors={showErrors}
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
    </Fragment>
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
});
