import { Text, View, TextInput } from "react-native";
import adminStyle from "../../../styles/admin.style";
import loginStyle from "../../../styles/login.style";
import { DropDownComponent } from "../../dropdown.component";
import { content_filters, messages } from "../../../utils/consts";
import { useState, useEffect } from "react";

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
        // setRetryCount(1);
    }, [status])


    return <View style={adminStyle.main_container}>
        <DropDownComponent
            data={content_filters}
            opened={filterOpen}
            selected={status}
            selectHandler={setStatus}
            closeHandler={() => { setFilterOpen(false); }}
        />
        <TextInput style={[loginStyle.input_field, adminStyle.filter_input]} onFocus={() => { return Keyboard.dismiss(); }} value={filterLabel ? filterLabel : ""} placeholder={messages.FILTER_USERS} onPressIn={() => { return setFilterOpen(true); }} readonly={true} />
    </View>
}