import { StyleSheet } from "react-native";
import { Platform } from "react-native";

export default StyleSheet.create({
    header_container: {
        backgroundColor : 'black',
        flex: 0.9,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomColor : 'grey',
        borderBottomWidth : 0.5
    },
    header_back_icon: {
        flex: 1
    },
    header_back_icon: {
        fontSize: 25,
        color : 'white'
    },
    header_title: {
        flex: 11,
        alignItems: 'center'
    },
    header_title_text: {
        fontSize: 20,
        color : 'white'
    },
    main_container : {
        flex : 11.1
    },
    each_dashboard_card : {
        backgroundColor : 'black',
        marginVertical : 5,
        marginHorizontal : 2,
        paddingVertical : 20,
        paddingHorizontal : 15,
        flexDirection : 'row',
        alignItems : 'center',
        borderRadius : 5
    },
    each_dashboard_card_name : {
        flex : 9,
    },
    each_dashboard_card_count : {
        flex : 3
    },
    each_dashboard_card_name_text : {
        color : 'white',
        fontSize : 15
    },
    each_dashboard_card_count_text : {
        color : 'black',
        fontSize : 15,
        backgroundColor : 'white',
        textAlign : "center",
        paddingVertical : 5,
        borderRadius : 100
    },
    each_user_card : {
        // paddingVertical : 20
    },
    each_user_card_icon : {
        flex : 4
    },  
    each_user_logo : {
        height : 100,
        width : 100,
        borderRadius : 50
    },
    each_user_list_info : {
        // backgroundColor : 'red',
        flex : 8,
        padding : 10
    },
    each_user_list_info_name : {
        color : 'white',
        fontWeight : 'bold',
        fontSize : 25,
        marginBottom : 5
    },
    each_user_list_info_email : {
        color : 'white',
        fontSize : 15,
    },
    each_user_list_info_joined_date : {
        color : 'white',
        fontSize : 12
    },
    filter_input : {
        margin : 5
    },
    elevate_btn_container : {
        alignItems : 'center',
        margin : 20
    },
    elevate_btn : {
        backgroundColor : 'black',
        paddingVertical : 10,
        paddingHorizontal : 20,
        borderRadius : 5
    },
    elevate_btn_txt : {
        fontSize : 15,
        color : 'white',
        fontWeight : 'bold',
        textTransform : 'uppercase'
    },
    user_image_container : {
        alignItems : "center",
        marginBottom : 20
    },
    user_image : {
        height : 250,
        width : 250,
        borderRadius : 150
    },
    user_info_columns : {
        marginVertical : 10,
        marginHorizontal : 20,
        flexDirection : 'row'
    },
    user_info_title : {
        flex : 1,
        fontSize : 15,
        backgroundColor : 'black',
        color : 'white',
        paddingVertical : 5,
        paddingHorizontal : 10
    },
    user_info_value : {
        flex : 2,
        fontSize : 15,
        paddingHorizontal : 10,
        paddingVertical : 5,
        color : 'black'
    }
});