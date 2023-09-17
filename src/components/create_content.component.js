import adminStyle from "../styles/admin.style"
import appStyle from "../styles/app.style"
import AdminHeader from "./admin/admin.header"
import { ScrollView, TextInput, View } from "react-native"
import { messages } from "../utils/consts"

export default CreateContentComponent = ({navigation})=>{
    return <View style={appStyle.app_container}>
        <AdminHeader navigation={navigation} backButton={true} name="Create Content" />
        <View style={adminStyle.main_container}>
            <ScrollView>
                <TextInput style={loginStyle.input_field} placeholderTextColor="grey" placeholder={messages.TITLE_PLACEHOLDER} autoCorrect={true} />
            </ScrollView>
        </View>
    </View>
}