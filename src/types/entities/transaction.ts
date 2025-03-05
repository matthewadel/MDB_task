import { ICategory } from './category';

export interface iTransaction {
  id: number;
  date: Date;
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
