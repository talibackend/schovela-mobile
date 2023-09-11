import SignupComponent from "../components/signup.component";
import { useState, useEffect } from 'react';
import { showToast } from "../utils/toast";
import { 
    toast_types, 
    messages, 
    request_methods, 
    storageKeyNames, 
    screenNames, 
    api_routes
} from "../utils/consts";
import { openRequest } from "../utils/network";
import { setItem } from "../utils/asyncStorage";

export default SignupScreen = ({navigation})=>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    
    const signupFunction = async ()=>{
        if(name.length < 1){
            showToast(toast_types.error, messages.NAME_REQUIRED);
            return;
        }
        if(email.length < 1){
            showToast(toast_types.error, messages.EMAIL_REQUIRED);
            return;
        }
        try{
            setLoading(true);
            const request = await openRequest(request_methods.POST, api_routes.signup, { email, fullname : name });
            if(typeof(request) == "string"){
                showToast(toast_types.error, request);
                setLoading(false);
                return;
            }
            await setItem(storageKeyNames.user, JSON.stringify(request.user));
            await setItem(storageKeyNames.accessToken, request.bearerTokens);
            showToast(toast_types.success, messages.SIGNUP_SUCCESSFUL, 3);
            navigation.navigate(screenNames.set_password);
        }catch(error){
            showToast(toast_types.error, error);
            return;
        }
        setLoading(false);
    }

    useEffect(()=>{
        
    }, []);

    return <SignupComponent 
                navigation={navigation} 
                setName={setName} 
                name={name} 
                setEmail={setEmail} 
                email={email}
                btnHandler={signupFunction}
                loading={loading}
            />;
}