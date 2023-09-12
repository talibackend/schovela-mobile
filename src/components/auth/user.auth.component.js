import { getItem } from "../../utils/asyncStorage";
import { screenNames, storageKeyNames } from "../../utils/consts";
import { useEffect } from "react";

export const UserAuthComponent = ({navigation})=>{
    const verify = async ()=>{
        const getToken = await getItem(storageKeyNames.accessToken);
        
        if(getToken == null){
            navigation.navigate(screenNames.login);
        }
    }

    useEffect(()=>{
        verify();
    }, []);

    return null;
}