import ForgotPasswordOtpComponent from '../components/forgot_password_otp.component';
import { useState, useEffect } from 'react';
import { getItem, setItem } from '../utils/asyncStorage';
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


export default ForgotPasswordOtpScreen = ({navigation})=>{
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        (async ()=>{ setEmail(await getItem(storageKeyNames.forgot_email)); })()
    }, []);

    const btnHandler = async ()=>{
        if(email.length < 1){
            showToast(toast_types.error, messages.UNAUTHORIZED_ACTION);
            navigation.navigate(screenNames.login)
            return;
        }
        if(!parseInt(otp) || otp.length < 6){
            showToast(toast_types.error, messages.INVALID_OTP);
            return;
        }
        if(password.length < 8){
            showToast(toast_types.error, messages.INVALID_PASSWORD);
            return;
        }
        if(password !== confirm_password){
            showToast(toast_types.error, messages.INVALID_CPASSWORD);
            return;
        }
        try{
            setLoading(true);
            let body = {
                email,
                code : otp,
                NewPassword : password,
                confirmPassword : confirm_password
            }
            const request = await openRequest(request_methods.POST, api_routes.reset_password, body);
            if(typeof(request) == "string"){
                showToast(toast_types.error, request);
                setLoading(false);
                return;
            }
            // await setItem(storageKeyNames.forgot_email, email);
            showToast(toast_types.success, messages.PASSWORD_RESET, 3);
            navigation.navigate(screenNames.login);
        }catch(error){
            console.log(error);
            showToast(toast_types.error, error)
        }
        setLoading(false)
    }

    return <ForgotPasswordOtpComponent 
        navigation={navigation}
        setOtp={setOtp}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        loading={loading}
        btnHandler={btnHandler}
        email={email}
    />
}