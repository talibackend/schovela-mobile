import { View, Text, ScrollView, Image, ActivityIndicator, Pressable } from "react-native";
import contentStyle from "../../styles/content.style";
import { screenNames } from "../../utils/consts";
import adminStyle from "../../styles/admin.style";
import Icon from "react-native-vector-icons/Ionicons";
import AdminUserEachCard from '../admin/admin_users/admin_users.each_card';
import ContentAdminActionButtons from './view_content/admin_actions.main';
import AttachmentViewComponent from './view_content/attachment_view.main';

export default ViewContentMain = ({ navigation, post, loading })=>{

    return <View style={[adminStyle.main_container, contentStyle.create_content_container]}>
        <ScrollView>
            {
                loading ? <View style={{ paddingTop: 20 }}>
                    <ActivityIndicator color='black' />
                </View> : null
            }
            {
                post ? 
                <>
                <ContentAdminActionButtons navigation={navigation} />
                <Text style={contentStyle.view_content_title}>{post.title}</Text>
                <AttachmentViewComponent path={post.attachment} ext={post.attachment_ext} />
                <Text style={contentStyle.description}>{post.desc}</Text>
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
                </View></> : null
            }
        </ScrollView>
    </View>
}