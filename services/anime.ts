import Anime from "../types/anime";
import { HTTPResponse, JikanData, JikanPaginatedData } from "../types/client";
import Genre from "../types/genre";

const baseURL = "https://api.jikan.moe/v4";


interface GetAnimesParams {
  page: number
  search: string
  sfw: boolean
  genres: string[]
}

const getAnimes = async ({page, search, sfw, genres = []}:GetAnimesParams): Promise<HTTPResponse<JikanPaginatedData<Anime[]>>> => {
  const searchParams = new URLSearchParams({ page: page.toString(), q: search, sfw: sfw.toString(), genres: genres.toString() })
  const response = await fetch(
    `${baseURL}/anime?${searchParams}`
  );
  const status = response.status
  if(status === 200) {
    const data: JikanPaginatedData<Anime[]> = await response.json();
    return {data, status}
  }
  return {status, error: "An error has occurred"}
};

const getAnimeGenres = async (): Promise<HTTPResponse<JikanData<Genre[]>>> => {
  const response = await fetch(`${baseURL}/genres/anime`);
  const status = response.status
  if(status === 200){
    const data :JikanData<Genre[]> = await response.json();
    return {data, status}
  }
  return {status, error: "An error has occurred"}
};

const $anime = {
  getAnimes,
  getAnimeGenres,
};
export default $anime;
