import { View, TextInput } from 'react-native';
import LoginButton from '../login/login.button';
import LoginFooter from '../login/login.footer'
import loginStyle from '../../styles/login.style'
import { useState } from 'react';
import { messages, screenNames } from '../../utils/consts';


export default ForgotPasswordMainComponent = ({
        navigation, 
        email, 
        setEmail,
        loading,
        btnHandler
    })=>{
    return  <View style={loginStyle.input_wrapper}>
                <TextInput  placeholderTextColor="grey" style={loginStyle.input_field} placeholder={messages.EMAIL_PLACEHOLDER} onChangeText={(value)=>{ return setEmail(value); }} autoComplete='email' autoCorrect={false} />
                <LoginButton loading={loading} name={messages.NEXT} action={()=>{ btnHandler(); }} />
                <LoginFooter button_link={screenNames.login} button_name={messages.LOGIN} message="Back to " navigation={navigation} />
            </View>
}