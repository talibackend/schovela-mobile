import { Pressable, ScrollView, TextInput, View, Image, Keyboard } from "react-native"
import { messages, user_levels, user_faculties } from "../../../utils/consts"
import LoginButton from "../../login/login.button"
import adminStyle from "../../../styles/admin.style"
import contentStyle from "../../../styles/content.style"
import loginStyle from "../../../styles/login.style"
import { DropDownComponent } from "../../dropdown.component"
import { useState, useEffect } from "react"

export default CreateContentMain = ({navigation})=>{
    const [levelOpen, setLevelOpen] = useState(false);
    const [level, setLevel] = useState(null);
    const [levelLabel, setLevelLabel] = useState("");

    const [facultyOpen, setFacultyOpen] = useState(false);
    const [faculty, setFaculty] = useState(null);
    const [facultyLabel, setFacultyLabel] = useState("");


    useEffect(()=>{
        for(let i = 0; i < user_levels.length; i++){
            if(user_levels[i].value == level){
                setLevelLabel( user_levels[i].label);
            }
        }
    }, [level])


    useEffect(()=>{
        for(let i = 0; i < user_faculties.length; i++){
            if(user_faculties[i].value == faculty){
                setFacultyLabel( user_faculties[i].label);
            }
        }
    }, [faculty])



    return <View style={[adminStyle.main_container, contentStyle.create_content_container]}>
                <ScrollView>
                    <TextInput style={contentStyle.create_content_title_input} placeholderTextColor="grey" placeholder={messages.TITLE_PLACEHOLDER} autoCorrect={true} />
                    <TextInput 
                        style={[contentStyle.create_content_title_input, contentStyle.create_content_desc_input]}
                        placeholder={messages.DESC_PLACEHOLDER}
                        autoCorrect={true}
                        placeholderTextColor="grey"
                        multiline={true}
                    />
                    <DropDownComponent 
                        data={user_levels}
                        opened={levelOpen}
                        selected={level}
                        selectHandler={setLevel}
                        closeHandler={()=>{ setLevelOpen(false); }}
                    />
                    <DropDownComponent 
                        data={user_faculties}
                        opened={facultyOpen}
                        selected={faculty}
                        selectHandler={setFaculty}
                        closeHandler={()=>{ setFacultyOpen(false); }}
                    />
                    <TextInput placeholderTextColor="grey" style={[loginStyle.input_field, adminStyle.filter_input]} onFocus={() => { return Keyboard.dismiss(); }} value={levelLabel ? levelLabel : ""} placeholder={messages.SELECT_LEVEL} onPressIn={() => { return setLevelOpen(true); }} readonly={true} />
                    <TextInput placeholderTextColor="grey" style={[loginStyle.input_field, adminStyle.filter_input]} onFocus={() => { return Keyboard.dismiss(); }} value={facultyLabel ? facultyLabel : ""} placeholder={messages.SELECT_FACULTY} onPressIn={() => { return setFacultyOpen(true); }} readonly={true} />
                    <View style={contentStyle.create_content_upload_section}>
                        <Pressable><Image style={contentStyle.each_file_picker_icon} source={require('../../../../assets/static/image.png')} /></Pressable>
                        <Pressable><Image style={contentStyle.each_file_picker_icon} source={require('../../../../assets/static/play.png')} /></Pressable>
                        <Pressable><Image style={contentStyle.each_file_picker_icon} source={require('../../../../assets/static/file.png')} /></Pressable>
                        <Pressable><Image style={contentStyle.each_file_picker_icon} source={require('../../../../assets/static/image.png')} /></Pressable>
                    </View>
                    <LoginButton name="Create" action={()=>{ console.log("Wanna create"); }} />
                </ScrollView>
            </View>;
}