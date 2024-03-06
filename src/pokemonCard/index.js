import { Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import PokemonModal from '../pokemonDetailsModal';


const setBackgroundColor = (type) => {
    return type == "Grass" ? "#03bb85" : 
    type == "Fire" ? "#ffa500" : 
    type == "Water" ? "#0077be" : 
    type == "Bug" ? "#77dd77" : 
    type == "Normal" ? "#fdfd96" :
    type == "Poison" ? "#503459" :
    type == "Electric" ? "#ffff00" :
    type == "Ground" ? "#d2b48c" :
    type == "Fairy" ? "#fdcae1" :
    type == "Fighting" ? "#c70039" :
    type == "Psychic" ? "#9966cc" :
    type == "Rock" ? "#a9a9a9" :
    type == "Ghost" ? "#4b0082" :
    type == "Dragon" ? "#ff4500" :
    type == "Ice" ? "#87ceeb" :
    "gray"
}

const setImageBackgroundColor = (type) => {
    return type == "Grass" ? "#68ddbd" : 
    type == "Fire" ? "#ffecb3" : 
    type == "Water" ? "#6699CC" : 
    type == "Bug" ? "#cff6c8" :
    type == "Normal" ? "#fffee1" :
    type == "Poison" ? "#b695c0" :
    type == "Electric" ? "#ffffa2" :
    type == "Ground" ? "#E5CEAD" :
    type == "Fairy" ? "#fff0f6" :
    type == "Fighting" ? "#e04970" :
    type == "Psychic" ? "#b999e6" :
    type == "Rock" ? "#cccccc" :
    type == "Ghost" ? "#725695" :
    type == "Dragon" ? "#ff7f50" :
    type == "Ice" ? "#b0e2ff" :
    "gray"
}

const PokemonCard = ({ item, typesLenght }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const type = item.types[0];

    let corFundoImagem = setImageBackgroundColor(type);

    const container = {
        backgroundColor: setBackgroundColor(type),
        alignItems: 'center', 
        margin: 5, 
        borderRadius: 15, 
        height: 100
    }

    const imageContainerStyle = {
        backgroundColor: corFundoImagem,
        flex: 1, 
        height: '100%',
        borderTopRightRadius: 11, 
        borderBottomRightRadius: 14, 
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50
    }

    return (
        <View >

            <PokemonModal visible={modalVisible} setVisible={setModalVisible} pokemonUrl={item.url} pokemonName={item.name} corFundo={corFundoImagem}/>
            <View style={container}>

                <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}} style={{flex: 1, width: '100%', paddingLeft: 5, height: '100%', borderRadius: 13}}>
                    <View style={{flexDirection:'row', width: '100%',}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', marginRight: 10, height: 25}}>#{item.id}</Text>
                        <View style={{width: '60%', flexDirection: 'column', padding: 5,}}>
                            <Text style={{marginLeft: 25}}>{item.name}</Text>
                            
                            <View style={{flexDirection: 'row', width: 'auto', justifyContent: 'space-evenly', alignSelf: 'center', marginTop: 30}}>
                                {
                                    item.types.map((type, index) => (
                                        <Text key={index} style={{marginLeft: index == 1 ? 20 : 0, borderWidth: 1, padding: 5, borderRadius: 13, width: typesLenght > 1 ? 100 : 220, textAlign: 'center', height: 30}}>{type}</Text>
                                    ))
                                }
                            </View>
                        </View>
                        <View style = {imageContainerStyle}>
                            <Image
                                source={{ uri: item.image }}
                                style={{ width: 95, height: 100, resizeMode: 'contain', marginLeft: 15, alignSelf: 'center'}}
                            />
                        </View>
                        
                    </View>

                </TouchableOpacity>

            </View>
        </View>
    )
}

export default PokemonCard;