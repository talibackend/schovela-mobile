import udus from './udus.json';

export const messages = {
    APP_ERROR : "Sorry an unknown error occured in your app, please contact support.",
    PASSWORD_PLACEHOLDER : "Password",
    EMAIL_PLACEHOLDER : "E-mail",
    PHONE_NUMBER : "Phone Number",
    CONFIRM_PASSWORD : "Confirm Password",
    LOGIN : "Login",
    SIGNUP : "Signup",
    COMPLETE : "Complete",
    SELECT_CATEGORY : "Select Category",
    DOB : "Date of Birth",
    SELECT_FACULTY : "Select Faculty",
    SELECT_LEVEL : "Select Level",
    NEXT : "Next",
    RESEND : "Resend",
    OTP : "OTP",
    NAME : "Name",
    CONTINUE : "Continue",
    NETWORK_ERROR : "Unknown error occured, please check your network and try again.",
    NAME_REQUIRED : "Name is required.",
    EMAIL_REQUIRED : "Email is required.",
    SIGNUP_SUCCESSFUL : "Sign up was successful.",
    INVALID_OTP : "Otp has to be a 6 digit number.",
    INVALID_PASSWORD : "Password has to be of at least 8 characters.",
    INVALID_CPASSWORD : "Confirm password not equal to password.",
    PASSWORD_SET : "You have successfully set your password.",
    DEPT : "Department",
    INVALID_CATEGORY : "Invalid Category Selected.",
    INVALID_FACULTY : "Invalid Faculty Selected.",
    INVALID_LEVEL : "Invalid Level Selected.",
    BASIC_INFO_SET : "Your account is set.",
    LOGIN_SUCCESSFUL : "Welcome back!",
    UNAUTHORIZED_ACTION : "The action you are trying to perform is unauthorized.",
    PASSWORD_RESET : "Password reset successful, please login.",
    FILTER_USERS : "Filter Users",
    NO_RECORDS : "No records found.",
    TITLE_PLACEHOLDER : "Title",
    DESC_PLACEHOLDER : "Description",
    SELECT_DEPT : "Select Department",
    CONTENT_CREATED : "Content has been successfully uploaded."
}

export const storageKeyNames = {
    accessToken : 'accessToken',
    refreshToken : 'refreshToken',
    user : 'user',
    forgot_email : 'forgot_email'
}

export const screenNames = {
    splashscreen : 'splashscreen',
    home : 'home',
    login : 'login',
    forgot_password : 'forgot_password',
    sign_up : 'sign_up',
    forgot_password_otp : 'forgot_password_otp',
    forgot_password_success : 'forgot_password_success',
    set_password : 'set_password',
    set_basics : 'set_basics',
    create_content : 'create_content',
    view_content : 'view_content',
    edit_content : 'edit_content',
    admin_dashboard : 'admin',
    admin_dashboard_users : 'admin/users',
    admin_dashboard_user_info : 'admin/user_info',
    admin_dashboard_contents : 'admin/contents',
}

export const api_routes = {
    signup : '/auth/create',
    verify_otp : '/auth/verify',
    update_user_info : '/user/data',
    login : '/auth/login',
    forgot_password : '/auth/forgot',
    reset_password : '/auth/change/password',
    create_content : '/post',
    hide_content : '/post/hide-unhide',
    admin : {
        dashboard_info : '/admin/total/users',
        users : '/admin/users',
        user : '/admin/user',
        promote : '/admin/moderator',
        demote : '/admin/de_elevate'
    }
}

export const errorToastOptions = {
    type : 'danger',
    placement : 'bottom',
    duration : 3000,
    animationType : 'slide-in'
}

export const colors = {
    splashscreen_bg : 'black',
    global_screen_bg : 'white',
    green : 'green'
}

export const user_categories = [
    {label : 'Under Graduate', value: 'ug'},
    {label : 'Post Graduate', value : 'pg'},
    {label : 'Academic Staff', value : 'academic_staff'},
    {label : 'Non Academic Staff', value : 'non_academic_staff'},
    {label : 'Others', value : 'others'}
]

let udusFaculties = udus;

const extractFaculties = (facultyKeys)=>{
    let resObj = [
        { label : "", value : null }
    ];

    for(let i = 0; i < facultyKeys.length; i++){
        resObj.push({
            label : facultyKeys[i],
            value : facultyKeys[i]
        });
    }

    return resObj;
}

export const user_faculties = extractFaculties(Object.keys(udusFaculties));

export const user_depts = (faculty)=>{
    if(!faculty){
        return [{ label : "", value : null }];
    }
    let depts = udusFaculties[faculty];
    
    return extractFaculties(depts);
}

export const user_levels = [
    { label : "", value : null },
    { label : "Pre Degree", value : "predegree" },
    { label : "100 Level", value : "100" },
    { label : "200 Level", value : "200" },
    { label : "300 Level", value : "300" },
    { label : "400 Level", value : "400" },
    { label : "500 Level", value : "500" },
    { label : "600 Level", value : "600" },
    { label : "Others", value : "others" }
]

export const user_filters = [
    { label : 'All', value : null },
    { label : 'Normal Users', value : 'user' },
    { label : 'Moderators', value : 'moderator' },
    { label : 'Admins', value : 'admin' },
]

export const content_filters = [
    { label : 'All', value : null },
    { label : 'Hidden', value : 'hidden' },
    { label : 'Live', value : 'live' }
]

export const request_methods = {
    POST : 'POST',
    GET : 'GET',
    PUT : 'PUT',
    PATCH : 'PATCH'
}

export const toast_types = {
    warn : 'warn',
    success : 'success',
    error : 'error'
}

export const user_roles = {
    admin : 'admin',
    user : 'user',
    mod : 'moderator'
}

export const attachment_exts = {
    image : [
        "png",
        "jpg",
        "jpeg",
        "pneg",
        "gif",
        "webp",
        "svg",
    ],
    video : [
        "mp4",
        "wmv"
    ],
    docs : [
        "doc",
        "docx",
        "pdf"
    ]
}

export const getAllExtensions = ()=>{
    let keys = Object.keys(attachment_exts);
    let allExts = [];

    for(let i = 0; i < keys.length; i++){
        allExts.push(...attachment_exts[keys[i]]);
    }

    return allExts;
}