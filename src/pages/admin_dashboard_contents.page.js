import AdminContentsComponent from "../components/admin_dashboard_contents.component";
import { useState, useEffect } from 'react';
import { authRequest } from "../utils/network";
import { request_methods, api_routes, toast_types } from "../utils/consts";
import { showToast } from "../utils/toast";

export default AdminDashboardContentsScreen = ({navigation, title})=>{
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadInfos = async ()=>{
        try{
            setLoading(true);
            let request = await authRequest(request_methods.GET, api_routes.create_content);
            if(typeof(request) == "string"){
                showToast(toast_types.error, request);
                setLoading(false);
                return;
            }
            setPosts([...request.post]);
        }catch(error){
            console.log(error);
            showToast(toast_types.error, messages.NETWORK_ERROR);
        }
        setLoading(false);
    }

    useEffect(()=>{
        loadInfos();
    }, []);

    return <AdminContentsComponent 
        navigation={navigation} 
        posts={posts}
        loading={loading}
        title={title ? title : "Content"}
    />
}