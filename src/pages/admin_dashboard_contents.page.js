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
    messages
} from "../utils/consts";
import { showToast } from "../utils/toast";
import { isCloseToBottom } from '../utils/scroll';
import { useNavigation, useIsFocused } from '@react-navigation/native';

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

    const [faculty, setFaculty] = useState(null);
    const [facultyLabel, setFacultyLabel] = useState("");

    const [dept, setDept] = useState(null);
    const [deptLabel, setDeptLabel] = useState("");

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
        faculty: {
            label: "Select Faculty",
            selected: faculty,
            data: user_faculties,
            selectedLabel: facultyLabel,
            selectHandler: setFaculty
        },
        depts: {
            label: "Select Department",
            selected: dept,
            selectedLabel: deptLabel,
            data: user_depts(faculty),
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
        for (let i = 0; i < user_faculties.length; i++) {
            if (user_faculties[i].value == faculty) {
                setFacultyLabel(user_faculties[i].label);
                setDeptLabel(user_depts(faculty)[0].label);
            }
        }
        if(!faculty){
            setDept(null);
        }
    }, [faculty])

    useEffect(() => {
        for (let i = 0; i < user_depts(faculty).length; i++) {
            if (user_depts(faculty)[i].value == dept) {
                setDeptLabel(user_depts(faculty)[i].label);
            }
        }
    }, [dept])



    const loadInfos = async (page2 = 0) => {
        if (!allLoaded || page2 === 0) {
            let url = `${api_routes.create_content}?offset=${page2}`;
            let filters = {
                level,
                faculty,
                dept,
                search,
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