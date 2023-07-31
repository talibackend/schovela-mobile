import { View, Text } from "react-native";
import loginStyle from "../../styles/login.style";

export default SetBasicsHeaderComponent = ()=>{
    return <View style={loginStyle.login_header_section}>
                <Text style={loginStyle.login_header_text}>Complete Profile</Text>
            </View>;
}