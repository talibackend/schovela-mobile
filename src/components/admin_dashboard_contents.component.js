import AdminContentsMain from '../components/admin/admin_contents/admin_contents.main';
import appStyle from '../styles/app.style';
import AdminHeader from './admin/admin.header';
import { View } from 'react-native';

export default AdminContentsComponent = ({navigation, posts, loading})=>{
    return <View style={appStyle.app_container}>
        <AdminHeader navigation={navigation} backButton={true} name='Home' />
        <AdminContentsMain loading={loading} posts={posts} navigation={navigation} />
    </View>;
}