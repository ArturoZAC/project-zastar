import { AgeRatingType } from '../enums';

export interface Movie {
  id: string;
  title: string;
  synopsis?: string;
  durationMinutes: number;
  posterUrl?: string;
  trailerUrl?: string;
  ageRating: AgeRatingType;
  releaseDate?: Date;
  isActive: boolean;
  createdAt: Date;
  deletedAt?: Date;
  genreIds?: string[];
}
