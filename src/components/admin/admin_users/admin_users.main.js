import { View, TextInput, ScrollView, Keyboard, Text, ActivityIndicator } from 'react-native';
import adminStyle from "../../../styles/admin.style";
import loginStyle from '../../../styles/login.style';
import AdminUserEachCard from './admin_users.each_card';
import { DropDownComponent } from '../../dropdown.component';
import { screenNames, user_filters } from '../../../utils/consts';
import { useState } from 'react';
import { messages } from '../../../utils/consts';
import { RefreshControl } from 'react-native';


export default AdminUsersComponent = ({ loadHandler, navigation, loading, handleScroll, filterLabel, role, setRole, users }) => {
    const [filterOpen, setFilterOpen] = useState(false);
    const data = users.map((user) => {
        return {
            id: user.id,
            name: user.fullname,
            image: require('../../../../assets/static/user.png'),
            date_joined: (new Date(`${user.createdAt}`)).toDateString(),
            email: user.email
        }
    })

    return <View style={adminStyle.main_container}>
        <DropDownComponent
            data={user_filters}
            opened={filterOpen}
            selected={role}
            selectHandler={setRole}
            closeHandler={() => { setFilterOpen(false); }}
        />
        <TextInput style={[loginStyle.input_field, adminStyle.filter_input]} onFocus={() => { return Keyboard.dismiss(); }} value={filterLabel ? filterLabel : ""} placeholder={messages.FILTER_USERS} onPressIn={() => { return setFilterOpen(true); }} readonly={true} />
        <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={loadHandler} />} scrollEventThrottle={100} onScroll={({ nativeEvent }) => { handleScroll(nativeEvent); }}>
            {
                data.length == 0 && !loading ? <View style={{ paddingTop: 20 }}>
                    <Text style={{ textAlign : 'center', color : "black" }}>{messages.NO_RECORDS}</Text>
                </View> : null
            }
            {
                data.length == 0 && !loading ? <View style={{ paddingTop: 20 }}>
                    <Text style={{ textAlign : 'center' }}>{messages.NO_RECORDS}</Text>
                </View> : null
            }
            {data.map((datum, index) => { return <AdminUserEachCard key={`admin_user_card-${index}`} id={datum.id} name={datum.name} image={datum.image} date_joined={datum.date_joined} email={datum.email} navigation={navigation} link={screenNames.admin_dashboard_user_info} /> })}
        </ScrollView>
    </View>
}