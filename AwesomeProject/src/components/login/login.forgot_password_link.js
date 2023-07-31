import { View, Pressable, Text } from 'react-native';
import loginStyle from '../../styles/login.style';
import { screenNames } from '../../utils/consts';

export default LoginForgotPasswordLinkComponent = ({navigation})=>{
    return <View style={loginStyle.forgot_password_container}>
                <Pressable onPress={() => { navigation.navigate(screenNames.forgot_password) }}>
                    <Text style={loginStyle.forgot_password}>Forgot Password?</Text>
                </Pressable>
            </View>;
}