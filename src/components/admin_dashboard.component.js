import { View } from "react-native";
import appStyle from "../styles/app.style";
import AdminHeaderComponent from '../components/admin/admin.header';
import AdminMainComponent from '../components/admin/admin.main';

export default AdminDashboardComponent = ({loadHandler, loading, navigation, userCount, contentCount})=>{
    return <View style={[appStyle.app_container]}>
        <AdminHeaderComponent navigation={navigation} name="Dashboard" />
        <AdminMainComponent loadHandler={loadHandler} loading={loading} userCount={userCount} contentCount={contentCount} navigation={navigation} />
    </View>
}