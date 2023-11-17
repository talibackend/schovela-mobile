import { TextInput, View } from "react-native";
import { messages } from "../utils/consts";
import { useState } from "react";

const PasswordInput = ({ stateUpdater, style, placeholder }) => {
    const [_password, _setPassword] = useState("");
    const [asterisks, setAsterisks] = useState("");

    const handlePasswordInput = (value) => {
        let formerPass = _password;
        if(value.length > _password.length){
            formerPass = value;
        }else{
            formerPass = formerPass.split("");
            formerPass.pop();
            formerPass = formerPass.join("");
        }
        
        _setPassword(formerPass);
        stateUpdater(formerPass);
        let asterisk = "";
        for (let i = 0; i < formerPass.length; i++) {
            asterisk += "*";
        }
        setAsterisks(asterisk);
    }

    useState(()=>{
        console.log("Not changed...");
        console.log(_password);
    }, [_password]);

    return <TextInput
                autoCapitalize="none"
                style={style}
                placeholderTextColor="grey"
                onChangeText={(value) => { return handlePasswordInput(value) }}
                value={asterisks}
                placeholder={!placeholder ? messages.PASSWORD_PLACEHOLDER : placeholder}
            />;
}

export default PasswordInput;