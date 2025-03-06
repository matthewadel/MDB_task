import { useNavigation } from '@react-navigation/native';
import React, { Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { s, vs } from 'react-native-size-matters';

import { ITransaction, TransactionType } from '@/types';
import {
  COLORS,
  CONSTANTS,
  ICONS,
  ShadowStyle,
  Text,
  TouchableOpacity,
  VectorIcons,
  View,
} from '@/ui';

const TransactionCard = ({
  transaction,
  showDate,
}: {
  transaction: ITransaction;
  showDate: boolean;
}) => {
  let isIncome = transaction.type === TransactionType.INCOME;
  const Navigation = useNavigation<any>();

  return (
    <Fragment>
      {!!showDate && <Text style={styles.dateStyle}>{transaction.date}</Text>}

      <TouchableOpacity
        onPress={() =>
          Navigation.navigate('UpdateTransaction', { transaction })
        }
        activeOpacity={0.6}
        style={styles.containerStyle}
      >
        <View style={styles.rowStyle}>
          <VectorIcons
            icon={ICONS.Entypo}
            name={`arrow-${isIncome ? 'down' : 'up'}`}
            color={isIncome ? COLORS.Green : COLORS.Red}
            size={s(20)}
          />

          <Text style={styles.amountStyle}>{`${transaction.amount}$`}</Text>

          <Text adjustsFontSizeToFit={false} style={styles.categoryStyle}>
            {transaction.category.label}
          </Text>
        </View>
        {!!transaction.description && (
          <Text
            numberOfLines={0}
            style={{ marginLeft: s(5), marginTop: vs(5), fontSize: s(12) }}
          >
            {transaction.description}
          </Text>
        )}
      </TouchableOpacity>
    </Fragment>
  );
};

export { TransactionCard };

const styles = StyleSheet.create({
  dateStyle: {
    marginHorizontal: CONSTANTS.PADDING_HORIZONTAL,
    fontWeight: 'bold',
    marginBottom: vs(5),
    marginTop: vs(10),
  },
  containerStyle: {
    flex: 1,
    marginHorizontal: CONSTANTS.PADDING_HORIZONTAL,
    borderRadius: s(10),
    paddingHorizontal: s(6),
    paddingVertical: vs(8),
    marginBottom: vs(10),
    ...ShadowStyle,
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  amountStyle: {
    fontWeight: 'bold',
    width: s(50),
    textAlign: 'center',
    marginRight: s(10),
  },
  categoryStyle: {
    fontWeight: 'bold',
    color: COLORS.Primary,
    flex: 1,
  },
});
