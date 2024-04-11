import AdminContentsComponent from "../components/admin_dashboard_contents.component";
import { useState, useEffect } from 'react';
import { authRequest } from "../utils/network";
import {
    request_methods,
    api_routes,
    toast_types,
    user_levels,
    user_faculties,
    user_depts,
    content_filters,
    messages,
    user_schools
} from "../utils/consts";
import { showToast } from "../utils/toast";
import { isCloseToBottom } from '../utils/scroll';
import { useIsFocused } from '@react-navigation/native';

export default AdminDashboardContentsScreen = ({ navigation, route }) => {
    const { title, allowBack } = route.params || {};
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);
    const [page, setPage] = useState(0);

    const [filterOpen, setFilterOpen] = useState(false);

    const [status, setStatus] = useState(null);
    const [statusLabel, setStatusLabel] = useState("");
    const [live, setLive] = useState(null);

    const [level, setLevel] = useState(null);
    const [levelLabel, setLevelLabel] = useState("");

    const [schoolValue, setSchoolValue] = useState(null);
    const [schoolLabel, setSchoolLabel] = useState(null);
    const schools = user_schools;
    
    const [faculty, setFaculty] = useState(null);
    const [facultyLabel, setFacultyLabel] = useState("");
    const faculties = user_faculties(schoolValue);

    const [dept, setDept] = useState(null);
    const [deptLabel, setDeptLabel] = useState("");
    const depts = user_depts(schoolValue, faculty)

    const [search, setSearch] = useState(null);
    
    const isFocused = useIsFocused();

    let filterObject = {
        status: {
            label: "Select Status",
            selected: status,
            data: content_filters,
            selectedLabel: statusLabel,
            selectHandler: setStatus
        },
        level: {
            label: "Select Level",
            selected: level,
            data: user_levels,
            selectedLabel: levelLabel,
            selectHandler: setLevel
        },
        school: {
            label: "Select Institution",
            selected: schoolValue,
            selectedLabel: schoolLabel,
            data: user_schools,
            selectHandler: setSchoolValue
        },
        faculty: {
            label: "Select Faculty",
            selected: faculty,
            data: faculties,
            selectedLabel: facultyLabel,
            selectHandler: setFaculty
        },
        depts: {
            label: "Select Department",
            selected: dept,
            selectedLabel: deptLabel,
            data: depts,
            selectHandler: setDept
        }
    }

    useEffect(() => {
        for (let i = 0; i < content_filters.length; i++) {
            if (content_filters[i].value == status) {
                setStatusLabel(content_filters[i].label);
            }
        }
        if (status != null) {
            if (status == "hidden") {
                setLive(false);
            } else {
                setLive(true);
            }
        } else {
            setLive(null);
        }
        setPosts([]);
    }, [status])

    useEffect(() => {
        for (let i = 0; i < user_levels.length; i++) {
            if (user_levels[i].value == level) {
                setLevelLabel(user_levels[i].label);
            }
        }
    }, [level])
    
    useEffect(() => {
        console.log(faculties)
        for(let i = 0; i < faculties.length; i++){
            let thisFaculty = faculties[i];
            if(thisFaculty.value == faculty){
                setFacultyLabel(thisFaculty.label);
                setDept(null);
            }
        }
    }, [faculty]);

    useEffect(() => {
        let depts_fetched = user_depts(schoolValue, faculty)
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
                setFaculty(null);
                setDept(null);
            }
        }
    }, [schoolValue])


    const loadInfos = async (page2 = 0) => {
        if (!allLoaded || page2 === 0) {
            let url = `${api_routes.create_content}?offset=${page2}`;
            let filters = {
                level,
                faculty,
                dept,
                search,
                school : schoolValue
            };

            if (live == false || live == true) {
                filters.live = live;
            }

            for (let i = 0; i < Object.keys(filters).length; i++) {
                let key = Object.keys(filters)[i];
                let data = filters[key];

                if (data) {
                    url += `&${key}=${data}`
                } else {
                    if (key == "live") {
                        url += `&${key}=${data}`
                    }
                }
            }

            try {
                setLoading(true);
                let request = await authRequest(request_methods.GET, url);
                if (typeof (request) == "string") {
                    showToast(toast_types.error, request);
                    setLoading(false);
                    return;
                }
                if(page2 == 0){
                    setPosts([...request.post]);
                }else{
                    setPosts([...posts, ...request.post]);
                }
                if (request.post.length < 20 && !search) {
                    setAllLoaded(true);
                }
            } catch (error) {
                console.log(error);
                showToast(toast_types.error, messages.NETWORK_ERROR);
            }
            setLoading(false);
        }
    }

    const handleScroll = (nativeEvent) => {
        if (!loading) {
            if (isCloseToBottom(nativeEvent)) {
                if (!allLoaded) {
                    loadInfos(page + 20);
                    setPage(page => page + 20);
                }
            }
        }
    }

    useEffect(() => {
        if (!filterOpen) {
            setPage(0);
            setAllLoaded(false);
            setPosts([]);
            setLoading(true);
            loadInfos(page);
        }else{
            setPosts([]);
        }
    }, [filterOpen])

    useEffect(() => {
        if(page !== 0){
            loadInfos(page);
        }
    }, [page]);

    useEffect(() => {
        setPage(0);
        setAllLoaded(false);
        setPosts([]);
        setLoading(true);
        loadInfos(page);
    }, [search]);
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setPage(0);
            setAllLoaded(false);
            setPosts([]);
            setLoading(true);
            loadInfos(0);
        });
    
        return () => {
          unsubscribe();
        };
      }, [isFocused]);

    const handleRefresh = ()=>{
        setPage(0);
        setAllLoaded(false);
        setPosts([]);
        setLoading(true);
        loadInfos(0);
    }

    return <AdminContentsComponent
        navigation={navigation}
        posts={posts}
        loading={loading}
        title={title ? title : "Content"}
        filterObject={filterObject}
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        handleScroll={handleScroll}
        search={search}
        setSearch={setSearch}
        allowBack={allowBack}
        loadHandler={handleRefresh}
    />
}