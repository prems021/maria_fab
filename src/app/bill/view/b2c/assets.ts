import { Columns } from 'ngx-easy-table';

export interface Company {
  phone: string;
  age: number;
  address?: { street: string, number?: number };
  company: string;
  name: string;
  isActive: boolean;
  date?: string;
  level?: string;
  imgUrl?: string;
}

export const columns: Columns[] = [
  { key: 'BILL_DATE', title: 'Date' },
  { key: 'INVOICE_NUMBER', title: 'Invoice Number' },
  { key: 'CUSTOMER_NAME', title: 'Customer Name' },
  { key: 'CUSTOMER_PHONE', title: 'Phone' },
  { key: 'GRAND_TOTAL', title: 'Total Amount' },
];

export const data = [
  {
    imgUrl: 'https://i.imgur.com/GLqxxnn.png',
    phone: '+1 (949) 527-2108',
    age: 36,
    address: { street: 'Some street', number: 12 },
    company: 'KONGENE',
    name: 'Deanne Contreras',
    isActive: true,
    level: 'Low',
  }
 
   ];