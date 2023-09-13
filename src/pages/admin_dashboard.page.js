import AdminDashboardComponent from '../components/admin_dashboard.component';
import { useState, useEffect } from 'react';
import { showToast } from '../utils/toast';
import { authRequest } from '../utils/network';
import { api_routes, request_methods, messages } from '../utils/consts';

export default AdminDashboardScreen = ({ navigation }) => {
    const [userCount, updateUserCount] = useState(0);
    const [contentCount, updateContentCount] = useState(0);
    // const [retryCount, setRetryCount] = useState(1);

    const loadInfos = async () => {
        try {
            let request = await authRequest(request_methods.GET, api_routes.admin.dashboard_info);
            updateUserCount(request.total_user);
            updateContentCount(20);
        } catch (error) {
            console.log(error);
            showToast('error', messages.NETWORK_ERROR);
            // await loadInfos();
            // setRetryCount(count => ++count);
        }
    }

    useEffect(() => {
        loadInfos();
    }, []);

    return <AdminDashboardComponent userCount={userCount} contentCount={contentCount} navigation={navigation} />;
}