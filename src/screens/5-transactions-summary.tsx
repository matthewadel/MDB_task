import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { s, vs } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

import { IRootState, ITransaction, TransactionType } from '@/types';
import { COLORS, ScreenContainer, Text } from '@/ui';
import { getPercentageValue } from '@/utils';

interface ICategory {
  name: string;
  value: number;
  color: any;
}
const TransactionsSummary = () => {
  const widthAndHeight = s(250);

  const [incomeExpensesChartData, setIncomeExpensesChartData] = useState<
    {
      value: number;
      color: string;
      label: { text: string };
    }[]
  >();
  const [expensesPerCat, setExpensesPerCat] = useState<
    {
      value: number;
      color: string;
      label: { text: string };
    }[]
  >();
  const [categories, setCategories] = useState<ICategory[]>([]);

  const [totalExpenses, setTotalExpenses] = useState(0);
  const { transactions }: { transactions?: ITransaction[] } = useSelector(
    (state: IRootState) => ({
      transactions: state.Transactions.transactions,
    }),
  );

  const getIncomeExpensesData = useCallback(() => {
    let temp_total_expenses = 0;
    let temp_total_income = 0;
    transactions.map((item) => {
      if (item.type === TransactionType.EXPENSE)
        temp_total_expenses += item.amount;
      else temp_total_income += item.amount;
    });

    if (temp_total_expenses > 0 || temp_total_income > 0)
      setIncomeExpensesChartData([
        {
          value: temp_total_expenses,
          color: COLORS.Red,
          label: {
            text: getPercentageValue(
              temp_total_expenses,
              temp_total_expenses + temp_total_income,
            ),
          },
        },
        {
          value: temp_total_income,
          color: COLORS.Green,
          label: {
            text: getPercentageValue(
              temp_total_income,
              temp_total_expenses + temp_total_income,
            ),
          },
        },
      ]);

    setTotalExpenses(temp_total_expenses);
  }, [transactions]);

  const generateColor = (sub: number, total: number) => {
    return `rgb(${255 - (sub / total) * 255},255,255)`;
  };

  const getExpensesPerCategory = useCallback(() => {
    let amountPerCategory: { [key: string]: number } = {};
    let temptotalExpenses = 0;
    transactions.map((item) => {
      if (item.type === TransactionType.EXPENSE) {
        amountPerCategory[item.category.label] =
          (amountPerCategory[item.category.label] || 0) + item.amount;
        temptotalExpenses += item.amount;
      }
    });

    let tempCategories: ICategory[] = [];
    if (Object.entries(amountPerCategory)?.length)
      setExpensesPerCat(
        Object.entries(amountPerCategory).map((item) => {
          tempCategories.push({
            name: item[0],
            value: item[1],
            color: generateColor(item[1], temptotalExpenses),
          });
          return {
            value: item[1],
            color: generateColor(item[1], temptotalExpenses),
            label: { text: getPercentageValue(item[1], temptotalExpenses) },
          };
        }),
      );

    setCategories(tempCategories);
  }, [transactions]);

  useEffect(() => {
    getIncomeExpensesData();
    getExpensesPerCategory();
  }, [getIncomeExpensesData, getExpensesPerCategory]);

  const renderCategory = (item: ICategory) => {
    return (
      <View style={styles.categoryContainer}>
        <View
          style={{
            width: s(20),
            height: s(20),
            backgroundColor: item.color,
            marginRight: s(10),
          }}
        />
        <Text adjustsFontSizeToFit={false} style={styles.flexText}>
          {getPercentageValue(item.value, totalExpenses)}
        </Text>
        <Text adjustsFontSizeToFit={false} style={styles.flexText}>
          {item.name}
        </Text>
      </View>
    );
  };

  return (
    <ScreenContainer screenHeaderProps={{ title: 'Summary View' }}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {/* pie chart for total expenses and incomes */}
        {!!incomeExpensesChartData?.length && (
          <Fragment>
            <Text style={styles.titleStyle}>Total Expenses & Income</Text>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={incomeExpensesChartData}
            />
          </Fragment>
        )}

        {/* pie chart of expenses by category */}
        {!!expensesPerCat?.length && (
          <Fragment>
            <Text style={styles.titleStyle}>Total Expenses Per Category</Text>
            <PieChart widthAndHeight={widthAndHeight} series={expensesPerCat} />
          </Fragment>
        )}

        {categories.length && categories.map((item) => renderCategory(item))}
      </ScrollView>
    </ScreenContainer>
  );
};

export { TransactionsSummary };

const styles = StyleSheet.create({
  contentContainerStyle: { alignItems: 'center', paddingTop: vs(10) },
  titleStyle: { fontWeight: 'bold', marginVertical: vs(10) },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
  },
  flexText: {
    flex: 1,
  },
});
