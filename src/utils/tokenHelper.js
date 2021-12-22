import AsyncStorage from '@react-native-community/async-storage';

const setToken = async (value) => {
  try {
    await AsyncStorage.setItem('@authToken', value);
  } catch (e) {
    console.log('error setting token');
  }
};

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@authToken');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return false;
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('@authToken');
  } catch (e) {
    console.log('error removing token');
  }
};

export {setToken, getToken, removeToken};
