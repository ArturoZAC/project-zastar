import { AgeRatingType, LanguageType } from "../enums";

//prettier-ignore
export interface Movie {
  id              : string;
  title           : string;
  synopsis?       : string;
  durationMinutes : number;
  posterUrl?      : string;
  trailerUrl?     : string;
  ageRating       : AgeRatingType;
  language        : LanguageType;
  isActive        : boolean;
  createdAt       : Date;
  updatedAt       : Date;
  deletedAt?      : Date;
}
