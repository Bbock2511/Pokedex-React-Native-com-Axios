import axios from 'axios';

const getPokemonResponse = async (pokemonUrl) => {
    try {
        const response = await axios.get(pokemonUrl);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default getPokemonResponse;