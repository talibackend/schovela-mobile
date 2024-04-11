import appStyle from "../styles/app.style"
import AdminHeader from "./admin/admin.header"
import CreateContentMain from './content/create_content.main';
import { View } from "react-native"

export default CreateContentComponent = ({
    navigation,
    schools,
    title,
    setTitle,
    desc,
    setDesc,
    level,
    setLevel,
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
    facultyOpen,
    deptOpen,
    handleSubmit,
    attachment,
    attachmentExt,
    pageName,
    attachmentText,
    schoolOpen, setSchoolOpen,
    schoolValue, setSchoolValue,
    schoolLabel,
    facultyValue, setFacultyValue
}) => {
    return <View style={appStyle.app_container}>
        <AdminHeader navigation={navigation} backButton={true} name={pageName ? pageName : "Create Content"} />
        <CreateContentMain
            navigation={navigation}
            title={title}
            setTitle={setTitle}
            desc={desc}
            setDesc={setDesc}
            level={level}
            setLevel={setLevel}
            setAttachment={setAttachment}
            attachmentBase64={attachmentBase64} 
            edit={false}
            loading={loading}
            dept={dept}
            setDept={setDept}
            deptLabel={deptLabel}
            facultyLabel={facultyLabel}
            levelLabel={levelLabel}
            setLevelOpen={setLevelOpen}
            setFacultyOpen={setFacultyOpen}
            setDeptOpen={setDeptOpen}
            levelOpen={levelOpen}
            facultyOpen={facultyOpen}
            deptOpen={deptOpen}
            handleSubmit={handleSubmit}
            attachment={attachment}
            attachmentExt={attachmentExt}
            pageName={pageName}
            attachmentText={attachmentText}
            schoolOpen={schoolOpen}
            setSchoolOpen={setSchoolOpen}
            schoolValue={schoolValue}
            setSchoolValue={setSchoolValue}
            schoolLabel={schoolLabel}
            schools={schools}
            facultyValue={facultyValue}
            setFacultyValue={setFacultyValue}
        />
    </View>
}