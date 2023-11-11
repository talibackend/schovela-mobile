import { getItem } from "../utils/asyncStorage";
import { useState, useEffect } from "react";
import { useToast } from "react-native-toast-notifications";
import { errorToastOptions, messages, storageKeyNames, screenNames, user_roles } from "../utils/consts";
import AdminDashboardContentsScreen from './admin_dashboard_contents.page';

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
    }, []);

    // useEffect(()=>{
    //     if (!loggedin) {
    //         navigation.navigate(screenNames.login)
    //     }
    // }, [loggedin])

    return <AdminDashboardContentsScreen navigation={navigation} />
}