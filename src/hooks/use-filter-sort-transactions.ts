import { RefObject, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { IRootState, ITransaction, TransactionType } from '@/types';

const useFilterSortTransactions = (
  DatePickerRef: RefObject<{
    openModal: () => void;
  } | null>,
) => {
  const { transactions }: { transactions?: ITransaction[] } = useSelector(
    (state: IRootState) => ({
      transactions: state.Transactions.transactions,
    }),
  );
  const [data, setData] = useState(transactions);
  const [dateFilter, setDateFilter] = useState<string>();

  useEffect(() => {
    if (dateFilter)
      setData([...transactions.filter((item) => item.date === dateFilter)]);
  }, [dateFilter, transactions]);

  const sortTransactions = (orderBy: 'Descending' | 'Ascending') => {
    setData(
      orderBy === 'Descending'
        ? [...transactions]
        : [...transactions].reverse(),
    );
  };

  const filterTransactions = (
    filterType: 'Date' | 'Type',
    filterBy: TransactionType,
  ) => {
    if (filterType === 'Type') {
      setData([...transactions.filter((item) => item.type === filterBy)]);
    } else if (filterType === 'Date')
      setTimeout(() => {
        DatePickerRef.current?.openModal();
      }, 200);
    else sortTransactions('Descending');
  };

  return {
    data,
    sortTransactions,
    filterTransactions,
    setDateFilter,
  };
};

export { useFilterSortTransactions };
