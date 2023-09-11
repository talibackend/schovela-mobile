import { StyleSheet } from "react-native";
import { colors } from "../utils/consts";

export default StyleSheet.create({
    app_container : {
        flex : 1,
        paddingTop : '10%',
        backgroundColor : colors.global_screen_bg,
        color : 'black'
    },
    modal_view_container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : 'rgba(0, 0, 0, 0.3)',
    }
})