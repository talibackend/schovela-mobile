import appStyle from "../styles/app.style"
import AdminHeader from "./admin/admin.header"
import CreateContentMain from './content/manage/create_content.main';
import { View } from "react-native"

export default CreateContentComponent = ({navigation})=>{
    return <View style={appStyle.app_container}>
        <AdminHeader navigation={navigation} backButton={true} name="Create Content" />
        <CreateContentMain />
    </View>
}