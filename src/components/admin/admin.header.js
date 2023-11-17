import { View, Text, Pressable } from 'react-native';
import adminStyle from '../../styles/admin.style';
import Icon from "react-native-vector-icons/Ionicons";
import { deleteItem } from '../../utils/asyncStorage';
import { screenNames, storageKeyNames } from '../../utils/consts';

export default AdminHeaderComponent = ({ navigation, backButton, name }) => {
    return <View style={[adminStyle.header_container]}>
        {
            backButton ? <Pressable onPress={()=>{ navigation.goBack(); }}><View style={adminStyle.header_back_icon}><Icon size={400} style={adminStyle.header_back_icon} name="arrow-back" /></View></Pressable> : null
        }
        
        <View style={adminStyle.header_title}><Text style={adminStyle.header_title_text}>{name}</Text></View>
        <View>
            <Pressable onPress={async ()=>{ 
                await deleteItem(storageKeyNames.accessToken);
                await deleteItem(storageKeyNames.refreshToken);
                await deleteItem(storageKeyNames.user);
                navigation.navigate(screenNames.login);
             }}>
                <Icon size={400} style={adminStyle.header_back_icon} name="log-out-outline" />
            </Pressable>
        </View>
    </View>;
}