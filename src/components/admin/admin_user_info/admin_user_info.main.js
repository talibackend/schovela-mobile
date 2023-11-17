import { Pressable, ScrollView, Text, View, Image, ActivityIndicator } from 'react-native';
import adminStyle from '../../../styles/admin.style';
import { user_roles } from '../../../utils/consts';
import { getUser } from '../../../utils/asyncStorage';
import { RefreshControl } from 'react-native';

export default AdminUserInfoMainComponent = ({updatingRole, handleRoleChange, user, loadHandler, loading, hasPrivilege})=>{
    const data = {
        name : user?.fullname,
        email : user?.email,
        phone : user?.phone,
        level : user?.level,
        faculty : user?.faculty,
        dept : user?.department,
        image : require('../../../../assets/static/user.png'),
        joined:  (new Date(`${user?.createdAt}`)).toDateString(),
        role : user?.role
    }
    
    const currentUser = getUser();
    console.log(currentUser);

    return <View style={adminStyle.main_container}>
        <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={loadHandler} />}>
            <View style={adminStyle.elevate_btn_container}>
            {
                data.role && data.role !== user_roles.admin && hasPrivilege ?
                <Pressable style={adminStyle.elevate_btn} onPress={()=>{ handleRoleChange(); }}>
                    {
                        updatingRole ? <ActivityIndicator color='white' /> :
                        <Text style={adminStyle.elevate_btn_txt}>
                            { data.role == user_roles.user ? 'Promote' : 'Demote' }
                        </Text>
                    }
                </Pressable>
                 : null
            }
            </View>
            <View style={adminStyle.user_image_container}>
                <Image style={adminStyle.user_image} source={data.image} />
            </View>
            <View style={adminStyle.user_info_columns}>
                <Text style={adminStyle.user_info_title}>Name</Text>
                <Text style={adminStyle.user_info_value}>{data.name}</Text>
            </View>
            <View style={adminStyle.user_info_columns}>
                <Text style={adminStyle.user_info_title}>E-mail</Text>
                <Text style={adminStyle.user_info_value}>{data.email}</Text>
            </View>
            <View style={adminStyle.user_info_columns}>
                <Text style={adminStyle.user_info_title}>Phone</Text>
                <Text style={adminStyle.user_info_value}>{data.phone}</Text>
            </View>
            <View style={adminStyle.user_info_columns}>
                <Text style={adminStyle.user_info_title}>Level</Text>
                <Text style={adminStyle.user_info_value}>{data.level}</Text>
            </View>
            <View style={adminStyle.user_info_columns}>
                <Text style={adminStyle.user_info_title}>Faculty</Text>
                <Text style={adminStyle.user_info_value}>{data.faculty}</Text>
            </View>
            <View style={adminStyle.user_info_columns}>
                <Text style={adminStyle.user_info_title}>Department</Text>
                <Text style={adminStyle.user_info_value}>{data.dept}</Text>
            </View>
            <View style={adminStyle.user_info_columns}>
                <Text style={adminStyle.user_info_title}>Joined on</Text>
                <Text style={adminStyle.user_info_value}>{data.joined}</Text>
            </View>
        </ScrollView>
    </View>
}