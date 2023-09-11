import LoginComponent from '../components/login.component';
import { useState, useEffect } from 'react';
import { messages, api_routes, request_methods, screenNames, toast_types, storageKeyNames } from '../utils/consts';
import { openRequest } from '../utils/network';
import { setItem } from '../utils/asyncStorage';
import { showToast } from '../utils/toast'
import { user_roles } from '../utils/consts';

export default LoginScreen = ({navigation})=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const btnHandler = async ()=>{
        if(email.length < 1){
            showToast(toast_types.error, messages.EMAIL_REQUIRED);
            return;
        }
        if(password.length < 8){
            showToast(toast_types.error, messages.INVALID_PASSWORD);
            return;
        }
        try{
            setLoading(true);
            let body = {
                email, password
            }
            const request = await openRequest(request_methods.POST, api_routes.login, body);
            if(typeof(request) == "string"){
                showToast(toast_types.error, request);
                setLoading(false);
                return;
            }
            await setItem(storageKeyNames.user, JSON.stringify({...request.user}));
            await setItem(storageKeyNames.accessToken, request.bearerTokens);
            showToast(toast_types.success, messages.LOGIN_SUCCESSFUL, 3);
            if(request.user.role == user_roles.admin){
                navigation.navigate(screenNames.admin_dashboard);
            }else{
                navigation.navigate(screenNames.home);
            }
        }catch(error){
            console.log(error);
            showToast(toast_types.error, error)
        }
        setLoading(false)
    }

    return <LoginComponent 
        navigation={navigation} 
        email={email}
        password={password}
        setPassword={setPassword}
        setEmail={setEmail}
        loading={loading}
        btnHandler={btnHandler}
    />;
}