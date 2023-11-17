import { ScrollView, View } from "react-native";
import SignupHeader from './signup/signup.header';
import SignupMain from './signup/signup.main';
import loginStyle from "../styles/login.style";
import appStyle from "../styles/app.style";

const SignupComponent = ({navigation, name, email, setName, setEmail, btnHandler, loading})=>{
    return <View style={[appStyle.app_container, loginStyle.login_container]}>
        <ScrollView>
            <SignupHeader />
            <SignupMain 
                navigation={navigation} 
                name={name} 
                email={email} 
                setName={setName} 
                setEmail={setEmail} 
                btnHandler={btnHandler}
                loading={loading}
            />
        </ScrollView>
    </View>;
}

export default SignupComponent;