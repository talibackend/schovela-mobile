import { useEffect } from 'react';
import { TextInput, View, Modal, Text, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import dropdownStyle from '../styles/dropdown.style';

export const DropDownComponent = ({ data, opened, selected, selectHandler, closeHandler }) => {
    
    return opened ? <Modal transparent={true} animationType="fade" onRequestClose={() => { console.log("Hello world..."); closeHandler(); }}>
        <View style={dropdownStyle.modal_style}>
            <View style={dropdownStyle.scroll_view}>
                <ScrollView>
                    {
                        data.map((item) => {
                            return <View key={`dropdown-${item.value}`} style={dropdownStyle.scroll_element}>
                                <Pressable style={dropdownStyle.scroll_pressable} onPress={() => { selectHandler(item.value); closeHandler(); }}><Text style={[dropdownStyle.scroll_pressable_text, selected == item.value ? dropdownStyle.selected_style : null]}>{item.label}</Text></Pressable>
                            </View>
                        })
                    }
                </ScrollView>
            </View>
        </View>
    </Modal> : null

}