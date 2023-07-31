import { getItem } from "../utils/asyncStorage";
import { useState, useEffect } from "react";
import { useToast } from "react-native-toast-notifications";
import { errorToastOptions, messages, storageKeyNames, screenNames } from "../utils/consts";
import { Text } from "react-native";

export default HomeScreen = ({navigation})=>{
    const [loggedin, setLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const toast = useToast();
    
    useEffect(()=>{
        (async ()=>{
            try{
                let localToken = await getItem(storageKeyNames.accessToken);
                if(localToken == null){
                    setLoggedIn(false);
                }else{
                    setLoggedIn(true);
                    setToken(localToken);
                }
            }catch(error){
                toast.show(messages.APP_ERROR, errorToastOptions);
            }
            
        })()
    }, []);

    useEffect(()=>{
        if (!loggedin) {
            navigation.navigate(screenNames.login)
        }
    }, [loggedin])

    return <Text>Hello world this is the homepage.</Text>
}