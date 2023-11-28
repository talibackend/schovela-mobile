import appStyle from "../styles/app.style"
import AdminHeader from "./admin/admin.header"
import { View } from "react-native"
import DownloadsMain from "./downloads/downloads.main";

export default DownloadComponent = ({ navigation, posts, search, setSearch })=>{
    return <View style={appStyle.app_container}>
        <AdminHeader navigation={navigation} backButton={true} name="Downloads" />
        <DownloadsMain navigation={navigation} posts={posts} search={search} setSearch={setSearch} />
    </View>
}