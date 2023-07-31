import { View, Image } from 'react-native';
import splashscreenStyle from '../styles/splashscreen.style';

const SplashScreenComponent = ()=>{
    return <View style={splashscreenStyle.viewStyle}>
        <Image source={require('../images/logo.jpeg')} style={splashscreenStyle.logoStyle} />
    </View>;
}

export default SplashScreenComponent;