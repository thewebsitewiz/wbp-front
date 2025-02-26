import { IImageTags } from './tag.interface';

export interface IImage {
  [x: string]:
    | string
    | number
    | boolean
    | Date
    | IImageTags
    | any[]
    | undefined;
  title: string;
  description?: string | undefined;
  caption?: string;
  comments?: string;
  tags: IImageTags | undefined;
  tagInfo?: any[];
  tagList?: any[];
  src: string;
  fileSize?: number;
  mimeType?: string;
  isActive?: boolean;
  activeString?: string;
  dateTaken?: Date;
  height?: number;
  width?: number;
}
