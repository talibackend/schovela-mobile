import { View, Text, Image, Pressable, Modal } from 'react-native';
import contentStyle from '../../../styles/content.style';
import { attachment_exts } from '../../../utils/consts';
import {IMAGE_BASE_URL} from "@env";
import ImageViewer from 'react-native-image-zoom-viewer';
import { useEffect, useState } from 'react';

export default AttachmentViewComponent = ({ path, ext, openFull, setOpenFull })=>{
    
    let url = `${IMAGE_BASE_URL}${path}`;
    
    return <Pressable onPress={()=>{ return setOpenFull(true) }}>
        <View style={[contentStyle.create_content_upload_section, contentStyle.view_content_attachment_preview]}>
        
            {
                attachment_exts.image.includes(ext) ?
                <Image 
                    style={{ height : '100%', width : '100%' }}
                    source={{ uri : url }}
                    resizeMode='cover'
                />
                : null
            }
            {
                attachment_exts.image.includes(ext) && openFull ?
                <Modal visible={true} transparent={true}>
                    <ImageViewer imageUrls={[ { url } ]}/>
                </Modal> : null
            }
            </View>
        </Pressable>;
}