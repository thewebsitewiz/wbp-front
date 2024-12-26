import {
  ICategory,
  ICategories,
} from '../../app/interfaces/category.interface';

export interface IVendor {
  name: string;
  description: string;
  website?: string;
  address?: string;
  city?: string;
  phone?: string | IPhone[];
  email?: string | IEmail[];
  comments?: string;
  category: string | string[];
  status: string;
  tags?: string[];
  src: string;
}

interface IPhone {
  [key: string]: string;
}
interface IEmail {
  [key: string]: string;
}

export interface IVendors extends Array<IVendor> {}
