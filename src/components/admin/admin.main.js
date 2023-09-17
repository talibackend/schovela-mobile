import { ScrollView, View } from 'react-native';
import adminStyle from '../../styles/admin.style';
import { screenNames } from '../../utils/consts';
import AdminEachMenuCardComponent from './admin.each_menu_card';

export default AdminMainComponent = ({ navigation, contentCount, userCount }) => {
    const buttonData = [
        { name : 'Users', counts : userCount, link : screenNames.admin_dashboard_users },
        { name : 'Contents', counts : contentCount, link : screenNames.admin_dashboard_contents }
    ]

    return <View style={adminStyle.main_container}>
                <ScrollView>
                    { buttonData.map((each, index)=>{ return <AdminEachMenuCardComponent key={`menu-${index}`} name={each.name} counts={each.counts} link={each.link} navigation={navigation} /> }) }
                </ScrollView>
            </View>
}