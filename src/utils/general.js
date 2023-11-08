
import RNFetchBlob from "rn-fetch-blob";

export const fileToBase64 = async (file) => {
    try{
        return await  RNFetchBlob.fs.readFile(file.uri, 'base64');
    }catch(error){
        console.log(error);
        throw error;
    }
}