import { View, ScrollView, TextInput } from "react-native";
import adminStyle from "../../styles/admin.style";
import loginStyle from "../../styles/login.style";
import AdminContentEachCard from "../admin/admin_contents/admin_contents.each_card";
import { attachment_exts } from "../../utils/consts";

export default DownloadsMainComponent = ({ navigation, posts, search, setSearch }) => {

    const data = posts.map((each) => {
        let image = '';
        if (attachment_exts.image.includes(each.attachment_ext)) {
            image = require('../../../assets/static/image.png');
        } else {
            if (attachment_exts.video.includes(each.attachment_ext)) {
                image = require('../../../assets/static/play.png');
            } else {
                image = require('../../../assets/static/file.png');
            }
        }
        return {
            id: each.id,
            title: each.title,
            poster: `${each.faculty ? each.faculty + " | " : "All Faculties | "} ${each.dept ? each.dept + " |" : ""} ${each.level ? each.level + "L" : "All Levels"}`,
            moment_posted: (new Date(`${each.createdAt}`)).toDateString(),
            image,
            live: true
        }
    });

    return <View style={[adminStyle.main_container, { marginBottom : 70 }]}>
        <View>
            <View style={adminStyle.filter_container}>
                <TextInput value={search} onChangeText={(e)=>{ setSearch(e); }} placeholderTextColor="grey" style={[loginStyle.input_field, adminStyle.search_input, adminStyle.download_search_input]} placeholder="Search" />
            </View>
            <ScrollView>
            {
                data.map((datum, index) => {
                    return <AdminContentEachCard
                        title={datum.title}
                        poster={datum.poster}
                        moment_posted={datum.moment_posted}
                        navigation={navigation}
                        image={datum.image}
                        id={datum.id}
                        key={`admin_each_content_${index}`}
                        live={datum.live}
                        local={true}
                    />
                })
            }
            </ScrollView>
        </View>
    </View>
}