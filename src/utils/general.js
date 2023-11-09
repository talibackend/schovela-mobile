
import RNFetchBlob from "rn-fetch-blob";

export const fileToBase64 = async (file) => {
    try{
        return await  RNFetchBlob.fs.readFile(file.uri, 'base64');
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const generateVideoPath = async (string, ext)=> {
    try{
        const filePath = `${RNFetchBlob.fs.dirs.DocumentDir}/tempVideo.${ext}`;
        await RNFetchBlob.fs.writeFile(filePath, string, 'base64');
        return filePath;
    }catch(error){
        console.log(error);
        throw error;
    }
}