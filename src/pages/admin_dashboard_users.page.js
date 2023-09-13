import AdminDashboardUsersComponent from '../components/admin_dashboard_users.component';
import { useState, useEffect } from 'react';
import { api_routes, messages, request_methods, user_filters } from '../utils/consts';
import { showToast } from '../utils/toast';
import { authRequest } from '../utils/network';

export default AdminDashboardUsersScreen = ({navigation})=>{
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState(null);
    const [filterLabel, setFilterLabel] = useState(role != null ? role : "All");

    const loadInfos = async ()=>{
        setUsers([]);
        try {
            let url = api_routes.admin.users;
            if(role !== null){
                url = `${url}?role=${role}`;
            }
            let request = await authRequest(request_methods.GET, url);
            setUsers(request.users);
        } catch (error) {
            console.log(error);
            showToast('error', messages.NETWORK_ERROR);
            await loadInfos();
        }
    }

    useEffect(()=>{
        for(let i = 0; i < user_filters.length; i++){
            if(user_filters[i].value == role){
                setFilterLabel( user_filters[i].label);
            }
        }
        loadInfos();
    }, [role])

    return <AdminDashboardUsersComponent filterLabel={filterLabel} role={role} setRole={setRole} users={users} navigation={navigation} />
}