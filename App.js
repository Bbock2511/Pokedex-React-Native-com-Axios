import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import storeData from './utils/storeValue';
import getData from './utils/getValues';
import renderItem from './utils/renderItem';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151'

export default function App() {

  const [pokemonList, setPokemonList] = useState([]);

  const getPokemonList = async () => {
    try {
      const response = await axios.get(BASE_URL);

      const tempList = []

      for (let i = 0; i < response.data.results.length; i++) {
        const pokemon = await axios.get(response.data.results[i].url);

        const pokemonDetails = {
          id: pokemon.data.id,
          name: pokemon.data.name.charAt(0).toUpperCase() + pokemon.data.name.slice(1),
          url: response.data.results[i].url,
          image: pokemon.data.sprites.other.home.front_default,
          types: pokemon.data.types.map((type) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)),
        }

        tempList.push(pokemonDetails);
      }

      setPokemonList(tempList);
      storeData(tempList);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setPokemonList(getData());
    pokemonList.length === 0 ? getPokemonList() : null;
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ shadowColor: '#000', shadowOpacity: 5, shadowOffset:{width: 5, height: 2}}}>
        <Text style={{margin: 10,}} onPress={() => console.log(pokemonList)}>Pokédex</Text>
      </View>
      <FlatList
        data={pokemonList}
        keyExtractor={(pokemon) => pokemon.id}
        renderItem={renderItem}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: '#fff',

  },
});
