import SplashScreenComponent from "../components/splashscreen.component";
import { screenNames } from "../utils/consts";

const SplashScreen = ({navigation})=>{
    setTimeout(() => {
        navigation.navigate(screenNames.home);
    }, 2000);
    return <SplashScreenComponent />;
}

export default SplashScreen;