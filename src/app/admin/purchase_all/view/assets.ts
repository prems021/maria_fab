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
  { key: 'EXP_DATE', title: 'Date' },
  { key: 'EXPENCE_ENTRY_NO', title: 'Entry Number' },
  { key: 'VENDOR', title: 'Vendor Name' },
  { key: 'STREET', title: 'Vendor Street' },
  { key: 'BILL_NO', title: 'Bill No' },
  { key: 'TOTAL_AMOUNT', title: 'Total Amount' },
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