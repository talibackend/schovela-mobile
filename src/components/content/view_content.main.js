import { View, Text, ScrollView, Image, ActivityIndicator, Pressable } from "react-native";
import contentStyle from "../../styles/content.style";
import { screenNames } from "../../utils/consts";
import adminStyle from "../../styles/admin.style";
import Icon from "react-native-vector-icons/Ionicons";
import AdminUserEachCard from '../admin/admin_users/admin_users.each_card';
import ContentAdminActionButtons from './view_content/admin_actions.main';
import AttachmentViewComponent from './view_content/attachment_view.main';
import { RefreshControl } from "react-native";

export default ViewContentMain = ({ local, downloading, handleDownload, loadHandler, views, hideLoading, handleHideUnhide, navigation, post, loading, openFull, setOpenFull, hasPrivilege })=>{


    return <View style={[adminStyle.main_container, contentStyle.create_content_container]}>
        <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={loadHandler} />}>
            {
                post ? 
                <>
                {
                    hasPrivilege ?
                    <ContentAdminActionButtons hideLoading={hideLoading} navigation={navigation} post={post} handleHideUnhide={handleHideUnhide} /> : null
                }
                <Text style={contentStyle.view_content_title}>{post.title}</Text>
                <AttachmentViewComponent path={post.attachment} ext={post.attachment_ext} openFull={openFull} setOpenFull={setOpenFull} />
                <Text style={contentStyle.description}>{post.desc}</Text>
                {
                    !local ? 
                    <View style={contentStyle.stat_section}>
                        <View style={contentStyle.stat_each_section}>
                            <Icon style={contentStyle.stat_icons} size={20} name="eye-outline" />
                            <Text style={contentStyle.description}>{views}</Text>
                        </View>
                        {
                            downloading ? <ActivityIndicator color="black" /> : 
                            <Pressable onPress={ ()=>{ handleDownload(); } }>
                                <View style={contentStyle.stat_each_section}>
                                    <Icon style={contentStyle.stat_icons} size={20} name="download-outline" />
                                    <Text style={contentStyle.description}>{post.downloaded}</Text>
                                </View>
                            </Pressable>
                        }
                        <View style={contentStyle.stat_each_section}>
                            <Icon style={contentStyle.stat_icons} size={20} name="share-outline" />
                        </View>
                    </View> : null
                }
                {
                    !local ?
                    <View>
                        <AdminUserEachCard
                            id={post.User.id}
                            image={require('../../../assets/static/user.png')}
                            name={post.User.fullname}
                            email={post.User.email}
                            date_joined={new Date(`${post.User.createdAt}`).toDateString()}
                            navigation={navigation}
                            link={screenNames.admin_dashboard_user_info}
                        />
                    </View> : null
                }
                </> : null
            }
        </ScrollView>
    </View>
}