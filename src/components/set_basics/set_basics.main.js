import loginStyle from "../../styles/login.style";
import { View, TextInput, Keyboard } from 'react-native';
import { messages } from "../../utils/consts";
import DateTimePicker from '@react-native-community/datetimepicker';
import LoginButton from "../login/login.button";
import { DropDownComponent } from "../dropdown.component";

export default SetBasicsMainComponent = ({ 
        phoneNumber, setPhoneNumber,
        dept, setDept,
        deptOpen, setDeptOpen,
        deptLabel,
        facultyOpen, setFacultyOpen,
        facultyValue, setFacultyValue,
        facultyLabel,
        levelOpen, setLevelOpen,
        levelValue, setLevelValue,
        levelLabel,
        dateModalOpened, setDateModalOpened,
        date, setDate,
        maxDate,
        faculties,
        depts,
        levels,
        btnHandler,
        loading
    }) => {
    
    return <View style={loginStyle.input_wrapper}>
        <TextInput  placeholderTextColor="grey" style={loginStyle.input_field} value={phoneNumber} placeholder={messages.PHONE_NUMBER} onChangeText={(value) => { return setPhoneNumber(value); }} autoComplete='name' autoCorrect={true} />
        <TextInput placeholderTextColor="grey" style={loginStyle.input_field} onFocus={() => { return Keyboard.dismiss(); }} value={date} onPressIn={() => { return setDateModalOpened(true); }} placeholder={messages.DOB} readonly={true} />
        <TextInput placeholderTextColor="grey" style={loginStyle.input_field} onFocus={() => { return Keyboard.dismiss(); }} value={levelLabel ? levelLabel : ""} placeholder={messages.SELECT_LEVEL} onPressIn={() => { return setLevelOpen(true); }} readonly={true} />
        <TextInput placeholderTextColor="grey" style={loginStyle.input_field} onFocus={() => { return Keyboard.dismiss(); }} value={facultyLabel ? facultyLabel : ""} placeholder={messages.SELECT_FACULTY} onPressIn={() => { return setFacultyOpen(true); }} readonly={true} />
        <TextInput placeholderTextColor="grey" style={loginStyle.input_field} onFocus={() => { return Keyboard.dismiss(); }} value={deptLabel ? deptLabel : ""} placeholder={messages.SELECT_DEPT} onPressIn={() => { return setDeptOpen(true); }} readonly={true} />
        {
            dateModalOpened ?
                <DateTimePicker mode="date" maximumDate={maxDate} value={maxDate} onChange={(e, date) => { setDateModalOpened(false); return setDate((new Date(date)).toDateString()); }} /> : null
        }
        <DropDownComponent 
            opened={facultyOpen} 
            data={faculties} 
            selected={facultyValue}
            selectHandler={setFacultyValue}
            closeHandler={()=>{ setFacultyOpen(false); }}
        />
        
        <DropDownComponent 
            opened={deptOpen} 
            data={depts} 
            selected={dept}
            selectHandler={setDept}
            closeHandler={()=>{ setDeptOpen(false); }}
        />

        <DropDownComponent 
            opened={levelOpen} 
            data={levels} 
            selected={levelValue}
            selectHandler={setLevelValue}
            closeHandler={()=>{ setLevelOpen(false); }}
        />
        <LoginButton loading={loading} name={messages.COMPLETE} action={() => { btnHandler(); }} />
    </View>
}