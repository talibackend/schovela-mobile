import { View, Text, ScrollView } from "react-native";
import contentStyle from "../../styles/content.style";
import adminStyle from "../../styles/admin.style";

export default ViewContentMain = ({ navigation })=>{

    return <View style={[adminStyle.main_container, contentStyle.create_content_container]}>
        <ScrollView>
            <Text style={contentStyle.view_content_title}>Hello world, this is the title of the content that we are trying to view.</Text>
            <View style={[contentStyle.create_content_upload_section, contentStyle.view_content_attachment_preview]}>
                <Text>Attachment Preview</Text>
            </View>
            <Text style={contentStyle.description}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
        </ScrollView>
    </View>
}