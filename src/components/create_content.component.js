import adminStyle from "../styles/admin.style"
import appStyle from "../styles/app.style"
import contentStyle from "../styles/content.style"
import AdminHeader from "./admin/admin.header"
import { ScrollView, TextInput, View } from "react-native"
import { messages } from "../utils/consts"

export default CreateContentComponent = ({navigation})=>{
    return <View style={appStyle.app_container}>
        <AdminHeader navigation={navigation} backButton={true} name="Create Content" />
        <View style={[adminStyle.main_container, contentStyle.create_content_container]}>
            <ScrollView>
                <TextInput style={contentStyle.create_content_title_input} placeholderTextColor="grey" placeholder={messages.TITLE_PLACEHOLDER} autoCorrect={true} />
                <TextInput 
                    style={[contentStyle.create_content_title_input, contentStyle.create_content_desc_input]}
                    placeholder={messages.DESC_PLACEHOLDER}
                    autoCorrect={true}
                    placeholderTextColor="grey"
                    multiline={true}
                />
            </ScrollView>
        </View>
    </View>
}