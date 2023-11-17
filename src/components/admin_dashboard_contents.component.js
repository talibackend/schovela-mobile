import AdminContentsMain from '../components/admin/admin_contents/admin_contents.main';
import appStyle from '../styles/app.style';
import AdminHeader from './admin/admin.header';
import { View } from 'react-native';

export default AdminContentsComponent = ({
        navigation, 
        posts, 
        loading, 
        title, 
        filterObject, 
        filterOpen, 
        handleScroll, 
        setFilterOpen,
        search,
        setSearch,
        allowBack,
        loadHandler
    })=>{
    return <View style={appStyle.app_container}>
        <AdminHeader navigation={navigation} backButton={allowBack !== undefined ? allowBack : true} name={title} />
        <AdminContentsMain 
            filterObject={filterObject}
            filterOpen={filterOpen}
            setFilterOpen={setFilterOpen} 
            loading={loading} 
            posts={posts} 
            navigation={navigation} 
            handleScroll={handleScroll}
            search={search}
            setSearch={setSearch}
            loadHandler={loadHandler}
        />
    </View>;
}