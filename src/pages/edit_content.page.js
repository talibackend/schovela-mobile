import { useEffect, useState } from 'react';
import EditContentComponent from '../components/create_content.component';
import { 
    user_levels, 
    messages, 
    user_depts, 
    user_faculties, 
    getAllExtensions, 
    api_routes, 
    toast_types, 
    screenNames,
    request_methods,
    attachment_exts,
    storageKeyNames,
    user_roles,
    user_schools
} from '../utils/consts';
import { fileToBase64, getRemoteFile } from '../utils/general';
import { showToast } from '../utils/toast';
import { authRequest } from '../utils/network';
import { getItem } from '../utils/asyncStorage';
import { getFileUrl, uploadBase64 } from '../utils/storage';

export default EditContentScreen = ({ navigation, route })=>{
    const { post } = route.params;

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

    const [deptOpen, setDeptOpen] = useState(false);
    const [dept, setDept] = useState(null);
    const [deptLabel, setDeptLabel] = useState("");

    const [attachmentUrl, setAttachmentUrl] = useState("");

    const [attachmentText, setAttachmentText] = useState("Click to Change Attachment");
    const [currentUploaded, setCurrentUploaded] = useState(null);

    useEffect(()=>{
        console.log(attachmentUrl);
    }, [attachmentUrl]);

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
        const id = post.id;

        const payload = { id, desc, level, faculty : facultyValue, dept, school : schoolValue };

        if(!attachment.first){
            payload.attachment = attachmentUrl;
            payload.attachment_ext = attachmentExt;
        }

        if(title !== post.title){
            payload.title = title;
        }

        try{
            setLoading(true);
            let request = await authRequest(request_methods.PATCH, api_routes.create_content, payload);
            if(typeof(request) == "string"){
                showToast(toast_types.error, request);
                setLoading(false);
                return;
            }
            showToast(toast_types.success, messages.CONTENT_CREATED, 3);
            navigation.navigate(screenNames.view_content, { id : post.id });
        }catch(error){
            console.log(error);
            showToast(toast_types.error, messages.NETWORK_ERROR);
        }
        setLoading(false);
    }

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

    const loadInfos = async ()=>{
        if(!post){
            return navigation.goBack();
        }

        let localUser = JSON.parse(await getItem(storageKeyNames.user));

        if(localUser.role !== user_roles.admin && localUser.id !== post.UserId){
            return navigation.goBack();
        }

        setTitle(post.title);
        setDesc(post.desc);
        setLevel(post.level);
        setFaculty(post.faculty);
        setDept(post.dept);
        setSchoolValue(post.school);
        getRemoteFile(post.attachment).then((data)=>{
            let type = "application/shit";

            if(attachment_exts.image.includes(post.attachment_ext)){
                type = `image/${post.attachmentExt}`;
            }

            if(attachment_exts.video.includes(post.attachment_ext)){
                type = `video/${post.attachmentExt}`;
            }

            setAttachment({
                first : true,
                name : post.attachment,
                uri : post.attachment,
                size : Math.ceil(data.length / 8),
                type
            });
            setAttachmentBase64(data);
            setAttachmentExt(post.attachment_ext);
        }).catch(err=>console.log(err));
    }

    useEffect(()=>{
        loadInfos();
    }, []);
    
    useEffect(()=>{
        if(attachment && !attachment.first){
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
            fileToBase64(attachment).then(data=>{ setAttachmentBase64(data); }).catch(err=>console.log(err));
            setAttachmentExt(ext);
        }
    }, [attachment]);

    useEffect(()=>{
        if(attachmentExt && !attachment.first && attachmentBase64 !== ""){
            handleUpload(); 
        }
    }, [attachmentExt, attachment, attachmentBase64]);

    return <EditContentComponent 
        pageName="Edit Content"
        navigation={navigation}
        title={title}
        setTitle={setTitle}
        desc={desc}
        setDesc={setDesc}
        level={level}
        setLevel={setLevel}
        facultyValue={facultyValue}
        setFacultyValue={setFacultyValue}
        setAttachment={setAttachment}
        attachmentBase64={attachmentBase64}
        loading={loading}
        dept={dept}
        setDept={setDept}
        deptLabel={deptLabel}
        facultyLabel={facultyLabel}
        levelLabel={levelLabel}
        setLevelOpen={setLevelOpen}
        setFacultyOpen={setFacultyOpen}
        setDeptOpen={setDeptOpen}
        schoolOpen={schoolOpen}
        setSchoolOpen={setSchoolOpen}
        schoolValue={schoolValue}
        setSchoolValue={setSchoolValue}
        schoolLabel={schoolLabel}
        levelOpen={levelOpen}
        facultyOpen={facultyOpen}
        deptOpen={deptOpen}
        handleSubmit={handleSubmit}
        attachment={attachment}
        attachmentExt={attachmentExt}
        attachmentText={attachmentText}
        schools={schools}
    />
}