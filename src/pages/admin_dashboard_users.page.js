import AdminDashboardUsersComponent from '../components/admin_dashboard_users.component';
import { useState, useEffect } from 'react';
import { api_routes, messages, request_methods, user_filters } from '../utils/consts';
import { showToast } from '../utils/toast';
import { authRequest } from '../utils/network';
import { isCloseToBottom } from '../utils/scroll';

export default AdminDashboardUsersScreen = ({navigation})=>{
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState(null);
    const [filterLabel, setFilterLabel] = useState(role != null ? role : "All");
    const [allLoaded, setAllLoaded] = useState(false);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    // const [retryCount, setRetryCount] = useState(1);

    const loadInfos = async (page2 = 0)=>{
        if(!allLoaded){
            try {
                let url = `${api_routes.admin.users}?page=${page2}`;
                if(role !== null){
                    url = `${url}&role=${role}`;
                }
                setLoading(true);
                let request = await authRequest(request_methods.GET, url);
                setUsers([...users, ...request.users]);
                setLoading(false);
                if(request.users.length < 20){
                    setAllLoaded(true);
                }
            } catch (error) {
                console.log(error);
                showToast('error', messages.NETWORK_ERROR);
                // await loadInfos();
            }
        }
    }

    const handleScroll = (nativeEvent)=>{
        if(!loading){
            if(isCloseToBottom(nativeEvent)){
                if(!allLoaded){
                    loadInfos(page + 20);
                    setPage(page => page + 20);
                }
                // setRetryCount(1);
            }
        }
    }

    useEffect(()=>{
        for(let i = 0; i < user_filters.length; i++){
            if(user_filters[i].value == role){
                setFilterLabel( user_filters[i].label);
            }
        }
        setPage(0);
        setAllLoaded(false);
        setUsers([]);
        // setRetryCount(1);
    }, [role])

    useEffect(()=>{
        loadInfos(page);
    }, [allLoaded, page])

    return <AdminDashboardUsersComponent 
                filterLabel={filterLabel} 
                role={role} 
                setRole={setRole} 
                users={users} 
                navigation={navigation}
                handleScroll={handleScroll}
            />
}