import { View } from "react-native";
import AdminHeader from './admin/admin.header';
import appStyle from "../styles/app.style";
import ViewContentMain from "./content/view_content.main";

export default ViewContentComponent = ({ views, hideLoading, handleHideUnhide, navigation, post, loading, openFull, setOpenFull, hasPrivilege })=>{
    return <View style={appStyle.app_container}>
        <AdminHeader navigation={navigation} backButton={true} name={post ? post.title : ""} />
        <ViewContentMain views={views} hideLoading={hideLoading} handleHideUnhide={handleHideUnhide} hasPrivilege={hasPrivilege} navigation={navigation} post={post} loading={loading} openFull={openFull} setOpenFull={setOpenFull}  />
    </View>
}