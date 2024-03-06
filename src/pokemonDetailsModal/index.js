import { StyleSheet, Text, View, Modal, Image, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import getPokemonResponse from '../../utils/getPokemonResponse'
import getTypeDetails from '../../utils/getTypeDetails'
import damageRelationship from '../../utils/typesDamage/damageRelationship'

const setBackgroundColors = (type) => {
  return type === "normal" ? "#A8A878" :
  type === "fire" ? "#F08030" :
  type === "fighting" ? "#C03028" :
  type === "water" ? "#6890F0" :
  type === "flying" ? "#A890F0" :
  type === "grass" ? "#78C850" :
  type === "poison" ? "#A040A0" :
  type === "electric" ? "#F8D030" :
  type === "ground" ? "#E0C068" :
  type === "psychic" ? "#F85888" :
  type === "rock" ? "#B8A038" :
  type === "ice" ? "#98D8D8" :
  type === "bug" ? "#A8B820" :
  type === "dragon" ? "#7038F8" :
  type === "ghost" ? "#705898" :
  type === "dark" ? "#705848" :
  type === "steel" ? "#B8B8D0" :
  type === "fairy" ? "#EE99AC" :
  "#68A090"
}

const PokemonModal = ({ visible, setVisible, pokemonUrl, pokemonName, corFundo }) => {

  const [pokemonDetails, setPokemonDetails] = useState(null);
  let typesLenghtTemp;
  const [typesLenght, setTypesLenght] = useState(0);
  const [firstTypeDetails, setFirstTypeDetails] = useState("vazio");
  const [secondTypeDetails, setSecondTypeDetails] = useState("vazio");
  const [ types, setTypes ] = useState([]);

  const [ doubleDamageFrom, setDoubleDamageFrom ] = useState([]);
  const [ fourTimesDamage, setFourTimesDamage ] = useState([]);
  const [ doubleHalfDamage, setDoubleHalfDamage ] = useState([]);
  const [ halfDamage, setHalfDamage ] = useState([]);
  const [ imunity, setImunity ] = useState([]);

  useEffect(() => {
    const getPokemonDetails = async () => {
      if (visible) {
        try {
          const response = await getPokemonResponse(pokemonUrl);
          setTypes(response.types);
          response.types.map(async (type) => {
            setTypesLenght(response.types.length)
            typesLenghtTemp = response.types.length;
            if (response.types.length > 1) {
              try {
                const firstTypeResponse = await getTypeDetails(response.types[0].type.url);
                const secondTypeResponse = await getTypeDetails(response.types[1].type.url);
                setFirstTypeDetails(firstTypeResponse.damage_relations);
                setSecondTypeDetails(secondTypeResponse.damage_relations);
                let damageRelations = damageRelationship(firstTypeResponse.damage_relations, secondTypeResponse.damage_relations, typesLenghtTemp);
                setFourTimesDamage(damageRelations.fourX);
                setDoubleDamageFrom(damageRelations.twoX);
                setDoubleHalfDamage(damageRelations.doubleHalfDamage);
                setHalfDamage(damageRelations.halfDamage);
                setImunity(damageRelations.noDamage)
              } catch (error) {
                console.error('Erro ao obter detalhes do tipo:', error);
              }
            } else {
              const firstTypeResponse = await getTypeDetails(response.types[0].type.url);
              const secondTypeResponse = ""
              setFirstTypeDetails(firstTypeResponse.damage_relations);
              setSecondTypeDetails('');
              let damageRelations = damageRelationship(firstTypeResponse.damage_relations, secondTypeResponse, typesLenghtTemp);
              setFourTimesDamage(damageRelations.fourX);
              setDoubleDamageFrom(damageRelations.twoX);
              setDoubleHalfDamage(damageRelations.doubleHalfDamage);
              setHalfDamage(damageRelations.halfDamage);
              setImunity(damageRelations.noDamage)
            }
            
          });
          
          setPokemonDetails(response);
    
        } catch (error) {
          console.error('Erro ao obter detalhes do Pokémon:', error);
        }
      }
    };

    getPokemonDetails();
  }, [visible]);

  return (
    <View style={[styles.container, {backgroundColor: corFundo}]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
      >
      
        <ScrollView style={{backgroundColor: corFundo, flex: 1}}>
          <View style={{  }}>
              <Text style={{fontSize: 26, fontWeight: 'bold', marginTop: 10, position: 'absolute', margin: 5}}>#{pokemonDetails?.id}-{pokemonName}
              </Text>
              <Image 
                source={{uri: pokemonDetails?.sprites.other.home.front_default}} 
                style={{width: 200, height: 200, alignSelf: 'center', marginTop: 50}}
              /> 
          </View>
          <View style={{flex: 1, backgroundColor: 'white', gap: 8, padding: 5, borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginTop: 10}}>Tipos</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
              {
                types.map((item, index) => {
                  return <Text key={index} style={
                    {backgroundColor: setBackgroundColors(item.type.name), 
                      width: 100, 
                      height: 35, 
                      textAlign: 'center', 
                      textAlignVertical: 'center', 
                      borderRadius: 15, 
                      margin: 5,
                      fontSize: 16,
                      fontWeight: '500'}}>
                      {item.type.name.charAt(0).toUpperCase() + item.type.name.slice(1)}
                    </Text>
                })
              }
            </View>
    
            {
              doubleHalfDamage.length > 0 ?
              <View style={{marginTop: 15}}>
                <Text style={{alignSelf: 'center', fontSize: 18}}>Muito resistente contra: </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
                  {
                    doubleHalfDamage.map((item, index) => {
                      return <Text key={index} style={
                        {backgroundColor: setBackgroundColors(item),
                          width: 100, 
                          height: 35, 
                          textAlign: 'center', 
                          textAlignVertical: 'center', 
                          borderRadius: 15, 
                          margin: 5,
                          fontSize: 16,
                          fontWeight: '500'
                        }}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                    })
                  }
                </View>
              </View>
              : null 
            }

            {
              halfDamage.length > 0 ?
              <View>
                <Text style={{alignSelf: 'center', fontSize: 18}}>Resistente contra: </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', marginTop: 5}}>
                  {
                    halfDamage.map((item, index) => {
                      return <Text key={index} style={
                        {backgroundColor: setBackgroundColors(item), 
                          width: 100, 
                          height: 35, 
                          textAlign: 'center', 
                          textAlignVertical: 'center', 
                          borderRadius: 15, 
                          margin: 5,
                          fontSize: 16,
                          fontWeight: '500'
                        }}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                    })
                  }
                </View>
            </View>
            : null
            }

            {
              fourTimesDamage.length > 0 ?
              <View>
                <Text style={{alignSelf: 'center', fontSize: 18}}>Muito fraco contra: </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', marginTop: 5}}>
                  {
                    fourTimesDamage.map((item, index) => {
                      return <Text key={index} style=
                      {{backgroundColor: setBackgroundColors(item), 
                        width: 100, 
                        height: 35, 
                        textAlign: 'center', 
                        textAlignVertical: 'center', 
                        borderRadius: 15, 
                        margin: 5,
                        fontSize: 16,
                        fontWeight: '500'
                      }}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                    })
                  } 
                </View>
              </View>
              : null
            }
            
            <Text style={{alignSelf: 'center', fontSize: 18}}>Fraco contra: </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', marginTop: 5}}>
              {
                doubleDamageFrom.map((item, index) => {
                  return <Text key={index} style=
                  {{backgroundColor: setBackgroundColors(item), 
                    width: 100, 
                    height: 35, 
                    textAlign: 'center', 
                    textAlignVertical: 'center', 
                    borderRadius: 15, 
                    margin: 5,
                    fontSize: 16,
                    fontWeight: '500'
                  }}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                })
              }
            </View>

            {
              imunity.length > 0 ?
              <View>
                <Text style={{alignSelf: 'center', fontSize: 18}}>Imune contra: </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', marginTop: 5}}>
                  {
                    imunity.map((item, index) => {
                      return <Text key={index} style=
                      {{backgroundColor: setBackgroundColors(item), 
                        width: 100, 
                        height: 35, 
                        textAlign: 'center', 
                        textAlignVertical: 'center', 
                        borderRadius: 15, 
                        margin: 5,
                        fontSize: 16,
                        fontWeight: '500'
                      }}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                    })
                  }
                </View>
              </View>
              : null
            }
            
          </View>
        </ScrollView>
      </Modal>
    </View>
  )
}

export default PokemonModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})