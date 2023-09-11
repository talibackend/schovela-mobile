import { StyleSheet } from "react-native";

export default StyleSheet.create({
    login_container: {
        flex: 1,
        marginTop: 30,
        padding: 20,
    },
    login_header_section: {
        marginBottom: 50
    },
    login_header_text: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10
    },
    login_header_sub: {
        fontSize: 20
    },
    input_wrapper: {
        borderRadius: 10,
        flex: 1
    },
    input_field: {
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        padding: 15,
        fontSize: 15,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    button: {
        padding: 20,
        backgroundColor: 'black',
        borderRadius: 5,
        marginTop: 10
    },
    button_text: {
        color: 'white',
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    forgot_password_container : {
        alignItems : 'flex-end'
    },  
    forgot_password: {
        fontWeight: 'bold',
        paddingTop: 5,
        textAlign: 'right',
        fontSize: 15,
        paddingBottom: 10,
    },
    dont_have_account: {
        textAlign: "center",
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    login_footer_text: { 
        flex: 4.5,
        textAlign : 'right', 
        width: 10, 
        fontSize: 15 
    },
    login_signup_button: {
        fontWeight: 'bold',
        fontSize: 15
    }
})