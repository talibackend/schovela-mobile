
import RNFetchBlob from "rn-fetch-blob";
import { generateFilename } from "./storage";

const customDir = RNFetchBlob.dirs.DocumentDir + '/schovela-docs';

export const downloadFile = async (path, ext)=>{
    let string;

    try{
        string = await getRemoteFile(path);
    }catch(error){
        console.log(error);
        throw error;
    }

    let filename = generateFilename(ext).replace('uploads/', '');
    await RNFetchBlob.fs.writeFile(customDir + filename, string, 'base64');
    return customDir + filename;
}

export const fileToBase64 = async (file) => {
    try{
        return await RNFetchBlob.fs.readFile(file.uri, 'base64');
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const getRemoteFile = async (path)=>{
    let fullPath = path;

    try{
        const result = await RNFetchBlob.fetch('GET', fullPath);
        return result.data;
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