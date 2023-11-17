import { View, TextInput } from 'react-native';
import LoginButton from '../login/login.button';
import LoginFooter from '../login/login.footer'
import loginStyle from '../../styles/login.style'
import { useState } from 'react';
import { messages, screenNames } from '../../utils/consts';
import PasswordInput from '../password_input.component';

export default SetPasswordMainComponent = ({navigation, setOtp, setPassword, setCPassword, btnHandler, loading})=>{

    return  <View style={loginStyle.input_wrapper}>
                <TextInput placeholderTextColor="grey" style={loginStyle.input_field} placeholder={messages.OTP} keyboardType="numeric" onChangeText={(value)=>{ return setOtp(value); }} autoComplete='email' autoCorrect={false} />
                <PasswordInput style={loginStyle.input_field} stateUpdater={setPassword} />
                <PasswordInput placeholder={messages.CONFIRM_PASSWORD} style={loginStyle.input_field} stateUpdater={setCPassword} />
                <LoginButton loading={loading} name={messages.NEXT} action={()=>{ return btnHandler(); }} />
                <LoginFooter button_link={screenNames.login} button_name={messages.RESEND} message="Didn't get the otp? " navigation={navigation} />
            </View>
}