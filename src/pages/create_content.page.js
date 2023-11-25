import CreateContentComponent from '../components/create_content.component';
import { useEffect, useState } from 'react';
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
    attachment_exts
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

    const [facultyOpen, setFacultyOpen] = useState(false);
    const [faculty, setFaculty] = useState(null);
    const [facultyLabel, setFacultyLabel] = useState("");

    const [deptOpen, setDeptOpen] = useState(false);
    const [dept, setDept] = useState(null);
    const [deptLabel, setDeptLabel] = useState("");

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
        for (let i = 0; i < user_faculties.length; i++) {
            if (user_faculties[i].value == faculty) {
                setFacultyLabel(user_faculties[i].label);
                setDeptLabel(user_depts(faculty)[0].label);
            }
        }
    }, [faculty])

    useEffect(() => {
        for (let i = 0; i < user_depts(faculty).length; i++) {
            if (user_depts(faculty)[i].value == dept) {
                setDeptLabel(user_depts(faculty)[i].label);
            }
        }
    }, [dept])

    return <CreateContentComponent 
        navigation={navigation}
        title={title}
        setTitle={setTitle}
        desc={desc}
        setDesc={setDesc}
        level={level}
        setLevel={setLevel}
        faculty={faculty}
        setFaculty={setFaculty}
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
        levelOpen={levelOpen}
        facultyOpen={facultyOpen}
        deptOpen={deptOpen}
        handleSubmit={handleSubmit}
        attachment={attachment}
        attachmentExt={attachmentExt}
        attachmentText={attachmentText}
    />
}