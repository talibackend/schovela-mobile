import AdminDashboardUserInfoComponent from '../components/admin_dashboard_user_info.component';
import { useEffect, useState } from 'react';
import { showToast } from '../utils/toast';
import { api_routes, messages, request_methods, toast_types, user_roles, storageKeyNames } from '../utils/consts';
import { authRequest } from '../utils/network';
import { getItem } from '../utils/asyncStorage';

export default AdminDashboardUserInfoScreen = ({route, navigation})=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [updatingRole, setUpdatingRole] = useState(false);
    const [hasPrivilege, setHasPrivilege] = useState(false);
    const { id } = route.params;

    const handleRolaChange = async ()=>{
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
                let localUser = JSON.parse(await getItem(storageKeyNames.user));
    
                if(localUser.role === user_roles.admin){
                    setHasPrivilege(true);
                }

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
                hasPrivilege={hasPrivilege}
                loadHandler={loadInfos}
                loading={loading}
            />
}