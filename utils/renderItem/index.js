import PokemonCard from '../../src/pokemonCard';

function renderItem ({item}) {
    return (
        <PokemonCard item={item} typesLenght = {item.types.length}/>
    )
}

export default renderItem;