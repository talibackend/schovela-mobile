import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import adminStyle from '../../../styles/admin.style';
import contentStyle from '../../../styles/content.style';
import { screenNames } from '../../../utils/consts';

export default ContentAdminActionButtons = ({ post, navigation, handleHideUnhide, hideLoading }) => {
    return <View style={[adminStyle.elevate_btn_container, contentStyle.admin_actions_container]}>
        <Pressable onPress={() => { navigation.navigate(screenNames.edit_content, { id: post.id }) }} style={adminStyle.elevate_btn}><Text style={adminStyle.elevate_btn_txt}>Edit</Text></Pressable>
        <Pressable style={adminStyle.elevate_btn} onPress={() => { return handleHideUnhide(); }} ><Text style={adminStyle.elevate_btn_txt}>
            {hideLoading ? <ActivityIndicator /> : <>
                {post.live ? "Hide" : "Unhide"}
            </>}
        </Text></Pressable>
    </View>;
}