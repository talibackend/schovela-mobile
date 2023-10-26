import { View } from "react-native";
import AdminHeader from './admin/admin.header';
import appStyle from "../styles/app.style";
import ViewContentMain from "./content/view_content.main";

export default ViewContentComponent = ({ navigation })=>{
    return <View style={appStyle.app_container}>
        <AdminHeader navigation={navigation} backButton={true} name="Title goes here...." />
        <ViewContentMain navigation={navigation} />
    </View>
}