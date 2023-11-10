import { Keyboard, View, TextInput, ScrollView, Text, ActivityIndicator } from "react-native";
import adminStyle from "../../../styles/admin.style";
import loginStyle from "../../../styles/login.style";
import { DropDownComponent } from "../../dropdown.component";
import { attachment_exts, content_filters, messages } from "../../../utils/consts";
import { useState, useEffect } from "react";
import AdminContentEachCard from './admin_contents.each_card';
import AdminCreateContentButton from './admin_contents.create_button';

export default AdminContentsMainComponent = ({navigation, loading, posts})=>{
    const [filterOpen, setFilterOpen] = useState(false);
    const [status, setStatus] = useState(null);
    const [filterLabel, setFilterLabel] = useState("All");

    useEffect(()=>{
        for(let i = 0; i < content_filters.length; i++){
            if(content_filters[i].value == status){
                setFilterLabel( content_filters[i].label);
            }
        }
    }, [status])

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
        <DropDownComponent
            data={content_filters}
            opened={filterOpen}
            selected={status}
            selectHandler={setStatus}
            closeHandler={() => { setFilterOpen(false); }}
        />
        <TextInput placeholderTextColor="grey" style={[loginStyle.input_field, adminStyle.filter_input]} onFocus={() => { return Keyboard.dismiss(); }} value={filterLabel ? filterLabel : ""} placeholder={messages.FILTER_USERS} onPressIn={() => { return setFilterOpen(true); }} readonly={true} />
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