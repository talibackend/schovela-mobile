import { View, Text, Pressable } from 'react-native';
import adminStyle from '../../styles/admin.style';

export default AdminEachMenuCardComponent = ({ name, counts, navigation, link }) => {
    return <Pressable onPress={() => { navigation.navigate(link) }}>
                <View style={adminStyle.each_dashboard_card}>
                    <View style={adminStyle.each_dashboard_card_name}>
                        <Text style={adminStyle.each_dashboard_card_name_text}>{name}</Text>
                    </View>
                    <View style={adminStyle.each_dashboard_card_count}>
                        <Text style={adminStyle.each_dashboard_card_count_text}>{counts}</Text>
                    </View>
                </View>
            </Pressable>;
}