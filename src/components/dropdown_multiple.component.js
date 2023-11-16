import { View, Modal, Text, ScrollView, Pressable } from 'react-native';
import dropdownStyle from '../styles/dropdown.style';
import LoginButton from './login/login.button';

export const MultiDropDownComponent = ({ data, opened, closeHandler }) => {
    
    return opened ? <Modal transparent={true} animationType="fade" onRequestClose={() => { console.log("Hello world..."); closeHandler(); }}>
        <View style={dropdownStyle.modal_style}>
            <View style={[dropdownStyle.scroll_view, dropdownStyle.multi_scroll_view]}>
                <ScrollView>
                    {
                        Object.keys(data).map((key)=>{
                            let datum = data[key];
                            return datum.data.map((item, i)=>{
                                return <View key={`dropdown-${item.value}`} style={[dropdownStyle.scroll_element]}>
                                    <Pressable onPress={() => { datum.selectHandler(item.value); }}><Text style={[dropdownStyle.scroll_pressable_text, i == 0 ? dropdownStyle.main_label : null, datum.selected == item.value ? dropdownStyle.selected_style : null]}>{i == 0 ? datum.label : item.label}</Text></Pressable>
                                </View>
                            })
                        })
                    }
                    <View>
                        <LoginButton 
                            name="Apply"
                            action={()=>{ closeHandler(); }}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    </Modal> : null

}