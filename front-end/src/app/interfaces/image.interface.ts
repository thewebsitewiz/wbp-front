import { ITags } from './tag.interface';

export interface IImage {
  [x: string]: string | number | boolean | Date | ITags | any[] | undefined;
  title: string;
  description?: string | undefined;
  caption?: string;
  comments?: string;
  tags: string[] | undefined;
  tagInfo?: ITags | undefined;
  src: string;
  fileSize?: number;
  mimeType?: string;
  isActive?: boolean;
  activeString?: string;
  dateTaken?: Date;
  height?: number;
  width?: number;
}

export interface IImageResponse {
  data: IImage[];
  message: string;
  success: boolean;
}
