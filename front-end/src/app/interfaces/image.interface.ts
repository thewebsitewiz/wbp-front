import { IImageTags } from './tag.interface';

export interface IImage {
  title: string;
  description?: string;
  caption?: string;
  comments?: string;
  tags: IImageTags;
  src: string;
  fileSize?: number;
  mimeType?: string;
  dateTaken?: Date;
  height?: number;
  width?: number;
}
