import loginStyle from "../styles/login.style";
import appStyle from "../styles/app.style";
import { ScrollView, View } from "react-native";
import LoginHeader from "./login/login.header";
import LoginMain from './login/login.main';

const LoginComponent = ({ 
    navigation,
    email, 
    password,
    setEmail,
    setPassword,
    loading,
    btnHandler
})=>{
    return <View style={[appStyle.app_container, loginStyle.login_container]}>
        <ScrollView>
            <LoginHeader />
            <LoginMain 
                navigation={navigation}
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                loading={loading}
                btnHandler={btnHandler}
            />
        </ScrollView>
    </View>
}

export default LoginComponent;