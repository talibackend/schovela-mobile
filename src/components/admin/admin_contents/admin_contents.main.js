import { Keyboard, View, TextInput, ScrollView, Text, ActivityIndicator, Pressable } from "react-native";
import adminStyle from "../../../styles/admin.style";
import loginStyle from "../../../styles/login.style";
import { MultiDropDownComponent } from "../../dropdown_multiple.component";
import { attachment_exts, messages } from "../../../utils/consts";
import AdminContentEachCard from './admin_contents.each_card';
import AdminCreateContentButton from './admin_contents.create_button';
import Icon from "react-native-vector-icons/Ionicons";

export default AdminContentsMainComponent = ({navigation, loading, posts, filterObject, filterOpen, handleScroll, setFilterOpen})=>{

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
        <View>
            <View style={adminStyle.filter_container}>
                <TextInput placeholderTextColor="grey" style={[loginStyle.input_field, adminStyle.search_input]} placeholder="Search" />
                <Pressable onPress={()=>{ return setFilterOpen(true); }} placeholderTextColor="grey" style={[loginStyle.input_field, adminStyle.search_filter]}>
                    <Icon style={adminStyle.create_content_floating_icon} size={100} name="filter" />
                </Pressable>
            </View>
            {
                filterObject.level.selectedLabel || filterObject.faculty.selectedLabel || filterObject.depts.selectedLabel ?
                    <View style={adminStyle.filter_values_container}>
                        {
                            filterObject.level.selectedLabel ? 
                                <Text style={adminStyle.filter_value_text}>{filterObject.level.selectedLabel}</Text>
                            : null
                        }
                        {
                            filterObject.faculty.selectedLabel ? 
                                <Text style={adminStyle.filter_value_text}>{filterObject.faculty.selectedLabel}</Text>
                            : null
                        }
                        {
                            filterObject.depts.selectedLabel ? 
                                <Text style={adminStyle.filter_value_text}>{filterObject.depts.selectedLabel}</Text>
                            : null
                        }
                    </View>
                : null
            }
        </View>
        <MultiDropDownComponent 
            data={filterObject}
            opened={filterOpen}
            closeHandler={()=>{ setFilterOpen(false) }}
        />
        <ScrollView scrollEventThrottle={100} onScroll={({ nativeEvent }) => { handleScroll(nativeEvent); }}>
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