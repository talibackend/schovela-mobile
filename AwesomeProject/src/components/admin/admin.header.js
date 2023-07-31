import { View, Text, Pressable } from 'react-native';
import adminStyle from '../../styles/admin.style';
// import Ionicons from '@expo/vector-icons/Ionicons';

export default AdminHeaderComponent = ({ navigation, backButton, name }) => {
    return <View style={[adminStyle.header_container]}>
        {
            // backButton ? <Pressable onPress={()=>{ navigation.goBack(); }}><View style={adminStyle.header_back_icon}><Ionicons style={adminStyle.header_back_icon} name="arrow-back" /></View></Pressable> : null
        }
        
        <View style={adminStyle.header_title}><Text style={adminStyle.header_title_text}>{name}</Text></View>
    </View>;
}