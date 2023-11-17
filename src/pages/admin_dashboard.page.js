import AdminDashboardComponent from '../components/admin_dashboard.component';
import { useState, useEffect } from 'react';
import { showToast } from '../utils/toast';
import { authRequest } from '../utils/network';
import { api_routes, request_methods, messages } from '../utils/consts';
import { BackHandler } from "react-native";

export default AdminDashboardScreen = ({ navigation }) => {
    const [userCount, updateUserCount] = useState(0);
    const [contentCount, updateContentCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const loadInfos = async () => {
        setLoading(true);
        try {
            let request = await authRequest(request_methods.GET, api_routes.admin.dashboard_info);
            updateUserCount(request.total_user);
            updateContentCount(request.total_content);
        } catch (error) {
            console.log(error);
            showToast('error', messages.NETWORK_ERROR);
        }
        setLoading(false);
    }

    useEffect(() => {
        loadInfos();
        BackHandler.addEventListener("hardwareBackPress", ()=>{
            return true;
        });
    }, []);

    return <AdminDashboardComponent loadHandler={loadInfos} loading={loading} userCount={userCount} contentCount={contentCount} navigation={navigation} />;
}