import AdminContentsComponent from "../components/admin_dashboard_contents.component";
import { useState, useEffect } from 'react';
import { authRequest } from "../utils/network";
import { request_methods, api_routes, toast_types, user_levels, user_faculties, user_depts } from "../utils/consts";
import { showToast } from "../utils/toast";

export default AdminDashboardContentsScreen = ({navigation, title})=>{
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [filterOpen, setFilterOpen] = useState(false);

    const [level, setLevel] = useState(null);
    const [levelLabel, setLevelLabel] = useState("");

    const [faculty, setFaculty] = useState(null);
    const [facultyLabel, setFacultyLabel] = useState("");

    const [dept, setDept] = useState(null);
    const [deptLabel, setDeptLabel] = useState("");

    let filterObject = {
        level : {
            label : "Select Level",
            selected : level,
            data : user_levels,
            selectHandler : setLevel
        },
        faculty : {
            label : "Select Faculty",
            selected : faculty,
            data : user_faculties,
            selectHandler : setFaculty
        },
        depts : {
            label : "Select Department",
            selected : dept,
            data : user_depts(faculty),
            selectHandler : setDept
        }
    }

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



    const loadInfos = async ()=>{
        try{
            setLoading(true);
            let request = await authRequest(request_methods.GET, api_routes.create_content);
            if(typeof(request) == "string"){
                showToast(toast_types.error, request);
                setLoading(false);
                return;
            }
            setPosts([...request.post]);
        }catch(error){
            console.log(error);
            showToast(toast_types.error, messages.NETWORK_ERROR);
        }
        setLoading(false);
    }

    useEffect(()=>{
        loadInfos();
    }, []);

    return <AdminContentsComponent 
        navigation={navigation} 
        posts={posts}
        loading={loading}
        title={title ? title : "Content"}
        filterObject={filterObject}
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
    />
}