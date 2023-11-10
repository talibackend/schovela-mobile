import { View } from "react-native";
import AdminHeader from './admin/admin.header';
import appStyle from "../styles/app.style";
import ViewContentMain from "./content/view_content.main";

export default ViewContentComponent = ({ navigation, post, loading })=>{
    return <View style={appStyle.app_container}>
        <AdminHeader navigation={navigation} backButton={true} name={post ? post.title : ""} />
        <ViewContentMain navigation={navigation} post={post} loading={loading} />
    </View>
}