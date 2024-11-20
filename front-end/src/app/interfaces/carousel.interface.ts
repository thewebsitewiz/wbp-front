export interface Slide {
  src: string;
  title?: string;
  description?: string;
  alt?: string;
  slider?: {
    width?: number;
    height?: number;
    sliderClass?: string;
    typingText?: string;
    header?: string;
    headerColor?: string;
    subHeader?: string;
    subHeaderColor?: string;
    content?: string | string[];
    contentColor?: string;
    origin?: string;
    destination?: string;
  };
}

export interface Slides extends Array<Slide> {}
