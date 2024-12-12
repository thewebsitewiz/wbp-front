export interface IPostmarkPosition {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

export interface IPostmark {
  src?: string;
  width?: number;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

interface IImage {
  src: string;
  title: string;
  description: string;
}

export interface IAlbum {
  album: string;
  description?: string;
  albumColor?: string;
  alignment?: string;
  postmark: IPostmark;
  images: IImage[];
}
