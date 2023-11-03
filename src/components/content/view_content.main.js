import { View, Text, ScrollView, Image, Pressable } from "react-native";
import contentStyle from "../../styles/content.style";
import { screenNames } from "../../utils/consts";
import adminStyle from "../../styles/admin.style";
import Icon from "react-native-vector-icons/Ionicons";
import AdminUserEachCard from '../admin/admin_users/admin_users.each_card';
import ContentAdminActionButtons from './view_content/admin_actions.main';

export default ViewContentMain = ({ navigation })=>{

    return <View style={[adminStyle.main_container, contentStyle.create_content_container]}>
        <ScrollView>
            <ContentAdminActionButtons />
            <Text style={contentStyle.view_content_title}>Hello world, this is the title of the content that we are trying to view.</Text>
            <View style={[contentStyle.create_content_upload_section, contentStyle.view_content_attachment_preview]}>
                <Text style={contentStyle.attachment_preview_text}>Attachment Preview</Text>
            </View>
            <Text style={contentStyle.description}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
            <View style={contentStyle.stat_section}>
                <View style={contentStyle.stat_each_section}>
                    <Image style={contentStyle.stat_images} source={require('../../../assets/static/like.png')} />
                    <Text style={contentStyle.description}>20</Text>
                </View>
                <View style={contentStyle.stat_each_section}>
                    <Icon style={contentStyle.stat_icons} size={20} name="eye-outline" />
                    <Text style={contentStyle.description}>20</Text>
                </View>
                <View style={contentStyle.stat_each_section}>
                    <Icon style={contentStyle.stat_icons} size={20} name="share-outline" />
                    <Text style={contentStyle.description}>20</Text>
                </View>
                <View style={contentStyle.stat_each_section}>
                    <Icon style={contentStyle.stat_icons} size={20} name="download-outline" />
                    <Text style={contentStyle.description}>20</Text>
                </View>
            </View>
            <View>
                {/* <Text>Poster</Text> */}
                <AdminUserEachCard
                    id={1}
                    image={require('../../../assets/static/user.png')}
                    name="Femi Fatokun"
                    email="fatokunfemi03@gmail.com"
                    date_joined={new Date().toDateString()}
                    navigation={navigation}
                    link={screenNames.admin_dashboard_user_info}
                />
            </View>
        </ScrollView>
    </View>
}