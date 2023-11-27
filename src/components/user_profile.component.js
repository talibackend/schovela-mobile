import { View } from "react-native";
import AdminHeader from './admin/admin.header';
import appStyle from "../styles/app.style";
import UserProfileMain from "./user_profile/user_profile.main";

export default UserProfileComponent = ({ navigation })=>{
    return <View style={appStyle.app_container}>
        <AdminHeader navigation={navigation} backButton={true} name="My Profile" />
        <UserProfileMain navigation={navigation} />
    </View>
}