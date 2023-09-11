import { Pressable, ScrollView, Text, View, Image } from 'react-native';
import adminStyle from '../../../styles/admin.style';

export default AdminUserInfoMainComponent = ({navigation})=>{
    const data = {
        name : 'Femi Fatokun',
        email : 'fatokunfemi03@gmail.com',
        phone : '+2349047238648',
        level : '200',
        faculty : 'Science',
        dept : 'Computer Science',
        image : require('../../../../assets/static/user.png'),
        dob : '27-02-2002'
    }
    return <View style={adminStyle.main_container}>
        <ScrollView>
            <View style={adminStyle.elevate_btn_container}>
                <Pressable style={adminStyle.elevate_btn} onPress={()=>{ console.log('User Elevated'); }}><Text style={adminStyle.elevate_btn_txt}>Elevate</Text></Pressable>
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
                <Text style={adminStyle.user_info_title}>Date of Birth</Text>
                <Text style={adminStyle.user_info_value}>{data.dob}</Text>
            </View>
        </ScrollView>
    </View>
}