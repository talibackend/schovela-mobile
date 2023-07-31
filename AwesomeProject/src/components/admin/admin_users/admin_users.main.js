import { View, TextInput, ScrollView, Keyboard } from 'react-native';
import adminStyle from "../../../styles/admin.style";
import loginStyle from '../../../styles/login.style';
import AdminUserEachCard from './admin_users.each_card';
import { DropDownComponent } from '../../dropdown.component';
import { screenNames, user_filters } from '../../../utils/consts';
import { useState, useEffect } from 'react';
import { messages } from '../../../utils/consts';


export default AdminUsersComponent = ({ navigation }) => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [filterValue, setFilterValue] = useState('all');
    const [filterLabel, setFilterLabel] = useState('All');

    useEffect(()=>{
        for(let i = 0; i < user_filters.length; i++){
            if(user_filters[i].value == filterValue){
                setFilterLabel( user_filters[i].label);
            }
        }
    }, [filterValue]);

    const data = [
        { name: 'Femi Fatokun', image: require('../../../../assets/static/user.png'), date_joined: '23rd March, 2023', email: 'fatokunfemi03@gmail.com' },
        { name: 'Daniel Adewale', image: require('../../../../assets/static/user.png'), date_joined: '23rd March, 2023', email: 'fatokunfemi03@gmail.com' },
        { name: 'Samson Onifade', image: require('../../../../assets/static/user.png'), date_joined: '23rd March, 2023', email: 'fatokunfemi03@gmail.com' },
        { name: 'Muhammed Saliyu', image: require('../../../../assets/static/user.png'), date_joined: '23rd March, 2023', email: 'fatokunfemi03@gmail.com' },
        { name: 'Praise Babawale', image: require('../../../../assets/static/user.png'), date_joined: '23rd March, 2023', email: 'fatokunfemi03@gmail.com' },
        { name: 'Samuel Adeniyi', image: require('../../../../assets/static/user.png'), date_joined: '23rd March, 2023', email: 'fatokunfemi03@gmail.com' },
        { name: 'Mercy Taiwo', image: require('../../../../assets/static/user.png'), date_joined: '23rd March, 2023', email: 'fatokunfemi03@gmail.com' },
        { name: 'Femi Fatokun', image: require('../../../../assets/static/user.png'), date_joined: '23rd March, 2023', email: 'fatokunfemi03@gmail.com' },
    ]

    return <View style={adminStyle.main_container}>
        <DropDownComponent
            data={user_filters}
            opened={filterOpen}
            selected={filterValue}
            selectHandler={setFilterValue}
            closeHandler={()=>{ setFilterOpen(false); }}
        />
        <TextInput style={[loginStyle.input_field, adminStyle.filter_input]} onFocus={() => { return Keyboard.dismiss(); }} value={filterLabel ? filterLabel : ""} placeholder={messages.FILTER_USERS} onPressIn={() => { return setFilterOpen(true); }} readonly={true} />
        <ScrollView>
            {data.map((datum, index) => { return <AdminUserEachCard key={`admin_user_card-${index}`} name={datum.name} image={datum.image} date_joined={datum.date_joined} email={datum.email} navigation={navigation} link={screenNames.admin_dashboard_user_info} /> })}
        </ScrollView>
    </View>
}