import loginStyle from "../../styles/login.style";
import { View, TextInput, Keyboard } from 'react-native';
import { messages } from "../../utils/consts";
import DateTimePicker from '@react-native-community/datetimepicker';
import LoginButton from "../login/login.button";
import { DropDownComponent } from "../dropdown.component";

export default SetBasicsMainComponent = ({ 
        phoneNumber, setPhoneNumber,
        dept, setDept,
        categoryOpen, setCategoryOpen,
        categoryValue, setCategoryValue,
        categoryLabel,
        facultyOpen, setFacultyOpen,
        facultyValue, setFacultyValue,
        facultyLabel,
        levelOpen, setLevelOpen,
        levelValue, setLevelValue,
        levelLabel,
        dateModalOpened, setDateModalOpened,
        date, setDate,
        maxDate,
        categories,
        faculties,
        levels,
        btnHandler,
        loading
    }) => {
    
    return <View style={loginStyle.input_wrapper}>
        <TextInput style={loginStyle.input_field} value={phoneNumber} placeholder={messages.PHONE_NUMBER} onChangeText={(value) => { return setPhoneNumber(value); }} autoComplete='name' autoCorrect={true} />
        <TextInput style={loginStyle.input_field} onFocus={() => { return Keyboard.dismiss(); }} value={date} onPressIn={() => { return setDateModalOpened(true); }} placeholder={messages.DOB} readonly={true} />
        <TextInput style={loginStyle.input_field} onFocus={() => { return Keyboard.dismiss(); }} value={categoryLabel ? categoryLabel : ""} placeholder={messages.SELECT_CATEGORY} onPressIn={() => { return setCategoryOpen(true); }} readonly={true} />
        <TextInput style={loginStyle.input_field} onFocus={() => { return Keyboard.dismiss(); }} value={facultyLabel ? facultyLabel : ""} placeholder={messages.SELECT_FACULTY} onPressIn={() => { return setFacultyOpen(true); }} readonly={true} />
        <TextInput style={loginStyle.input_field} onFocus={() => { return Keyboard.dismiss(); }} value={levelLabel ? levelLabel : ""} placeholder={messages.SELECT_LEVEL} onPressIn={() => { return setLevelOpen(true); }} readonly={true} />
        <TextInput style={loginStyle.input_field} value={dept} placeholder={messages.DEPT} onChangeText={(value) => { return setDept(value); }} autoComplete='name' autoCorrect={true} />
        {
            dateModalOpened ?
                <DateTimePicker mode="date" maximumDate={maxDate} value={maxDate} onChange={(e, date) => { setDateModalOpened(false); return setDate((new Date(date)).toDateString()); }} /> : null
        }
        <DropDownComponent 
            opened={categoryOpen} 
            data={categories} 
            selected={categoryValue}
            selectHandler={setCategoryValue}
            closeHandler={()=>{ setCategoryOpen(false); }}
        />
        <DropDownComponent 
            opened={facultyOpen} 
            data={faculties} 
            selected={facultyValue}
            selectHandler={setFacultyValue}
            closeHandler={()=>{ setFacultyOpen(false); }}
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