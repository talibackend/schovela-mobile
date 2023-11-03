import { View, Text, Pressable } from 'react-native';
import adminStyle from '../../../styles/admin.style';
import contentStyle from '../../../styles/content.style';

export default ContentAdminActionButtons = ({ id })=>{
    return <View style={[adminStyle.elevate_btn_container, contentStyle.admin_actions_container]}>
                <Pressable style={adminStyle.elevate_btn}><Text style={adminStyle.elevate_btn_txt}>Edit</Text></Pressable>
                <Pressable style={adminStyle.elevate_btn}><Text style={adminStyle.elevate_btn_txt}>Hide</Text></Pressable>
            </View>;
}