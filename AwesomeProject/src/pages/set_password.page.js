import SetPasswordComponent from '../components/set_password.component';
import { useState, useEffect } from 'react';
import { showToast } from '../utils/toast';
import { api_routes, messages, request_methods, screenNames, storageKeyNames, toast_types } from '../utils/consts';
import { authRequest } from '../utils/network';
import { getItem, setItem } from '../utils/asyncStorage';

export default SetPasswordScreen = ({navigation})=>{
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const setPasswordFunction = async ()=>{
        if(otp.length !== 6){
            showToast(toast_types.error, messages.INVALID_OTP);
            return;
        }
        if(password.length < 8){
            showToast(toast_types.error, messages.INVALID_PASSWORD);
            return;
        }
        if(password != cpassword){
            showToast(toast_types.error, messages.INVALID_CPASSWORD);
            return;
        }

        try{
            setLoading(true);
            const request = await authRequest(request_methods.POST, api_routes.verify_otp, { code : otp, password, confirmPassword : cpassword });
            if(typeof(request) == "string"){
                showToast(toast_types.error, request);
                setLoading(false);
                return;
            }
            let savedUser = JSON.parse((await getItem(storageKeyNames.user)));
            await setItem(storageKeyNames.user, JSON.stringify({...savedUser, status : true}));
            showToast(toast_types.success, messages.PASSWORD_SET, 3);
            navigation.navigate(screenNames.set_basics);
        }catch(error){
            console.log(error);
            showToast(toast_types.error, error);
        }
        setLoading(false);
    }

    return <SetPasswordComponent 
            navigation={navigation} 
            setOtp={setOtp} 
            setPassword={setPassword} 
            setCPassword={setCPassword}
            btnHandler={setPasswordFunction}
            loading={loading}
        />
}