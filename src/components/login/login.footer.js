import { View, Text, Pressable } from 'react-native';
import loginStyle from '../../styles/login.style';
import { screenNames } from '../../utils/consts';

export default LoginFooterComponent = ({navigation, message, button_name, button_link, btnHandler}) => {
    return <View style={loginStyle.dont_have_account}>
                <Text style={loginStyle.login_footer_text}>{message}  </Text>
                <Pressable style={{ flex: 3 }} onPress={() => { btnHandler ? btnHandler() : navigation.navigate(button_link) }}>
                    <Text style={loginStyle.login_signup_button}>{button_name}</Text>
                </Pressable>
            </View>;
}