import { View, Text } from "react-native";
import contentStyle from "../../styles/content.style";
import adminStyle from "../../styles/admin.style";

export default ViewContentMain = ({ navigation })=>{

    return <View style={[adminStyle.main_container, contentStyle.create_content_container]}>
        <Text>Hello world....</Text>
    </View>
}