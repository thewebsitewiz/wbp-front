import { IAlbum } from '../../app/interfaces/album.interface';

export const Albums: IAlbum[] = [
  {
    album: 'Destinations',
    description: 'Destination photography is blah, blah, blah',
    postmark: {
      src: 'postmarks/postmark-9.png',
      top: 15,
      left: 15,
    },
    images: [{ src: 'pics/--215-Edit.jpg', title: '', description: '' }],
  },
  {
    album: 'Proposals',
    description: '',
    postmark: {
      src: 'postmarks/postmark-1.png',
      top: 10,
      right: 8,
      width: 60,
    },
    images: [
      {
        src: 'pics/8-Edit.jpg',
        title: 'Proposals',
        description: 'description',
      },
    ],
  },
  {
    album: 'Families',
    description: 'Families photography is blah, blah, blah',
    postmark: {
      src: 'postmarks/postmark-2.png',
      top: 15,
      right: 15,
    },
    images: [
      {
        src: 'pics/23-Edit.jpg',
        title: 'Families',
        description: 'description',
      },
    ],
  },
  {
    album: 'Portraits',
    albumColor: 'lightgreen',
    description: 'Portraits photography is blah, blah, blah',
    alignment: 'right',
    postmark: {
      src: 'postmarks/postmark-3.png',
      top: 15,
      right: 15,
    },
    images: [
      {
        src: 'pics/16-Edit.jpg',
        title: 'Portraits',
        description: 'description',
      },
    ],
  },
  {
    album: 'Weddings',
    description: 'Weddings photography is blah, blah, blah',
    postmark: {
      src: 'postmarks/postmark-4.png',
      top: 15,
      right: 15,
    },
    images: [
      {
        src: 'pics/208-Edit.jpg',
        title: 'Weddings',
        description: 'description',
      },
    ],
  },
  {
    album: 'Underwater',
    albumColor: 'lightblue',
    description: 'Underwater photography is blah, blah, blah',
    postmark: {
      src: 'postmarks/postmark-5.png',
      top: 15,
      right: 15,
    },
    images: [
      {
        src: 'pics/--P3120194-Edit-Edit-Edit-Edit.jpg',
        title: 'Underwater',
        description: 'description',
      },
      {
        src: 'pics/179-Edit-2.jpg',
        title: 'Underwater',
        description: 'description',
      },
      {
        src: 'pics/CM7P7948-Edit-Edit.jpg',
        title: 'Underwater',
        description: 'description',
      },
    ],
  },

  {
    album: 'Announcements',
    alignment: 'right',
    description: 'Special Occasions photography is blah, blah, blah',
    postmark: {
      src: 'postmarks/postmark-6.png',
      top: 15,
      right: 15,
    },
    images: [
      {
        src: 'pics/0050-Edit.jpg',
        title: 'Special Occasions',
        description: 'description',
      },
    ],
  },
  {
    album: 'Landscapes',
    albumColor: 'lightyellow',
    description: 'Landscapes photography is blah, blah, blah',
    postmark: {
      src: 'postmarks/postmark-7.png',
      top: 15,
      right: 15,
    },
    images: [
      {
        src: 'pics/dxthm1000.CM7P7336-Edit.jpg',
        title: 'Landscapes',
        description: 'description',
      },
    ],
  },
  {
    album: 'Celebrities',
    alignment: 'right',
    albumColor: 'white',
    description: 'Celebrities photography is blah, blah, blah',
    postmark: {
      src: 'postmarks/postmark-8.png',
      top: 15,
      right: 15,
    },
    images: [
      {
        src: 'pics/dxthm1000.003work.jpg',
        title: 'Celebrities',
        description: 'description',
      },
    ],
  },
];
