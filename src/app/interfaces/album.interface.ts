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

export interface IAlbumImage {
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
  images: IAlbumImage[];
}

export interface IAlbums extends Array<IAlbum> {}
