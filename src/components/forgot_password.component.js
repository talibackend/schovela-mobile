import appStyle from "../styles/app.style";
import loginStyle from "../styles/login.style";
import ForgotPasswordHeader from './forgot_password/forgot_password.header';
import { ScrollView, View } from "react-native";
import ForgotPasswordMain from './forgot_password/forgot_password.main'

export default ForgotPasswordComponent = ({
    navigation, 
    setEmail, 
    email,
    loading,
    btnHandler
})=>{
    return  <View style={[appStyle.app_container, loginStyle.login_container]}>
                <ScrollView>
                    <ForgotPasswordHeader />
                    <ForgotPasswordMain 
                        navigation={navigation} 
                        email={email} 
                        setEmail={setEmail} 
                        loading={loading}
                        btnHandler={btnHandler}
                    />
                </ScrollView>
            </View>;
}