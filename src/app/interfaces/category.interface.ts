export interface ICategory {
  category: string;
  description?: string;
}

export interface ICategories extends Array<ICategory> {}
