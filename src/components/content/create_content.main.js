import { Pressable, ScrollView, TextInput, View, Image, Text, Keyboard } from "react-native"
import { messages, user_levels, user_faculties, user_depts, attachment_exts } from "../../utils/consts"
import LoginButton from "../login/login.button"
import adminStyle from "../../styles/admin.style"
import contentStyle from "../../styles/content.style"
import loginStyle from "../../styles/login.style"
import { DropDownComponent } from "../dropdown.component";
import DocumentPicker from 'react-native-document-picker';
import { useEffect, useState } from "react"
import { generateVideoPath } from "../../utils/general";
import Video from 'react-native-video';

export default CreateContentMain = ({
    navigation,
    edit,
    data,
    title,
    setTitle,
    desc,
    setDesc,
    level,
    setLevel,
    faculty,
    setFaculty,
    setAttachment,
    attachmentBase64,
    loading,
    dept,
    setDept,
    deptLabel,
    facultyLabel,
    levelLabel,
    setLevelOpen,
    setFacultyOpen,
    setDeptOpen,
    levelOpen,
    deptOpen,
    facultyOpen,
    handleSubmit,
    attachment,
    attachmentExt
}) => {
    const [videoPath, setVideoPath] = useState(null);
    const selectAttachment = async () => {
        try {
            let result = await DocumentPicker.pickSingle();
            setAttachment(result);
        } catch (error) {
            console.log(error);
        }
    }

    return <View style={[adminStyle.main_container, contentStyle.create_content_container]}>
        <ScrollView>
            <TextInput value={title} onChangeText={(e)=>{ return setTitle(e) }} style={contentStyle.create_content_title_input} placeholderTextColor="grey" placeholder={messages.TITLE_PLACEHOLDER} autoCorrect={true} />
            <TextInput
                style={[contentStyle.create_content_title_input, contentStyle.create_content_desc_input]}
                placeholder={messages.DESC_PLACEHOLDER}
                autoCorrect={true}
                placeholderTextColor="grey"
                multiline={true}
                value={desc}
                onChangeText={(e)=>{ return setDesc(e); }}
            />
            <DropDownComponent
                data={user_levels}
                opened={levelOpen}
                selected={level}
                selectHandler={setLevel}
                closeHandler={() => { setLevelOpen(false); }}
            />
            <DropDownComponent
                data={user_faculties}
                opened={facultyOpen}
                selected={faculty}
                selectHandler={setFaculty}
                closeHandler={() => { setFacultyOpen(false); }}
            />
            <DropDownComponent
                data={user_depts}
                opened={deptOpen}
                selected={dept}
                selectHandler={setDept}
                closeHandler={() => { setDeptOpen(false); }}
            />
            <TextInput placeholderTextColor="grey" style={[loginStyle.input_field, adminStyle.filter_input]} onFocus={() => { return Keyboard.dismiss(); }} value={levelLabel ? levelLabel : ""} placeholder={messages.SELECT_LEVEL} onPressIn={() => { return setLevelOpen(true); }} readonly={true} />
            <TextInput placeholderTextColor="grey" style={[loginStyle.input_field, adminStyle.filter_input]} onFocus={() => { return Keyboard.dismiss(); }} value={facultyLabel ? facultyLabel : ""} placeholder={messages.SELECT_FACULTY} onPressIn={() => { return setFacultyOpen(true); }} readonly={true} />
            <TextInput placeholderTextColor="grey" style={[loginStyle.input_field, adminStyle.filter_input]} onFocus={() => { return Keyboard.dismiss(); }} value={deptLabel ? deptLabel : ""} placeholder={messages.SELECT_DEPT} onPressIn={() => { return setDeptOpen(true); }} readonly={true} />
            <View style={contentStyle.create_content_upload_section}>
                <Pressable onPress={() => { return selectAttachment(); }}>
                    <Text style={contentStyle.description}>Click to Upload Attachment</Text>
                </Pressable>
            </View>
            {
                attachmentBase64 !== "" ?
                    <View style={contentStyle.create_content_upload_section}>
                        {
                            attachment_exts.image.includes(attachmentExt) ?
                            <Image style={{ height: 200, width: 200 }} source={{ uri: `data:${attachment.type};base64,${attachmentBase64}` }} /> : 
                            <View>
                                <Text style={contentStyle.description}>Attachment Preview Not Available</Text>
                                <Text style={contentStyle.description}>File Name : {attachment.name}</Text>
                                <Text style={contentStyle.description}>Type : {attachment.type.split('/')[0] == "application" ? "document" : attachment.type.split('/')[0]}</Text>
                                <Text style={contentStyle.description}>Size : {attachment.size}</Text>
                            </View>
                        }
                    </View>
                    : null
            }
            <LoginButton name="Create" loading={loading} action={() => { handleSubmit(); }} />
        </ScrollView>
    </View>;
}