import ViewContentComponent from '../components/view_content.component';
import { useState, useEffect } from 'react';
import { authRequest } from "../utils/network";
import { request_methods, api_routes, toast_types, user_roles, messages, storageKeyNames, screenNames } from "../utils/consts";
import { showToast } from "../utils/toast";
import { getItem } from '../utils/asyncStorage';
import { createPost, deletePost, getPostById } from '../db/post';
import { deleteLocalFile, downloadFile } from '../utils/general';

export default ViewContentScreen = ({ navigation, route })=>{
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hideLoading, setHideLoading] = useState(false);
    const [openFull, setOpenFull] = useState(false);
    const [hasPrivilege, setHasPrivilege] = useState(false);
    const [views, setViews] = useState(null);
    const { id } = route.params;
    const [downloading, setDownloading] = useState(false);


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
            setViews(request.views);
            let localUser = JSON.parse(await getItem(storageKeyNames.user));

            if(localUser.role === user_roles.admin){
                setHasPrivilege(true);
            }else{
                if(localUser.id === request.post.UserId){
                    setHasPrivilege(true);
                }
            }
        }catch(error){
            console.log(error);
            showToast(toast_types.error, messages.NETWORK_ERROR);
        }
        setLoading(false);
    }

    const handleHideUnhide = async ()=>{
        try{
            setHideLoading(true);
            let request = await authRequest(request_methods.POST, api_routes.hide_content, { id : post.id });
            if(typeof(request) == "string"){
                showToast(toast_types.error, request);
                setHideLoading(false);
                return;
            }
            setPost({...post, live : request.post.live });
        }catch(error){
            console.log(error);
            showToast(toast_types.error, messages.NETWORK_ERROR);
        }
        setHideLoading(false);
    }

    const downloadContentHandler = async ()=>{
        let searchPost = await getPostById(post.id);
        
        setDownloading(true);

        if(searchPost){
            try{
                await deleteLocalFile(searchPost.attachment)
                await deletePost(post.id);
            }catch(error){
                console.log(error);
            }
        }

        try{
            let localPath = await downloadFile(post.attachment);
            await createPost({
                id : post.id,
                title : post.title,
                desc : post.desc,
                attachment : localPath,
                attachment_ext : post.attachment_ext,
                level : post.level,
                faculty : post.faculty,
                dept : post.dept
            });
        }catch(error){
            console.log(error);
            showToast(toast_types.error, "Failed to download content, please try again.");
        }

        setDownloading(false);
        showToast(toast_types.success, "Post downloaded")


        return navigation.navigate(screenNames.downloads);
    }

    useEffect(()=>{
        loadInfos();
    }, []);

    return <ViewContentComponent 
        navigation={navigation} 
        post={post}
        views={views}
        loading={loading}
        openFull={openFull} 
        setOpenFull={setOpenFull} 
        hasPrivilege={hasPrivilege}
        handleHideUnhide={handleHideUnhide}
        hideLoading={hideLoading}
        loadHandler={loadInfos}
        downloading={downloading}
        handleDownload={downloadContentHandler}
    />
}