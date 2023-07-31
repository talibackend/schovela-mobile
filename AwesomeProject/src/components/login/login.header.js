import { View, Text } from "react-native";
import loginStyle from "../../styles/login.style";

export default LoginHeaderComponent = ()=>{
    return <View style={loginStyle.login_header_section}>
                <Text style={loginStyle.login_header_text}>Let's sign you in</Text>
                <Text style={loginStyle.login_header_sub}>Welcome Back,</Text>
                <Text style={loginStyle.login_header_sub}>We missed you while you were away</Text>
            </View>;
}