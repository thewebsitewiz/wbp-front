import { IVendor } from '@interfaces/vendor.interface';
import { IAlbumImage } from './album.interface';
import { IHeroSlide } from './hero.interface';

export type ISlide = IHeroSlide | IAlbumImage | IVendor;

export interface ISlides extends Array<ISlide> {}
