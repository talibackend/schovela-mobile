import SetBasicsComponent from '../components/set_basics.component';
import { useState, useEffect } from 'react';
import { 
    api_routes, 
    messages, 
    screenNames, 
    request_methods, 
    storageKeyNames, 
    toast_types, 
    user_faculties, 
    user_levels,
    user_depts
} from "../utils/consts";
import { showToast } from '../utils/toast';
import { authRequest } from '../utils/network';
import { setItem } from '../utils/asyncStorage';

export default SetBasicsScreen = ({navigation})=>{
    const [phoneNumber, setPhoneNumber] = useState("");
    
    //Faculty States
    const [facultyOpen, setFacultyOpen] = useState(false);
    const [facultyValue, setFacultyValue] = useState(null);
    const [facultyLabel, setFacultyLabel] = useState(null);
    const faculties = user_faculties;
    //Dept States
    const [deptOpen, setDeptOpen] = useState(false);
    const [dept, setDept] = useState(null);
    const [deptLabel, setDeptLabel] = useState("");
    const depts = user_depts(facultyValue)
    //Level States
    const [levelOpen, setLevelOpen] = useState(false);
    const [levelValue, setLevelValue] = useState(null);
    const [levelLabel, setLevelLabel] = useState(null);
    const levels = user_levels;
    //Date of Birth State
    const [dateModalOpened, setDateModalOpened] = useState(false);
    const [date, setDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);

    const [loading, setLoading] = useState(false);

    const btnHandler = async ()=>{
        let body = {

        };
        if(date){
            body.dob = date;
        }
        if(dept.length > 0){
            body.department = dept;
        }
        if(categoryValue){
            let valid = false;
            for(let i = 0; i < categories.length; i++){
                if(categories[i].value == categoryValue){
                    valid = true;
                    break;
                }
            }
            if(!valid){
                showToast(toast_types.error, messages.INVALID_CATEGORY);
                return;
            }
            body.account_type = categoryValue;
        }
        if(levelValue){
            let valid = false;
            for(let i = 0; i < levels.length; i++){
                if(levels[i].value == levelValue){
                    valid = true;
                    break;
                }
            }
            if(!valid){
                showToast(toast_types.error, messages.INVALID_LEVEL);
                return;
            }
            body.level = levelValue;
        }
        if(facultyValue){
            let valid = false;
            for(let i = 0; i < faculties.length; i++){
                if(faculties[i].value == facultyValue){
                    valid = true;
                    break;
                }
            }
            if(!valid){
                showToast(toast_types.error, messages.INVALID_FACULTY);
                return;
            }
            body.faculty = facultyValue;
        }
        try{
            setLoading(true);
            const request = await authRequest(request_methods.POST, api_routes.update_user_info, body);
            if(typeof(request) == "string"){
                showToast(toast_types.error, request);
                setLoading(false);
                return;
            }
            await setItem(storageKeyNames.user, JSON.stringify({...request.user}));
            showToast(toast_types.success, messages.BASIC_INFO_SET, 3);

            if(request.user.role == user_roles.admin){
                navigation.navigate(screenNames.admin_dashboard);
            }else{
                navigation.navigate(screenNames.user_home, { allowBack : false, title : "Home" });
            }
            
        }catch(error){
            console.log(error);
            showToast(toast_types.error, error)
        }
        setLoading(false)
    }
    

    const maxDateCalculation = () => {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth();
        let day = today.getDate();
        return new Date(year - 16, month, day);
    }

    useEffect(()=>{
        setMaxDate(maxDateCalculation());
    }, []);
    
    useEffect(() => {
        for(let i = 0; i < faculties.length; i++){
            let faculty = faculties[i];
            if(faculty.value == facultyValue){
                setFacultyLabel(faculty.label);
                setDeptLabel(user_depts(facultyValue)[0].label);
            }
        }
    }, [facultyValue]);

    useEffect(() => {
        for (let i = 0; i < user_depts(facultyValue).length; i++) {
            if (user_depts(facultyValue)[i].value == dept) {
                setDeptLabel(user_depts(facultyValue)[i].label);
            }
        }
    }, [dept])
    
    useEffect(() => {
        for(let i = 0; i < levels.length; i++){
            let level = levels[i];
            if(level.value == levelValue){
                setLevelLabel(level.label);
            }
        }
    }, [levelValue]);

    return <SetBasicsComponent 
        navigation={navigation} 
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        dept={dept}
        setDept={setDept}
        deptOpen={deptOpen}
        setDeptOpen={setDeptOpen}
        deptLabel={deptLabel}
        depts={depts}
        facultyOpen={facultyOpen}
        setFacultyOpen={setFacultyOpen}
        facultyValue={facultyValue}
        setFacultyValue={setFacultyValue}
        facultyLabel={facultyLabel}
        levelOpen={levelOpen}
        setLevelOpen={setLevelOpen}
        levelValue={levelValue}
        setLevelValue={setLevelValue}
        levelLabel={levelLabel}
        dateModalOpened={dateModalOpened}
        setDateModalOpened={setDateModalOpened}
        date={date}
        setDate={setDate}
        maxDate={maxDate}
        faculties={faculties}
        btnHandler={btnHandler}
        loading={loading}
        levels={levels}
    />
}