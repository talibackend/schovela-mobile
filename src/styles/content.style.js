import { StyleSheet } from "react-native";

export default StyleSheet.create({
    create_content_container : {
        paddingTop : 10,
        paddingHorizontal : 10
    },
    create_content_title_input : {
        padding : 20,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        padding: 15,
        fontSize: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        color : 'black',
    },
    create_content_desc_input : {
        height : 200,
        paddingTop : 10
    },
    create_content_upload_section : {
        flex : 1,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-evenly",
        marginVertical: 10,
        borderStyle : 'dashed',
        borderColor: 'black',
        borderWidth : 1,
        paddingVertical : 10
    },
    each_file_picker_icon : {
        height : 30,
        width : 30
    },
    view_content_title : {
        fontSize : 15,
        fontWeight : 'bold',
        marginVertical : 10,
        color : "black"
    },
    view_content_attachment_preview : {
        marginVertical : 10,
        height : 300,
        padding : 0
    },
    description : {
        lineHeight : 25,
        color : "black"
    },
    stat_section : {
        flex : 1,
        flexDirection : "row",
        marginVertical : 20,
        alignItems : "center",
        justifyContent : "space-evenly"
        // backgroundColor : "red"
    },
    stat_each_section : {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-between"
    },
    stat_icons : {
        fontSize : 25,
        marginRight : 5,
        color : "black"
    },
    stat_images : {
        marginRight : 5,
        height : 25,
        width : 25,
    },
    attachment_preview_text : {
        color : "black"
    },
    admin_actions_container : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : "space-around",
        marginVertical : 5
    },
    modal_close_pressable : {
        flexDirection : 'row',
        justifyContent: 'flex-start',
        // marginTop : 30
        height : 80,
        backgroundColor : 'black'
    },
    modal_close_container : {
        borderRadius : 50,
        flexDirection : 'row',
        justifyContent : 'center',
        marginLeft : 5,
        marginTop : 15
    },
    modal_close_button : {
        color : 'white',
        fontSize : 30
    }
})