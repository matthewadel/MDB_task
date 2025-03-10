import { ICategory } from './category';

export interface ITransaction {
  id?: number;
  date: string;
  amount: number;
  type: TransactionType;
  category: ICategory;
  description: string;
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}
