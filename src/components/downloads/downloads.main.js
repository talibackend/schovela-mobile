import { Pressable, View, Text } from "react-native";
import adminStyle from "../../styles/admin.style";
import EachContentCard from "../admin/admin_contents/admin_contents.each_card";

export default DownloadsMainComponent = ({ navigation })=>{
    return <View style={adminStyle.main_container}>
            <EachContentCard 
                id={1}
                title="Test"
                poster="Femi Fatokun"
                image={require('../../../assets/static/file.png')}
                moment_posted="27 Nov, 2023"
                navigation={navigation}
                live={true}
            />
            <EachContentCard 
                id={1}
                title="Test"
                poster="Femi Fatokun"
                image={require('../../../assets/static/file.png')}
                moment_posted="27 Nov, 2023"
                navigation={navigation}
                live={true}
            />
            <EachContentCard 
                id={1}
                title="Test"
                poster="Femi Fatokun"
                image={require('../../../assets/static/file.png')}
                moment_posted="27 Nov, 2023"
                navigation={navigation}
                live={true}
            />
            <EachContentCard 
                id={1}
                title="Test"
                poster="Femi Fatokun"
                image={require('../../../assets/static/file.png')}
                moment_posted="27 Nov, 2023"
                navigation={navigation}
                live={true}
            />
    </View>
}