export interface ITag {
  __v?: number;
  _id: string;
  count: number;
  description?: string;
  id: string;
  tag: string;
}

export interface ITags extends Array<ITag> {}

export interface TagsByType {
  [key: string]: { tag: ITag; count: number };
}

export interface IImageTag {
  _id?: string;
  description?: string;
  id?: string;
  tag: string;
}

export interface IImageTags extends Array<IImageTag> {}
