import { Pressable, View, Text } from "react-native";
import adminStyle from "../../styles/admin.style";
import AdminEachMenuCardComponent from '../admin/admin.each_menu_card';
import Icon from "react-native-vector-icons/Ionicons";
import { deleteItem } from '../../utils/asyncStorage';
import { screenNames, storageKeyNames } from "../../utils/consts";

export default UserProfileMainComponent = ({ navigation }) =>{
    return <View style={adminStyle.main_container}>
        <AdminEachMenuCardComponent name="Downloads" link={screenNames.downloads} counts={0} navigation={navigation} />
        <Pressable onPress={async ()=>{
            await deleteItem(storageKeyNames.accessToken);
            await deleteItem(storageKeyNames.refreshToken);
            await deleteItem(storageKeyNames.user);
            navigation.navigate(screenNames.login);
        }}>
            <View style={[adminStyle.each_dashboard_card, { backgroundColor : 'red' }]}>
                <View style={adminStyle.each_dashboard_card_name}>
                    <Text style={adminStyle.each_dashboard_card_name_text}>Logout</Text>
                </View>
                <View style={adminStyle.each_dashboard_card_count}>
                <Icon size={400} style={[adminStyle.header_back_icon, adminStyle.each_dashboard_card_count_text, adminStyle.logout_button]} name="log-out-outline" />
                </View>
            </View>
        </Pressable>
    </View>
}