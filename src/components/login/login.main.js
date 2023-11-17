import { View, TextInput } from 'react-native';
import PasswordInput from '../password_input.component';
import LoginButton from './login.button';
import ForgotPasswordLink from './login.forgot_password_link';
import LoginFooter from './login.footer'
import loginStyle from '../../styles/login.style';
import { messages, screenNames } from '../../utils/consts';


export default LoginMainComponent = ({
    navigation,
    email,
    password,
    setEmail,
    setPassword,
    loading,
    btnHandler
})=>{

    return  <View style={loginStyle.input_wrapper}>
                <TextInput autoCapitalize="none" value={email} style={loginStyle.input_field} placeholderTextColor="grey" placeholder={messages.EMAIL_PLACEHOLDER} onChangeText={(value)=>{ return setEmail(value); }} autoComplete='email' autoCorrect={false} />
                <PasswordInput style={loginStyle.input_field} stateUpdater={setPassword} />
                <ForgotPasswordLink navigation={navigation} />
                <LoginButton loading={loading} name={messages.LOGIN} action={ ()=>{ btnHandler(); } } />
                <LoginFooter button_link={screenNames.sign_up} button_name={messages.SIGNUP} message="Don't have an account?  " navigation={navigation} />
            </View>
}