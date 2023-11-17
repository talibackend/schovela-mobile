import { ScrollView, TextInput } from 'react-native';
import LoginButton from '../login/login.button';
import LoginFooter from '../login/login.footer'
import loginStyle from '../../styles/login.style'
import { useState } from 'react';
import { messages, screenNames } from '../../utils/consts';
import PasswordInput from '../password_input.component';

export default ForgotPasswordOtpMainComponent = ({
    navigation,
    setOtp,
    setPassword,
    setConfirmPassword,
    loading,
    btnHandler
})=>{

    return  <ScrollView style={loginStyle.input_wrapper}>
                <TextInput placeholderTextColor="grey" style={loginStyle.input_field} placeholder={messages.OTP} onChangeText={(value)=>{ return setOtp(value); }} autoComplete='email' autoCorrect={false} />
                <PasswordInput style={loginStyle.input_field} stateUpdater={setPassword} />
                <PasswordInput placeholder={messages.CONFIRM_PASSWORD} style={loginStyle.input_field} stateUpdater={setConfirmPassword} />
                <LoginButton loading={loading} name={messages.COMPLETE} action={ ()=>{ btnHandler() } } />
                <LoginFooter button_link={screenNames.login} button_name={messages.RESEND} message="Didn't get the otp? " navigation={navigation} />
            </ScrollView>
}