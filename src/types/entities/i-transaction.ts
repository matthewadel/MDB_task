import { ICategory } from './i-category';

export interface iTransaction {
  id: number;
  datetime: Date;
  title: string;
  amount: number;
  type: TransactionType;
  category: ICategory;
  description: string;
}

enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}
