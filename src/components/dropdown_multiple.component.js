import { View, Modal, Text, ScrollView, Pressable } from 'react-native';
import dropdownStyle from '../styles/dropdown.style';
import adminStyle from '../styles/admin.style';

export const MultiDropDownComponent = ({ data, opened, closeHandler }) => {
    
    return opened ? <Modal transparent={true} animationType="fade" onRequestClose={() => { console.log("Hello world..."); closeHandler(); }}>
        <View style={dropdownStyle.modal_style}>
            <View style={[dropdownStyle.scroll_view, dropdownStyle.multi_scroll_view]}>
                <ScrollView>
                    {
                        Object.keys(data).map((key)=>{
                            let datum = data[key];
                            return datum.data.map((item)=>{
                                return <View key={`dropdown-${item.value}`} style={dropdownStyle.scroll_element}>
                                    <Pressable style={dropdownStyle.scroll_pressable} onPress={() => { datum.selectHandler(item.value); closeHandler(); }}><Text style={[dropdownStyle.scroll_pressable_text, datum.selected == item.value ? dropdownStyle.selected_style : null]}>{item.label}</Text></Pressable>
                                </View>
                            })
                        })
                    }
                </ScrollView>
            </View>
        </View>
    </Modal> : null

}