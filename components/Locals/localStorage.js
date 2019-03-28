import {AsyncStorage} from 'react-native';

export const setLocalStorageRepos = async (props) =>{
    await AsyncStorage.setItem("repositories",JSON.stringify(props));
}
export const getLocalStorageRepos = async ()=>{
    return JSON.parse(await AsyncStorage.getItem("repositories"));
}