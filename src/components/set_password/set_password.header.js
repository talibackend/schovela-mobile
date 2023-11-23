import { View, Text } from "react-native";
import loginStyle from "../../styles/login.style";

export default SetPasswordHeaderComponent = ()=>{
    return <View style={loginStyle.login_header_section}>
                <Text style={loginStyle.login_header_text}>Set Password</Text>
                <Text style={loginStyle.login_header_sub}>An email was sent to your mail, please use it to continue.</Text>
                <Text style={loginStyle.login_header_sub}>It is possible that the email gets delivered to your spam folder.</Text>
            </View>;
}