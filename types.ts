
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  materials: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

// Added Artist interface to resolve import error in components/ArtistCard.tsx
export interface Artist {
  id: string;
  name: string;
  genre: string;
  day: string;
  image: string;
}

export enum Section {
  HERO = 'hero',
  COLLECTION = 'collection',
  CRAFT = 'craft',
  CATALOG = 'catalog',
}
