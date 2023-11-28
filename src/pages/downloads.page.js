import DownloadsComponent from "../components/downloads.component";
import { useState, useEffect } from "react";
import { showToast } from "../utils/toast";
import { toast_types } from "../utils/consts";
import { getAllPosts } from "../db/post";

export default DownloadScreen = ({ navigation })=>{
    const [posts, setPosts] = useState([]);

    const loadInfos = async ()=>{
        try{
            setPosts(await getAllPosts());
        }catch(error){
            console.log(error);
            showToast(toast_types.error, "Failed to load downloaded posts");
        }
    }

    useEffect(()=>{ loadInfos(); }, []);

    return <DownloadsComponent navigation={navigation} posts={posts} />;
}