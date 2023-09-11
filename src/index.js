import SplashScreen from "./pages/splashscreen.page";
import LoginScreen from './pages/login.page';
import HomeScreen from './pages/home.page';
import SignupScreen from './pages/signup.page';
import ForgotPasswordScreen from './pages/forgot_password.page';
import ForgotPasswordOtpScreen from './pages/forgot_password_otp.page';
import SetPasswordScreen from './pages/set_password.page';
import SetBasicsScreen from './pages/set_basics.page';
import AdminDashboardScreen from './pages/admin_dashboard.page';
import AdminDashboardUsersScreen from './pages/admin_dashboard_users.page';
import AdminDashboardUserInfoScreen from './pages/admin_dashboard_user_info.page';
// import ForgotPasswordSuccessScreen from './pages/forgot_password_success.page';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenNames } from "./utils/consts";
import { Text } from "react-native";
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

const DummyComponent = ()=>{
    return <Text style={{ fontSize : 50 }}>This is a dummy page....</Text>
}

const Scafffold = ()=>{
    return  <>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name={screenNames.splashscreen} options={{ headerShown : false }} component={SplashScreen} />
                        <Stack.Screen name={screenNames.home} options={{ headerShown : false }} component={HomeScreen} />
                        <Stack.Screen name={screenNames.login} options={{ headerShown : false }} component={LoginScreen} />
                        <Stack.Screen name={screenNames.forgot_password} options={{ headerShown : false }} component={ForgotPasswordScreen} />
                        <Stack.Screen name={screenNames.sign_up} options={{ headerShown : false }} component={SignupScreen} />
                        <Stack.Screen name={screenNames.forgot_password_otp} options={{ headerShown : false }} component={ForgotPasswordOtpScreen} />
                        <Stack.Screen name={screenNames.set_password} options={{ headerShown : false }} component={SetPasswordScreen} />
                        <Stack.Screen name={screenNames.set_basics} options={{ headerShown : false }} component={SetBasicsScreen} />
                        {/* <Stack.Screen name={screenNames.forgot_password_success} options={{ headerShown : false }} component={ForgotPasswordSuccessScreen} /> */}
                        <Stack.Screen name={screenNames.admin_dashboard} options={{ headerShown : false }} component={AdminDashboardScreen} />
                        <Stack.Screen name={screenNames.admin_dashboard_users} options={{ headerShown : false }} component={AdminDashboardUsersScreen} />
                        <Stack.Screen name={screenNames.admin_dashboard_user_info} options={{ headerShown : false }} component={AdminDashboardUserInfoScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
                <Toast />
            </>
}

export default Scafffold;