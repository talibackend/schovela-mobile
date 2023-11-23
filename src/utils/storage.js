import storage from '@react-native-firebase/storage';
import { messages } from './consts';

export const uploadBase64 = async (string, filename, uploadedCountUpdater) =>{
    const ref = storage().ref(filename);
    const task = ref.putString(string, 'base64');

    task.on('state_changed', (snapshot)=>{
        uploadedCountUpdater(snapshot.bytesTransferred)
    });

    try{
        await task;
        return ref.getDownloadURL();
    }catch(error){
        console.log(error); 
        throw messages.APP_ERROR; 
    }
}

