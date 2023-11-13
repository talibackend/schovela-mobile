import { View, Text } from 'react-native';
import appStyle from '../styles/app.style';
import AdminHeader from './admin/admin.header';
import AdminUserInfoMain from './admin/admin_user_info/admin_user_info.main';

export default AdminDashboardUserInfoComponent = ({user, updatingRole, handleRoleChange, navigation, hasPrivilege})=>{
    return <View style={appStyle.app_container}>
        <AdminHeader navigation={navigation} backButton={true} name={user?.fullname} />
        <AdminUserInfoMain hasPrivilege={hasPrivilege} user={user} updatingRole={updatingRole} handleRoleChange={handleRoleChange} navigation={navigation} />
    </View>;
}