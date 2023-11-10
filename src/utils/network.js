// import fetch from "node-fetch";
import { messages, screenNames, storageKeyNames } from "./consts";
import { deleteItem, getItem } from "./asyncStorage";
import {API_BASEURL} from "@env";
import { navigate } from "./navigate";

export const openRequest = async (method, url, body=false, additionalHeaders=false) => {
    const controller = new AbortController();
    const { signal } = controller;
    const options = {
        method,
        signal
    };
    if(body){
        options.body = JSON.stringify(body);
    }
    options.headers = {
        'Content-Type' : 'application/json'
    };
    if(additionalHeaders){
        options.headers = {...options.headers, ...additionalHeaders}
    }
    let timeout = setTimeout(()=>{ controller.abort(); return messages.NETWORK_ERROR }, 5 * 60 * 1000);
    try{
        console.log(`${API_BASEURL}${url}`);
        console.log(options);
        const request = await fetch(`${API_BASEURL}${url}`, options);
        const response = await request.json();
        console.log(response);
        clearTimeout(timeout);
        if(response.ok != true){
            if(response.status == 401 || response.status == 403){
                await deleteItem(storageKeyNames.user);
                await deleteItem(storageKeyNames.accessToken);
                navigate(screenNames.login);
            }
            return response.message;
        }
        return response.body;
    }catch(error){
        clearTimeout(timeout);
        console.error(error);
        throw messages.NETWORK_ERROR;
    }
}

export const authRequest = async (method, url, body=false, additionalHeaders=false)=>{
    try{
        let headers = {
            'Authorization' : `Bearer ${await getItem(storageKeyNames.accessToken)}`,
        };
        if(additionalHeaders){
            headers = {...headers, ...additionalHeaders};
        }
        return openRequest(method, url, body, headers);
    }catch(error){
        throw error;
    }
}