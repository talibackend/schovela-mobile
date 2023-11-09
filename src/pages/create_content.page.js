import CreateContentComponent from '../components/create_content.component';
import { useEffect, useState } from 'react';
import { user_levels, user_depts, user_faculties, getAllExtensions } from '../utils/consts';
import { fileToBase64 } from '../utils/general';
import { showToast } from '../utils/toast';

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

    const handleSubmit = async ()=>{
        if(!title || !desc || !level || !faculty || !dept || !attachmentBase64){
            return showToast('error', "All fields are required including attachment.");
        }
    }

    useEffect(()=>{
        if(attachment){
            let ext = attachment.name.split('.');
            ext = ext[ext.length - 1];
            ext = ext.toLowerCase();

            if(!getAllExtensions().includes(ext)){
                showToast('error', 'Invalid file selected.');
                return;
            }else{
                if(attachment.size > 50000000){
                    showToast('error', 'File too large, maximum of 50mb allowed.');
                    return;
                }
            }
            fileToBase64(attachment).then(data=>{ setAttachmentBase64(data); }).catch(err=>console.log(err));
            setAttachmentExt(ext);

        }
    }, [attachment]);

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
            }
        }
    }, [faculty])

    useEffect(() => {
        for (let i = 0; i < user_depts.length; i++) {
            if (user_depts[i].value == dept) {
                setDeptLabel(user_depts[i].label);
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
    />
}