import loginStyle from "../../styles/login.style";
import { View, TextInput } from 'react-native';
import LoginButton from '../login/login.button';
import LoginFooter from '../login/login.footer';
import { messages, screenNames } from "../../utils/consts";

export default SignupMainComponent = ({navigation, name, email, setName, setEmail, btnHandler, loading})=>{

    return <View style={loginStyle.input_wrapper}>
        <TextInput placeholderTextColor="grey" placeholder={messages.NAME} defaultValue={name} onChangeText={(e)=>{ setName(e) }} style={loginStyle.input_field} autoCorrect={true} />
        <TextInput placeholderTextColor="grey" placeholder={messages.EMAIL_PLACEHOLDER} defaultValue={email} onChangeText={(e)=>{ setEmail(e) }} style={loginStyle.input_field} autoCorrect={false} autoComplete="email" />
        <LoginButton loading={loading} name={messages.CONTINUE} action={()=>{ return btnHandler(); }} />
        <LoginFooter button_link={screenNames.login} button_name={messages.LOGIN} message="Already have an account? " navigation={navigation} />
    </View>;
}