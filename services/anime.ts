
const baseURL = 'https://api.jikan.moe/v4/anime'
 
const getAnime = async () => {
    const response = await fetch(baseURL);
    const data = await response.json();
    console.log(data);
    return data;
};

const getAnimeById = async (id:string) => {
    const response = await fetch(`${baseURL}/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
};

const $anime = {
    getAnime,
    getAnimeById
}
export default $anime;