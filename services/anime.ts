const baseURL = "https://api.jikan.moe/v4";

const getAnimes = async (page: number, search: string, sfw: boolean) => {
  const response = await fetch(
    `${baseURL}/anime?q=${search}&page=${page}&sfw=${sfw}`
  );
  const data = await response.json();
  return data;
};

const getAnimeGenres = async () => {
  const response = await fetch(`${baseURL}/genres/anime`);
  const data = await response.json();
  console.log(data);
  return data;
};

const $anime = {
  getAnimes,
  getAnimeGenres,
};
export default $anime;
