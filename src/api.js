import axios from "axios";

  export const fetchKoreaName = async(pokemonId) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
    const KoreaName = response.data.names.find(name => name.language.name === "ko");
    return KoreaName;
  };