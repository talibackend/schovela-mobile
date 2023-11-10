import ViewContentComponent from '../components/view_content.component';
import { useState, useEffect } from 'react';
import { authRequest } from "../utils/network";
import { request_methods, api_routes, toast_types } from "../utils/consts";
import { showToast } from "../utils/toast";

export default ViewContentScreen = ({ navigation, route })=>{
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = route.params;


    const loadInfos = async ()=>{
        try{
            setLoading(true);
            let request = await authRequest(request_methods.GET, `${api_routes.create_content}/${id}`);
            if(typeof(request) == "string"){
                showToast(toast_types.error, request);
                setLoading(false);
                return;
            }
            setPost({...request.post});
        }catch(error){
            console.log(error);
            showToast(toast_types.error, messages.NETWORK_ERROR);
        }
        setLoading(false);
    }

    useEffect(()=>{
        loadInfos();
    }, []);

    return <ViewContentComponent 
        navigation={navigation} 
        post={post}
        loading={loading}
    />
}