import CreateContentComponent from '../components/create_content.component';
import { useEffect, useState } from 'react';
import { 
    user_levels, 
    messages, 
    getAllExtensions, 
    api_routes, 
    toast_types, 
    screenNames,
    request_methods,
    attachment_exts,
    user_schools,
    user_faculties,
    user_depts
} from '../utils/consts';
import { fileToBase64 } from '../utils/general';
import { showToast } from '../utils/toast';
import { authRequest } from '../utils/network';
import { uploadBase64 } from '../utils/storage';

export default CreateContentScreen = ({navigation})=>{
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [attachmentBase64, setAttachmentBase64] = useState("");
    const [attachmentExt, setAttachmentExt] = useState(null);
    const [loading, setLoading] = useState(false);

    const [levelOpen, setLevelOpen] = useState(false);
    const [level, setLevel] = useState(null);
    const [levelLabel, setLevelLabel] = useState("");
    
    //School States
    const [schoolOpen, setSchoolOpen] = useState(false);
    const [schoolValue, setSchoolValue] = useState(null);
    const [schoolLabel, setSchoolLabel] = useState(null);
    const schools = user_schools;
    //Faculty States
    const [facultyOpen, setFacultyOpen] = useState(false);
    const [facultyValue, setFacultyValue] = useState(null);
    const [facultyLabel, setFacultyLabel] = useState(null);
    const faculties = user_faculties(schoolValue);
    //Dept States
    const [deptOpen, setDeptOpen] = useState(false);
    const [dept, setDept] = useState(null);
    const [deptLabel, setDeptLabel] = useState("");
    const depts = user_depts(schoolValue, facultyValue)

    const [attachmentUrl, setAttachmentUrl] = useState("");

    const [attachmentText, setAttachmentText] = useState("Click to Upload Attachment");
    const [currentUploaded, setCurrentUploaded] = useState(null);

    const handleUpload = async ()=>{
        try{
            setLoading(true);
            let uploadedPath = await uploadBase64(attachmentBase64, attachmentExt, setCurrentUploaded);
            setAttachmentUrl(uploadedPath);
            setAttachmentText("Click to change attachment")
            setLoading(false);
            setCurrentUploaded(null);
        }catch(error){
            console.log(error);
            showToast(toast_types.error, "Failed to upload attachment", 3);
        }
    }

    useEffect(()=>{ 
        if(currentUploaded !== null){
            let newCurrentUploaded = Math.floor(currentUploaded)
            setCurrentUploaded(newCurrentUploaded);
            setAttachmentText(`Uploading attachment, ${currentUploaded}% completed.`);
        }
     }, [currentUploaded]);

    const handleSubmit = async ()=>{
        if(!title || !desc || !attachmentBase64){
            return showToast(toast_types.error, "Only level, faculty and department are allowed to be optional.");
        }

        const payload = { title, desc, attachment : attachmentUrl, attachment_ext : attachmentExt };

        if(level){
            payload.level = level;
        }

        if(faculty){
            payload.faculty = faculty;
        }

        if(dept){
            payload.dept = dept;
        }
        if(schoolValue){
            payload.school = schoolValue;
        }

        try{
            setLoading(true);
            let request = await authRequest(request_methods.POST, api_routes.create_content, payload);
            if(typeof(request) == "string"){
                showToast(toast_types.error, request);
                setLoading(false);
                return;
            }
            showToast(toast_types.success, messages.CONTENT_CREATED, 3);
            navigation.navigate(screenNames.view_content, { id : request.post.id });
            setTitle("");
            setDesc("");
            setAttachmentBase64("");
            setAttachmentExt(null);
            setAttachment(null);
            setLevel(null);
            setFaculty(null);
            setDept(null);
        }catch(error){
            console.log(error);
            showToast(toast_types.error, messages.NETWORK_ERROR);
        }
        setLoading(false);
    }

    useEffect(()=>{
        if(attachment){
            let ext = attachment.name.split('.');
            ext = ext[ext.length - 1];
            ext = ext.toLowerCase();

            if(!getAllExtensions().includes(ext)){
                showToast(toast_types.error, 'Invalid file selected.');
                return;
            }else{
                if(attachment.size > 50000000){
                    showToast(toast_types.error, 'File too large, maximum of 50mb allowed.');
                    return;
                }
            }

            if(attachment_exts.docs.includes(ext)){
                ext = 'pdf';
            }

            fileToBase64(attachment).then(data=>{ 
                setAttachmentBase64(data);
                setAttachmentExt(ext);
            }).catch(err=>console.log(err));
        }
    }, [attachment]);

    useEffect(()=>{
        if(attachmentExt){
            handleUpload(); 
        }
    }, [attachmentExt]);

    useEffect(() => {
        for (let i = 0; i < user_levels.length; i++) {
            if (user_levels[i].value == level) {
                setLevelLabel(user_levels[i].label);
            }
        }
    }, [level])
    
    useEffect(() => {
        for(let i = 0; i < faculties.length; i++){
            let faculty = faculties[i];
            if(faculty.value == facultyValue){
                setFacultyLabel(faculty.label);
                setDept(null);
            }
        }
    }, [facultyValue]);

    useEffect(() => {
        let depts_fetched = user_depts(schoolValue, facultyValue)
        for (let i = 0; i < depts_fetched.length; i++) {
            if (depts_fetched[i].value == dept) {
                setDeptLabel(depts_fetched[i].label);
            }
        }
    }, [dept])

    useEffect(() => {
        for (let i = 0; i < schools.length; i++) {
            let school = schools[i]
            if (school.value == schoolValue) {
                setSchoolLabel(school.label);
                setFacultyValue(null);
                setDept(null);
            }
        }
    }, [schoolValue])

    return <CreateContentComponent 
        navigation={navigation}
        title={title}
        setTitle={setTitle}
        desc={desc}
        setDesc={setDesc}
        level={level}
        setLevel={setLevel}
        facultyOpen={facultyOpen}
        setFacultyOpen={setFacultyOpen}
        facultyValue={facultyValue}
        setFacultyValue={setFacultyValue}
        facultyLabel={facultyLabel}
        schoolOpen={schoolOpen}
        setSchoolOpen={setSchoolOpen}
        schoolValue={schoolValue}
        setSchoolValue={setSchoolValue}
        schoolLabel={schoolLabel}
        setAttachment={setAttachment}
        attachmentBase64={attachmentBase64}
        loading={loading}
        dept={dept}
        setDept={setDept}
        deptLabel={deptLabel}
        levelLabel={levelLabel}
        setLevelOpen={setLevelOpen}
        setDeptOpen={setDeptOpen}
        levelOpen={levelOpen}
        deptOpen={deptOpen}
        handleSubmit={handleSubmit}
        attachment={attachment}
        attachmentExt={attachmentExt}
        attachmentText={attachmentText}
        schools={schools}
    />
}