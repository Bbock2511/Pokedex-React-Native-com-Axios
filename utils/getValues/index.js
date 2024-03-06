import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('cache-pokemons');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e)
    }
  };

export default getData;