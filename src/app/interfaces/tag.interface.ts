export interface ITag {
  __v?: number;
  _id: string;
  count: number;
  description?: string;
  id: string;
  tag: string;
  color?: string;
  status?: ITagStatusEnum;
  createdAt: string;
  updatedAt: string;
}

export interface ITags extends Array<ITag> {}

export interface TagsByType {
  [key: string]: { tag: ITag; count: number };
}

export enum ITagStatusEnum {
  'ACTIVE' = 'Active',
  'SELECTED' = 'Selected',
  'INACTIVE' = 'Inactive',
}
