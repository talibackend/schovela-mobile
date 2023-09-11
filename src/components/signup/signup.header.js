import { View, Text } from "react-native";
import loginStyle from "../../styles/login.style";

export default SignupHeaderComponent = ()=>{
    return <View style={loginStyle.login_header_section}>
                <Text style={loginStyle.login_header_text}>Let's sign you up</Text>
                <Text style={loginStyle.login_header_sub}>Follow the steps to start using schovela in no time.</Text>
            </View>;
}