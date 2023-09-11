import { View, Text } from "react-native";
import loginStyle from "../../styles/login.style";

export default ForgotPasswordHeaderComponent = ()=>{
    return <View style={loginStyle.login_header_section}>
                <Text style={loginStyle.login_header_text}>Lost your password?</Text>
                <Text style={loginStyle.login_header_sub}>Don't worry,</Text>
                <Text style={loginStyle.login_header_sub}>Let's help you recover your account in no time.</Text>
            </View>;
}