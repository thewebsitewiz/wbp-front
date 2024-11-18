export interface PostmarkPosition {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

export interface Postmark {
  src?: string;
  width?: number;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

interface Image {
  src: string;
  title: string;
  description: string;
}

export interface Album {
  album: string;
  description?: string;
  albumColor?: string;
  alignment?: string;
  postmark: Postmark;
  images: Image[];
}
