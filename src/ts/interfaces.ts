export interface INewItem {
  amount: string | number;
  createdAt?: Date;
  name: string;
  uid: string;
}

export interface IReturnedData extends INewItem {
  id: string;
}
