import AsyncStorage from '@react-native-community/async-storage';

const setToken = async (value) => {
  try {
    await AsyncStorage.setItem('@intro', value);
    // await AsyncStorage.removeItem('@intro');
  } catch (e) {
    console.log('error setting intro token');
  }
};

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@intro');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log('error getting intro token');
    return null;
  }
};

export {setToken, getToken};
