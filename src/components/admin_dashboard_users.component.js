import { View } from "react-native";
import appStyle from "../styles/app.style";
import AdminHeaderComponent from '../components/admin/admin.header';
import AdminUsersMainComponent from '../components/admin/admin_users/admin_users.main';

export default AdminDashboardUsersComponent = ({navigation, loading, handleScroll, filterLabel, role, setRole, users})=>{
    return <View style={[appStyle.app_container]}>
        <AdminHeaderComponent navigation={navigation} name="Users" backButton={true} />
        <AdminUsersMainComponent loading={loading} handleScroll={handleScroll} filterLabel={filterLabel} role={role} setRole={setRole} users={users} navigation={navigation} />
    </View>
}