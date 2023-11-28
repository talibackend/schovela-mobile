import UserProfileComponent from "../components/user_profile.component";
import { useState, useEffect } from "react";
import { getCount } from "../db/post";

export default UserProfileScreen = ({ navigation })=>{
    const [downloadCount, setDownloadCount] = useState(null);

    const loadInfo = async ()=>{
        let count = await getCount();

        setDownloadCount(count);
    }

    useEffect(()=>{
        loadInfo();
    }, []);

    return <UserProfileComponent downloadCount={downloadCount} navigation={navigation} />
}