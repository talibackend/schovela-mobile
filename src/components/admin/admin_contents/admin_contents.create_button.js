import { Pressable } from "react-native"
import Icon from "react-native-vector-icons/Ionicons";
import adminStyle from "../../../styles/admin.style";

export default CreateContentButton = ({navigation})=>{
    return <Pressable style={adminStyle.create_content_floating_pressable}>
        <Icon style={adminStyle.create_content_floating_icon} size={400} name="add" />
    </Pressable>
}