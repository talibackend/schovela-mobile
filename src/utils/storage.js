import storage from '@react-native-firebase/storage';
import { attachment_exts, messages } from './consts';

export const uploadBase64 = async (string, ext, uploadedCountUpdater) =>{
    try{
        const ref = storage().ref(generateFilename(ext));
        const task = ref.putString(string, 'base64');
    
        task.on('state_changed', (snapshot)=>{
            let percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploadedCountUpdater(percent);
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

export const generateFilename = (ext)=>{
    return `uploads/${ext}-${new Date().getTime()}-${Math.floor(Math.random() * 100)}-${new Date().getTime() + (Math.floor(Math.random() * 100))}.${ext}`;
}
