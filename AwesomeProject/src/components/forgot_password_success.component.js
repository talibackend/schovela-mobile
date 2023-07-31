import { View, Text } from 'react-native';
import appStyle from '../styles/app.style';
import forgotPasswordStyle from '../styles/forgot_password.style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'


export default ForgotPasswordSuccessComponent = ({navigation})=>{
    return <View style={[appStyle.app_container, forgotPasswordStyle.forgot_success_container]}>
        <View style={forgotPasswordStyle.forgot_success_container}>
            {/* <Text>Hello Hell!</Text> */}
            <FontAwesomeIcon icon={faLock} style={forgotPasswordStyle.iconStyle} size={150} />
            <Text>Password Reset Successful, Fuck Everyone</Text>
            <View>
                
            </View>
        </View>
    </View>;
}