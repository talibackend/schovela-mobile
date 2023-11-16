import { Keyboard, View, TextInput, ScrollView, Text, ActivityIndicator } from "react-native";
import adminStyle from "../../../styles/admin.style";
import loginStyle from "../../../styles/login.style";
import { DropDownComponent } from "../../dropdown.component";
import { attachment_exts, content_filters, messages } from "../../../utils/consts";
import { useState, useEffect } from "react";
import AdminContentEachCard from './admin_contents.each_card';
import AdminCreateContentButton from './admin_contents.create_button';
import Icon from "react-native-vector-icons/Ionicons";

export default AdminContentsMainComponent = ({navigation, loading, posts, filterObject, filterOpen, setFilterOpen})=>{
    const [status, setStatus] = useState(null);

    const data = posts.map((each)=>{
        let image = '';
        if(attachment_exts.image.includes(each.attachment_ext)){
            image = require('../../../../assets/static/image.png');
        }else{
            if(attachment_exts.video.includes(each.attachment_ext)){
                image = require('../../../../assets/static/play.png');
            }else{
                image = require('../../../../assets/static/file.png');
            }
        }
        return {
            id : each.id,
            title : each.title,
            poster : `${each.faculty}, ${each.dept}, ${each.level}L`,
            moment_posted : (new Date(`${each.createdAt}`)).toDateString(),
            image
        }
    });

    return <View style={adminStyle.main_container}>
        <View style={adminStyle.filter_container}>
            <TextInput placeholderTextColor="grey" style={[loginStyle.input_field, adminStyle.search_input]} placeholder="Search" />
            <TextInput onPressIn={()=>{ setFilterOpen(true); }} placeholderTextColor="grey" style={[loginStyle.input_field, adminStyle.search_filter]} readOnly={true} onFocus={()=>{ Keyboard.dismiss(); }}>
                <Icon style={adminStyle.create_content_floating_icon} size={100} name="filter" />
            </TextInput>
        </View>
        <ScrollView>
            {
                loading ? <View style={{ paddingTop: 20 }}>
                    <ActivityIndicator color='black' />
                </View> : null
            }
            {
                data.length == 0 && !loading ? <View style={{ paddingTop: 20 }}>
                    <Text style={{ textAlign : 'center' }}>{messages.NO_RECORDS}</Text>
                </View> : null
            }
            {
                data.map((datum, index)=>{
                    return <AdminContentEachCard 
                                title={datum.title}
                                poster={datum.poster}
                                moment_posted={datum.moment_posted}
                                navigation={navigation}
                                image={datum.image}
                                id={datum.id}
                                key={`admin_each_content_${index}`}
                            />
                })
            }
        </ScrollView>
        <AdminCreateContentButton navigation={navigation} />
    </View>
}