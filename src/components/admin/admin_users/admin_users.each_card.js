import adminStyle from "../../../styles/admin.style";
import { Text, View, Image, Pressable } from 'react-native';

export default AdminUserEachCard = ({ id, image, name, email, date_joined, link, navigation})=>{
    return <Pressable onPress={() => { navigation.navigate(link, { id }); }}>
                <View style={[adminStyle.each_dashboard_card, adminStyle.each_user_card]}>
                    <View style={adminStyle.each_user_card_icon}>
                        <Image style={adminStyle.each_user_logo} source={image} />
                    </View>
                    <View style={adminStyle.each_user_list_info}>
                        <View><Text style={adminStyle.each_user_list_info_name}>{name}</Text></View>
                        <View><Text style={adminStyle.each_user_list_info_email}>{email}</Text></View>
                        <View><Text style={adminStyle.each_user_list_info_joined_date}>Joined on {date_joined}</Text></View>
                    </View>
                </View>
            </Pressable>
}