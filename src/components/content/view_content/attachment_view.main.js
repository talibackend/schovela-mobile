import { View, Text } from 'react-native';
import contentStyle from '../../../styles/content.style';
import { attachment_exts } from '../../../utils/consts';
import { Image } from 'react-native-svg';
import {IMAGE_BASE_URL} from "@env";

export default AttachmentViewComponent = ({ path, ext })=>{

    console.log(`${IMAGE_BASE_URL}${path}`);
    console.log(ext);
    return <View style={[contentStyle.create_content_upload_section, contentStyle.view_content_attachment_preview]}>
        {
            attachment_exts.image.includes(ext) ?
            <>
            <Image 
                style={{ height : 100, width : 100 }}
                source={{ uri : `${IMAGE_BASE_URL}${path}` }}
                resizeMode="cover"
            />
            </>
            : null
        }
    </View>;
}