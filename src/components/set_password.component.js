import { ScrollView, View } from "react-native";
import appStyle from "../styles/app.style";
import loginStyle from "../styles/login.style";
import SetPasswordHeader from './set_password/set_password.header';
import SetpasswordMain from './set_password/set_password.main';


export default SetPasswordComponent = ({navigation, setOtp, setPassword, setCPassword, btnHandler, loading})=>{
    return <View style={[appStyle.app_container, loginStyle.login_container]}>
        <ScrollView>
            <SetPasswordHeader />
            <SetpasswordMain 
                navigation
                setOtp={setOtp}
                setCPassword={setCPassword}
                setPassword={setPassword} 
                btnHandler={btnHandler}
                loading={loading}
            />
        </ScrollView>
    </View>;
}