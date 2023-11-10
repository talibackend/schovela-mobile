import { View, Text, Image, Pressable, Modal } from 'react-native';
import contentStyle from '../../../styles/content.style';
import { attachment_exts } from '../../../utils/consts';
import { IMAGE_BASE_URL } from "@env";
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from "react-native-vector-icons/Ionicons";
import { useEffect } from 'react';

export default AttachmentViewComponent = ({ path, ext, openFull, setOpenFull }) => {

    let url = `${IMAGE_BASE_URL}${path}`;

    useEffect(() => {
        console.log(openFull);
    })

    return <Pressable onPress={() => { return setOpenFull(true) }}>
        <View style={[contentStyle.create_content_upload_section, contentStyle.view_content_attachment_preview]}>

            {
                attachment_exts.image.includes(ext) ?
                    <>
                        <Image
                            style={{ height: '100%', width: '100%' }}
                            source={{ uri: url }}
                            resizeMode='cover'
                        />
                        <Modal visible={openFull}>
                            <Pressable style={contentStyle.modal_close_pressable} onPress={() => { return setOpenFull(false); }}>
                                <Text></Text>
                                <View style={contentStyle.modal_close_container}>
                                    {/* <Text  style={contentStyle.modal_close_button}>x</Text> */}
                                    <Icon style={contentStyle.modal_close_button} size={20} name="arrow-back" />
                                </View>
                            </Pressable>
                            <ImageViewer imageUrls={[{ url }]} renderIndicator={() => null} />
                        </Modal>
                    </>
                    : null
            }
        </View>
    </Pressable>;
}