import { StyleSheet } from "react-native";
import { colors } from "../utils/consts";

export default StyleSheet.create({
    modal_style : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : 'rgba(0, 0, 0, 0.3)'
    },
    scroll_view : {
        maxHeight : '30%',
        minHeight : '10%',
        overflow: 'scroll',
        backgroundColor : 'white',
        borderRadius : 20,
        width : '60%',
        maxWidth : '80%',
        paddingHorizontal : 10,
        paddingVertical : 10
    },
    scroll_element : {
        marginVertical : 10,
        width : '100%'
    },
    scroll_pressable : {

    },
    scroll_pressable_text : {
        fontSize : 15
    },
    selected_style : {
        color : 'grey'
    }
})