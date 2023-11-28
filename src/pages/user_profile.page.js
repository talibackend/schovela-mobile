import UserProfileComponent from "../components/user_profile.component";
import { useState, useEffect } from "react";
import { getCount } from "../db/post";
import { useIsFocused } from '@react-navigation/native';

export default UserProfileScreen = ({ navigation })=>{
    const [downloadCount, setDownloadCount] = useState(null);
    
    const isFocused = useIsFocused();

    const loadInfo = async ()=>{
        let count = await getCount();

        setDownloadCount(count);
    }


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadInfo()
        });
    
        return () => {
          unsubscribe();
        };
      }, [isFocused]);


    return <UserProfileComponent downloadCount={downloadCount} navigation={navigation} />
}