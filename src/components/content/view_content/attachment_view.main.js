import { View, Text, Image, Pressable, Modal } from 'react-native';
import contentStyle from '../../../styles/content.style';
import { attachment_exts } from '../../../utils/consts';
import { IMAGE_BASE_URL } from "@env";
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from "react-native-vector-icons/Ionicons";
import { useEffect } from 'react';
import Video from 'react-native-video';
import { WebView } from 'react-native-webview';

export default AttachmentViewComponent = ({ path, ext, openFull, setOpenFull }) => {

    let url = `${IMAGE_BASE_URL}${path}`;

    useEffect(() => {
        
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
                                    <Icon style={contentStyle.modal_close_button} size={20} name="arrow-back" />
                                </View>
                            </Pressable>
                            <ImageViewer imageUrls={[{ url }]} renderIndicator={() => null} />
                        </Modal>
                    </>
                    : null
            }
            {
                attachment_exts.video.includes(ext) ?
                    <>
                        <Video style={{ height: '100%', width: '100%' }} 
                            resizeMode="cover" 
                            source={{ uri: url }} 
                            autoPlay={false}
                            onError={(e)=>{ console.log(e) }} 
                            fullscreenOrientation="landscape"
                            audio={true}
                            fullscreenAutorotate={true}
                            presentFullscreenPlayer={()=>{ this.player.presentFullscreenPlayer(); }}
                        />
                        <Modal visible={openFull}>
                            <Pressable style={contentStyle.modal_close_pressable} onPress={() => { return setOpenFull(false); }}>
                                <Text></Text>
                                <View style={contentStyle.modal_close_container}>
                                    <Icon style={contentStyle.modal_close_button} size={20} name="arrow-back" />
                                </View>
                            </Pressable>
                            <Video style={{ height: '87%', width: '100%' }} 
                                resizeMode="cover" 
                                source={{ uri: url }} 
                                controls={true} 
                                onError={(e)=>{ console.log(e) }} 
                                fullscreenOrientation="landscape"
                                audio={true}
                                fullscreenAutorotate={true}
                                presentFullscreenPlayer={()=>{ this.player.presentFullscreenPlayer(); }}
                            />
                        </Modal>
                    </>
                    : null
            }
            {
                attachment_exts.docs.includes(ext) ?
                    <>
                        <View style={{ justifyContent : "center", alignItems : "center" }}>
                            <Text style={{ fontSize : 15, color : "black" }} >Preview Not Available</Text>
                            <Text style={{ fontSize : 25, fontWeight : 'bold', color : "black" }} >Click to view</Text>
                        </View>
                        <Modal visible={openFull}>
                            <Pressable style={contentStyle.modal_close_pressable} onPress={() => { return setOpenFull(false); }}>
                                <Text></Text>
                                <View style={contentStyle.modal_close_container}>
                                    <Icon style={contentStyle.modal_close_button} size={20} name="arrow-back" />
                                </View>
                            </Pressable>
                            <WebView source={{ uri: `https://docs.google.com/gview?embedded=true&url=${url}` }} style={{ flex: 1 }} />
                        </Modal>
                    </>
                : null
            }
        </View>
    </Pressable>;
}