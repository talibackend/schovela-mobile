import { ActivityIndicator, Pressable, Text } from 'react-native';
import loginStyle from '../../styles/login.style';

export default LoginButtonComponent = ({name, action, loading})=>{
    return <Pressable style={loginStyle.button} onPress={()=>{ if(!loading){return action();} }}>
        {
            loading ? <ActivityIndicator color="white" /> : <Text style={loginStyle.button_text}>{name}</Text>
        }
        </Pressable>;
}
                