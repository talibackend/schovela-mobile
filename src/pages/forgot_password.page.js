import ForgotPasswordComponent from '../components/forgot_password.component';
import { useEffect, useState } from 'react';
import { messages, api_routes, request_methods, screenNames, toast_types, storageKeyNames } from '../utils/consts';
import { openRequest } from '../utils/network';
import { setItem } from '../utils/asyncStorage';
import { showToast } from '../utils/toast'

export default ForgotPasswordScreen = ({navigation})=>{
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const btnHandler = async ()=>{
        if(email.length < 1){
            showToast(toast_types.error, messages.EMAIL_REQUIRED);
            return;
        }
        try{
            setLoading(true);
            let body = {
                email
            }
            const request = await openRequest(request_methods.PATCH, api_routes.forgot_password, body);
            if(typeof(request) == "string"){
                showToast(toast_types.error, request);
                setLoading(false);
                return;
            }
            await setItem(storageKeyNames.forgot_email, email);
            showToast(toast_types.success, `An otp has been sent to ${email}`, 3);
            navigation.navigate(screenNames.forgot_password_otp);
        }catch(error){
            console.log(error);
            showToast(toast_types.error, error)
        }
        setLoading(false)
    }

    return <ForgotPasswordComponent 
            navigation={navigation} 
            email={email} 
            setEmail={setEmail} 
            btnHandler={btnHandler}
            loading={loading}
        />
}