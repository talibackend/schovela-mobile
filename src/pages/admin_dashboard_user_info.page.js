import AdminDashboardUserInfoComponent from '../components/admin_dashboard_user_info.component';
import { useEffect, useState } from 'react';
import { showToast } from '../utils/toast';
import { api_routes, messages, request_methods, toast_types, user_roles } from '../utils/consts';
import { authRequest } from '../utils/network';

export default AdminDashboardUserInfoScreen = ({route, navigation})=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [updatingRole, setUpdatingRole] = useState(false);
    const { id } = route.params;

    const handleRolaChange = async ()=>{
        console.log('Working...');
        if(user.role){
            let url = '';
            let newRole = '';

            if(user.role == user_roles.user){
                url = api_routes.admin.promote;
                newRole = user_roles.mod;
            }else{
                url = api_routes.admin.demote;
                newRole = user_roles.user;
            }

            setUpdatingRole(true);

            try{
                await authRequest(request_methods.POST, url, { id });
                setUser({
                    ...user,
                    role : newRole
                });
            }catch(error){
                console.log(error);
                showToast(toast_types.error, messages.NETWORK_ERROR);
            }

            setUpdatingRole(false);
        }
    }

    const loadInfos = async ()=>{
        if(!id){
            navigation.goBack();
        }else{
            setLoading(true);
            try{
                let request = await authRequest(request_methods.GET, `${api_routes.admin.user}/${id}`);
                setUser(request.user);
            }catch(error){
                console.log(error);
                showToast(toast_types.error, messages.NETWORK_ERROR);
            }
            setLoading(false);
        }
    }

    useEffect(()=>{
        loadInfos();
    }, []);

    return <AdminDashboardUserInfoComponent 
                user={user} 
                handleRoleChange={handleRolaChange} 
                updatingRole={updatingRole} 
                navigation={navigation} 
            />
}