import { getItem } from "../utils/asyncStorage";
import { useState, useEffect } from "react";
import { useToast } from "react-native-toast-notifications";
import { errorToastOptions, messages, storageKeyNames, screenNames, user_roles } from "../utils/consts";
import AdminDashboardContentsScreen from './admin_dashboard_contents.page';
import { BackHandler } from "react-native";

export default HomeScreen = ({ navigation }) => {
    let [renderHome, setRenderHome] = useState(false);
    const toast = useToast();

    const loadInfo = async () => {
        try {
            let localToken = await getItem(storageKeyNames.accessToken);
            let localUser = JSON.parse(await getItem(storageKeyNames.user));

            if (!localToken) {
                return navigation.navigate(screenNames.login)
            } else {
                if (localUser.role == user_roles.admin) {
                    return navigation.navigate(screenNames.admin_dashboard);
                }
            }
            setRenderHome(true);
        } catch (error) {
            toast.show(messages.APP_ERROR, errorToastOptions);
        }

        BackHandler.addEventListener("hardwareBackPress", () => {
            return true;
        });
    }

    useEffect(() => {
        (async () => {return await loadInfo()})();
    }, []);

    return renderHome ? <AdminDashboardContentsScreen navigation={navigation} title="Home" allowBack={false} /> : null;
} 