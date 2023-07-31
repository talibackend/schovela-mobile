import Toast from 'react-native-toast-message';

export const showToast = (type, message, seconds)=>{
    Toast.show({
        type,
        text1: message,
        visibilityTime : seconds ? seconds * 1000 : 3000,
        autoHide : true,
        position : 'top'
      });
}