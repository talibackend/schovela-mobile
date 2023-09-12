import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key, value)=>{
    try{
        await AsyncStorage.setItem(key, value);
        return true;
    }catch(error){
        throw error;
    }
}

export const getItem = async (key)=>{
    try{
        let item = await AsyncStorage.getItem(key);
        return item;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const deleteItem = async (key)=>{
    await AsyncStorage.removeItem(key);
}