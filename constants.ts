
import { Movie } from './types';

export const GENRES = [
  'All',
  'Action',
  'Sci-Fi',
  'Drama',
  'Thriller',
  'Adventure',
  'Animation',
  'Horror'
];

export const MOCK_MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Dune: Part Two',
    year: 2024,
    rating: 8.9,
    genre: ['Sci-Fi', 'Adventure'],
    description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
    imageUrl: 'https://picsum.photos/seed/dune/400/600',
    backdropUrl: 'https://picsum.photos/seed/duneb/1200/600',
    duration: '2h 46m',
    cast: ['Timothée Chalamet', 'Zendaya'],
    trending: true
  },
  {
    id: '2',
    title: 'Furiosa: A Mad Max Saga',
    year: 2024,
    rating: 7.8,
    genre: ['Action', 'Adventure'],
    description: 'The origin story of renegade warrior Furiosa before her team-up with Mad Max in Fury Road.',
    imageUrl: 'https://picsum.photos/seed/furiosa/400/600',
    backdropUrl: 'https://picsum.photos/seed/furiosab/1200/600',
    duration: '2h 28m',
    cast: ['Anya Taylor-Joy', 'Chris Hemsworth'],
    trending: true
  },
  {
    id: '3',
    title: 'Civil War',
    year: 2024,
    rating: 7.5,
    genre: ['Action', 'Thriller'],
    description: 'A journey across a dystopian future America, following a team of military-embedded journalists as they race against time to reach DC before rebel factions descend upon the White House.',
    imageUrl: 'https://picsum.photos/seed/civil/400/600',
    backdropUrl: 'https://picsum.photos/seed/civilb/1200/600',
    duration: '1h 49m',
    cast: ['Kirsten Dunst', 'Wagner Moura'],
    trending: true
  },
  {
    id: '4',
    title: 'Kingdom of the Planet of the Apes',
    year: 2024,
    rating: 7.2,
    genre: ['Sci-Fi', 'Action'],
    description: 'Many years after the reign of Caesar, a young ape goes on a journey that will lead him to question everything he\'s been taught about the past and make choices that will define a future for apes and humans alike.',
    imageUrl: 'https://picsum.photos/seed/apes/400/600',
    backdropUrl: 'https://picsum.photos/seed/apesb/1200/600',
    duration: '2h 25m',
    cast: ['Owen Teague', 'Freya Allan']
  },
  {
    id: '5',
    title: 'Inside Out 2',
    year: 2024,
    rating: 8.1,
    genre: ['Animation', 'Adventure'],
    description: 'Follow Riley, in her teenage years, encountering new emotions.',
    imageUrl: 'https://picsum.photos/seed/insideout/400/600',
    backdropUrl: 'https://picsum.photos/seed/insideoutb/1200/600',
    duration: '1h 40m',
    cast: ['Amy Poehler', 'Maya Hawke']
  },
  {
    id: '6',
    title: 'The Fall Guy',
    year: 2024,
    rating: 7.1,
    genre: ['Action', 'Drama'],
    description: 'A down-and-out stuntman must track down a missing movie star, solve a conspiracy and try to win back the love of his life while still doing his day job.',
    imageUrl: 'https://picsum.photos/seed/fall/400/600',
    backdropUrl: 'https://picsum.photos/seed/fallb/1200/600',
    duration: '2h 6m',
    cast: ['Ryan Gosling', 'Emily Blunt']
  },
  {
    id: '7',
    title: 'Deadpool & Wolverine',
    year: 2024,
    rating: 8.4,
    genre: ['Action', 'Sci-Fi'],
    description: 'Wolverine is recovering from his injuries when he crosses paths with the loudmouth, Deadpool.',
    imageUrl: 'https://picsum.photos/seed/deadpool/400/600',
    backdropUrl: 'https://picsum.photos/seed/deadpoolb/1200/600',
    duration: '2h 7m',
    cast: ['Ryan Reynolds', 'Hugh Jackman'],
    trending: true
  }
];
