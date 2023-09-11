import { StyleSheet } from "react-native";
import { colors } from "../utils/consts";

export default StyleSheet.create({
    viewStyle : {
        backgroundColor : colors.splashscreen_bg,
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    logoStyle : {
        height : 200,
        width : 300,
        borderRadius : 10
    }
})