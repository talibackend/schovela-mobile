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
        maxHeight : '50%',
        minHeight : '10%',
        overflow: 'scroll',
        backgroundColor : 'white',
        borderRadius : 20,
        width : '60%',
        maxWidth : '80%',
        paddingHorizontal : 10,
        paddingVertical : 10
    },
    multi_scroll_view : {
        maxHeight : '70%',
        width : '80%',
    },
    scroll_element : {
        marginVertical : 10,
        width : '100%'
    },
    main_label : {
        fontWeight : "bold",
        fontSize : 18,
        color : "black"
    },
    scroll_pressable_text : {
        fontSize : 15,
        color : 'black'
    },
    selected_style : {
        color : 'grey'
    }
})