import storage from '@react-native-firebase/storage';
import { messages } from './consts';

export const uploadBase64 = async (string, filename, uploadedCountUpdater) =>{
    try{
        const ref = storage().ref(filename);
        const task = ref.putString(string, 'base64');
    
        task.on('state_changed', (snapshot)=>{
            console.log(snapshot.bytesTransferred);
            console.log(snapshot.totalBytes);
            let percent = Math.ceil(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploadedCountUpdater(percent != "NaN" ? percent : 0);
        });
        await task;
        return await ref.getDownloadURL();
    }catch(error){
        console.log(error); 
        throw messages.APP_ERROR; 
    }
}

export const getFileUrl = async (path) =>{
    if(path.startsWith('https://')){
        return path;
    }else{
        const ref = storage().ref('uploads/'+path);
        return await ref.getDownloadURL();
    }
}

