import { View, Text } from "react-native";
import loginStyle from "../../styles/login.style";

export default ForgotPasswordOtpHeaderComponent = ({ email })=>{
    return <View style={loginStyle.login_header_section}>
                <Text style={loginStyle.login_header_text}>Reset Password</Text>
                <Text style={loginStyle.login_header_sub}>An Otp was send to {email}, please use the otp here.</Text>
                <Text style={loginStyle.login_header_sub}>It is possible that the email gets delivered to your spam folder.</Text>
            </View>;
}