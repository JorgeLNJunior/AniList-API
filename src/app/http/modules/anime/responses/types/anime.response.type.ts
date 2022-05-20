import { Review } from '@http/modules/review/entities/review.entity';
import { DeepPartial } from 'typeorm';

export const createAnimeResponseExample = {
  uuid: '4f3ab4ae-7854-4720-9122-db5cad01f610',
  title: 'Attack on titan',
  synopsis: `Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans, forcing humans to hide in fear behind enormous concentric walls`,
  cover: null,
  trailer: 'https://www.youtube.com/watch?v=MGRm4IzK1SQ',
  episodes: 75,
  releaseDate: '2020-10-15',
  season: 'fall 2020',
  genre: 'action',
  createdAt: '2021-09-16 14:38:09',
  updatedAt: null,
  deletedAt: null,
};

export const findAnimeResponseExample = [
  {
    uuid: '4f3ab4ae-7854-4720-9122-db5cad01f610',
    title: 'Attack on titan',
    synopsis: `Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid
 creatures called titans, forcing humans to hide in fear behind enormous concentric walls`,
    cover: null,
    trailer: 'https://www.youtube.com/watch?v=MGRm4IzK1SQ',
    episodes: 75,
    rating: 4,
    reviews: 2,
    releaseDate: '2020-10-15',
    season: 'fall 2020',
    genre: 'action',
    createdAt: '2021-09-16 14:38:09',
    updatedAt: null,
    deletedAt: null,
  },
];

export const findOneAnimeResponseExample = {
  uuid: '4f3ab4ae-7854-4720-9122-db5cad01f610',
  title: 'Attack on titan',
  synopsis: `Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid
 creatures called titans, forcing humans to hide in fear behind enormous concentric walls`,
  cover: null,
  trailer: 'https://www.youtube.com/watch?v=MGRm4IzK1SQ',
  episodes: 75,
  rating: 4,
  reviews: 2,
  releaseDate: '2020-10-15',
  season: 'fall 2020',
  genre: 'action',
  createdAt: '2021-09-16 14:38:09',
  updatedAt: null,
  deletedAt: null,
};

export const updateAnimeResponseExample = {
  uuid: '4f3ab4ae-7854-4720-9122-db5cad01f610',
  title: 'Attack on titan',
  synopsis: `Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid
  creatures called titans, forcing humans to hide in fear behind enormous concentric walls`,
  cover:
    'https://static.wikia.nocookie.net/shingekinokyojin/images/d/d8/Attack_on_Titan_Season_1.jpg/revision/latest?cb=20180601153334',
  trailer: 'https://www.youtube.com/watch?v=MGRm4IzK1SQ',
  episodes: 75,
  releaseDate: '2020-10-15',
  season: 'fall 2020',
  genre: 'action',
  createdAt: '2021-09-16 14:38:09',
  updatedAt: null,
  deletedAt: null,
};

export const findReviewByAnimeResponseExample: DeepPartial<Review[]> = [
  {
    uuid: 'b852dcea-f442-4141-97f5-0567d9f25b1d',
    title: 'naruto',
    description: 'Proin at pulvinar enim, eget vulputate sem...',
    rating: 4,
    anime: {
      uuid: '5fe7e1fb-1341-4625-bbaf-72688a697624',
    },
    user: {
      uuid: 'd83c3162-923a-4cb2-8ec5-d3bc5f3c38a6',
    },
    createdAt: '2021-09-16 14:38:09',
    updatedAt: null,
    deletedAt: null,
  },
];
