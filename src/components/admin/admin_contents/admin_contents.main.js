import { Text, View, TextInput, ScrollView } from "react-native";
import adminStyle from "../../../styles/admin.style";
import loginStyle from "../../../styles/login.style";
import { DropDownComponent } from "../../dropdown.component";
import { content_filters, messages } from "../../../utils/consts";
import { useState, useEffect } from "react";
import AdminContentEachCard from './admin_contents.each_card';
import AdminCreateContentButton from './admin_contents.create_button';

export default AdminContentsMainComponent = ({navigation})=>{
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

    const data = [
        {
            title : 'Math201 past question.',
            poster : 'Femi Fatokun',
            moment_posted : (new Date()).toDateString(),
            image : require('../../../../assets/static/image.png')
        },
        {
            title : 'Math201 past question.',
            poster : 'Femi Fatokun',
            moment_posted : (new Date()).toDateString(),
            image : require('../../../../assets/static/file.png')
        },
        {
            title : 'Math201 past question.',
            poster : 'Femi Fatokun',
            moment_posted : (new Date()).toDateString(),
            image : require('../../../../assets/static/file.png')
        },
        {
            title : 'Math201 past question.',
            poster : 'Femi Fatokun',
            moment_posted : (new Date()).toDateString(),
            image : require('../../../../assets/static/play.png')
        },
        {
            title : 'Math201 past question.',
            poster : 'Femi Fatokun',
            moment_posted : (new Date()).toDateString(),
            image : require('../../../../assets/static/file.png')
        },
        {
            title : 'Math201 past question.',
            poster : 'Femi Fatokun',
            moment_posted : (new Date()).toDateString(),
            image : require('../../../../assets/static/file.png')
        },
        {
            title : 'Math201 past question.',
            poster : 'Femi Fatokun',
            moment_posted : (new Date()).toDateString(),
            image : require('../../../../assets/static/image.png')
        },
        {
            title : 'Math201 past question.',
            poster : 'Femi Fatokun',
            moment_posted : (new Date()).toDateString(),
            image : require('../../../../assets/static/file.png')
        },
        {
            title : 'Math201 past question.',
            poster : 'Femi Fatokun',
            moment_posted : (new Date()).toDateString(),
            image : require('../../../../assets/static/play.png')
        },
        {
            title : 'Math201 past question.',
            poster : 'Femi Fatokun',
            moment_posted : (new Date()).toDateString(),
            image : require('../../../../assets/static/file.png')
        },
        {
            title : 'Math201 past question.',
            poster : 'Femi Fatokun',
            moment_posted : (new Date()).toDateString(),
            image : require('../../../../assets/static/image.png')
        },
    ]

    return <View style={adminStyle.main_container}>
        <DropDownComponent
            data={content_filters}
            opened={filterOpen}
            selected={status}
            selectHandler={setStatus}
            closeHandler={() => { setFilterOpen(false); }}
        />
        <TextInput style={[loginStyle.input_field, adminStyle.filter_input]} onFocus={() => { return Keyboard.dismiss(); }} value={filterLabel ? filterLabel : ""} placeholder={messages.FILTER_USERS} onPressIn={() => { return setFilterOpen(true); }} readonly={true} />
        <ScrollView>
            {
                data.map((datum, index)=>{
                    return <AdminContentEachCard 
                                title={datum.title}
                                poster={datum.poster}
                                moment_posted={datum.moment_posted}
                                navigation={navigation}
                                image={datum.image}
                                id={index + 1}
                                key={`admin_each_content_${index}`}
                            />
                })
            }
        </ScrollView>
        <AdminCreateContentButton navigation={navigation} />
    </View>
}