import { View } from "react-native";
import appStyle from "../styles/app.style";
import loginStyle from "../styles/login.style";
import SetBasicsHeader from './set_basics/set_basics.header';
import SetBasicsMain from './set_basics/set_basics.main';



export default SetBasicComponent = ({
    navigation,
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
})=>{
    return <View style={[appStyle.app_container, loginStyle.login_container]}>
        <SetBasicsHeader />
        <SetBasicsMain 
            navigation={navigation}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            dept={dept}
            setDept={setDept}
            categoryOpen={categoryOpen}
            setCategoryOpen={setCategoryOpen}
            categoryValue={categoryValue}
            setCategoryValue={setCategoryValue}
            categoryLabel={categoryLabel}
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
            categories={categories}
            faculties={faculties}
            btnHandler={btnHandler}
            loading={loading}
            levels={levels}
        />
    </View>;
}