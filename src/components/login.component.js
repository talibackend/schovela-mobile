import loginStyle from "../styles/login.style";
import appStyle from "../styles/app.style";
import { View } from "react-native";
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
    </View>
}

export default LoginComponent;