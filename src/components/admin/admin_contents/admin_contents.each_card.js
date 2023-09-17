import adminStyle from "../../../styles/admin.style";
import { Text, View, Image, Pressable } from 'react-native';

export default AdminContentEachCard = ({ id, title, poster, image, moment_posted, navigation})=>{
    return <Pressable onPress={() => { console.log(`${id} clicked...`); }}>
                <View style={[adminStyle.each_dashboard_card, adminStyle.each_user_card]}>
                    <View style={adminStyle.each_user_card_icon}>
                        <Image style={adminStyle.each_content_logo} source={image} />
                    </View>
                    <View style={adminStyle.each_user_list_info}>
                        <View><Text style={adminStyle.each_content_list_info_name}>{title}</Text></View>
                        <View><Text style={adminStyle.each_user_list_info_email}>{poster}</Text></View>
                        <View><Text style={adminStyle.each_user_list_info_joined_date}>Posted on {moment_posted}</Text></View>
                    </View>
                </View>
            </Pressable>
}