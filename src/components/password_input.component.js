import { TextInput, View } from "react-native";
import { messages } from "../utils/consts";
import { useState } from "react";

const PasswordInput = ({ stateUpdater, style, placeholder }) => {
    const [password, setPassword] = useState("");
    const [asterisks, setAsterisks] = useState("");

    const handlePasswordInput = (value) => {
        let formerPass = password;
        if(value.length > password.length){
            if((value.length - password.length) == 1){
                formerPass += value[value.length - 1];
            }else{
                formerPass += value;
            }
        }else{
            formerPass = formerPass.split("");
            formerPass.pop();
            formerPass = formerPass.join("");
        }
        
        setPassword(formerPass);
        stateUpdater(formerPass);
        let asterisk = "";
        for (let i = 0; i < formerPass.length; i++) {
            asterisk += "*";
        }
        setAsterisks(asterisk);
    }

    return <TextInput
                autoCapitalize="none"
                autoComplete="off"
                style={style}
                placeholderTextColor="grey"
                onChangeText={(value) => { handlePasswordInput(value) }}
                value={asterisks}
                placeholder={!placeholder ? messages.PASSWORD_PLACEHOLDER : placeholder}
            />;
}

export default PasswordInput;