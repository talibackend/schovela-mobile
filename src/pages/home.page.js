import { getItem } from "../utils/asyncStorage";
import { useState, useEffect } from "react";
import { useToast } from "react-native-toast-notifications";
import { errorToastOptions, messages, storageKeyNames, screenNames, user_roles } from "../utils/consts";
import AdminDashboardContentsScreen from './admin_dashboard_contents.page';
import { BackHandler } from "react-native";

export default HomeScreen = ({navigation})=>{
    // const [loggedin, setLoggedIn] = useState(false);
    // const [token, setToken] = useState(null);
    const toast = useToast();
    
    useEffect(()=>{
        (async ()=>{
            try{
                let localToken = await getItem(storageKeyNames.accessToken);
                let localUser = JSON.parse(await getItem(storageKeyNames.user));
                
                if(!localToken){
                    navigation.navigate(screenNames.login)
                }else{
                    if(localUser.role == user_roles.admin){
                        navigation.navigate(screenNames.admin_dashboard);
                    }
                }
            }catch(error){
                toast.show(messages.APP_ERROR, errorToastOptions);
            }
            
        })()
        BackHandler.addEventListener("hardwareBackPress", ()=>{
            return true;
        });
    }, []);

    return <AdminDashboardContentsScreen navigation={navigation} title="Home" allowBack={false} />
}