import DownloadsComponent from "../components/downloads.component";
import { useState, useEffect } from "react";
import { showToast } from "../utils/toast";
import { toast_types } from "../utils/consts";
import { getAllPosts } from "../db/post";
import { useIsFocused } from '@react-navigation/native';

export default DownloadScreen = ({ navigation })=>{
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    
    const isFocused = useIsFocused();

    const loadInfos = async (search)=>{
        try{
            setPosts(await getAllPosts(search));
        }catch(error){
            console.log(error);
            showToast(toast_types.error, "Failed to load downloaded posts");
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadInfos(search)
        });
    
        return () => {
          unsubscribe();
        };
      }, [isFocused]);

    useEffect(()=>{
        loadInfos(search);
    }, [search]);

    return <DownloadsComponent navigation={navigation} posts={posts} search={search} setSearch={setSearch} />;
}