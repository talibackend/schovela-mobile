import ForgotPasswordOtpHeader from './forgot_password/forgot_password_otp.header';
import ForgotPasswordOtpMain from './forgot_password/forgot_password_otp.main';
import appStyle from "../styles/app.style";
import loginStyle from "../styles/login.style";
import { View } from "react-native";


export default ForgotPasswordOtpComponent = ({
    navigation,
    setOtp,
    setPassword,
    setConfirmPassword,
    loading,
    btnHandler,
    email
})=>{
    return  <View style={[appStyle.app_container, loginStyle.login_container]}>
                <ForgotPasswordOtpHeader email={email} />
                <ForgotPasswordOtpMain 
                    navigation={navigation}
                    setOtp={setOtp}
                    setPassword={setPassword}
                    setConfirmPassword={setConfirmPassword}
                    loading={loading}
                    btnHandler={btnHandler}
                />
            </View>;
}