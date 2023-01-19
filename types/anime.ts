export default interface Anime {
  mal_id: number,
  url: string,
  images: { jpg: ImageUrls, webp: ImageUrls },
  trailer: { youtube_id: string, url: string, embed_url: string },
  title: string,
  title_english: string,
  title_japanese: string,
  type: AnimeType,
  score: number,
  episodes: number,
  duration: string,
  year: number,
  synopsis: string,
  studios: JikanEntity[],
  lincesors: JikanEntity[],
  genres: JikanEntity<GenreName>[]
}

enum AnimeType {
  TV = "tv",
  MOVIE = "movie",
  OVA = "ova",
  SPECIAL = "special",
  ONA = "ona",
  MUSIC = "music",
}

interface ImageUrls {
  image_url: string,
  small_image_url: string,
  large_image_url: string
}

export enum GenreName {
  ROMANCE = "Romance",
  SLICE_OF_LIFE = "Slice of Life",
  ADVENTURE = "Adventure",
  DRAMA = "Drama",
  COMEDY = "Comedy",
  SPORT = "Sport",
  SCI_FI = "Sci-Fi",
  ACTION = "Action",
  MYSTERY = "Mystery",
  SUSPENSE = "Suspense",
  SUPERNATURAL = "Supernatural"
}

export interface JikanEntity<T = string> {
  mal_id: number,
  type: string,
  name: T,
  url: string
}

