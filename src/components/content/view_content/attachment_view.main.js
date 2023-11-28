import { View, Text, Image, Pressable, Modal } from 'react-native';
import contentStyle from '../../../styles/content.style';
import { attachment_exts } from '../../../utils/consts';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from "react-native-vector-icons/Ionicons";
import Video from 'react-native-video';
import Pdf from 'react-native-pdf';
import { fileToBase64 } from '../../../utils/general';
import { useEffect } from 'react';

export default AttachmentViewComponent = ({ local, path, ext, openFull, setOpenFull }) => {

    let url = local && attachment_exts.image.includes(ext) ? `file://${path}` : path;

    const onDocLoading = (percent)=>{
        return <View style={{ justifyContent : "center", alignItems : "center" }}>
            <Text style={{ color : 'black', fontSize : 20 }}>Loading attachment, {Math.ceil(percent * 100)}% completed</Text>
            <Text style={{ color : 'black', fontSize : 15 }}>Don't worry, we only do this once.</Text>
        </View>
    }

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
                        <View style={{ flex : 1 }}>
                            <Pdf 
                                renderActivityIndicator={(percent)=>{ return onDocLoading(percent) }} 
                                trustAllCerts={false} 
                                singlePage={true} 
                                source={{ cache : true, uri : url }} 
                                onError={(error)=>{ console.log(error); }} 
                                style={{ flex : 1 }} 
                            />
                        </View>
                        <Modal visible={openFull}>
                            <Pressable style={contentStyle.modal_close_pressable} onPress={() => { return setOpenFull(false); }}>
                                <Text></Text>
                                <View style={contentStyle.modal_close_container}>
                                    <Icon style={contentStyle.modal_close_button} size={20} name="arrow-back" />
                                </View>
                            </Pressable>
                            <Pdf 
                                renderActivityIndicator={(percent)=>{ return onDocLoading(percent) }} 
                                trustAllCerts={false} 
                                source={{ cache : true, uri : url }} 
                                onError={(error)=>{ console.log(error); }} 
                                style={{ flex : 1 }} 
                            />
                        </Modal>
                    </>
                : null
            }
        </View>
    </Pressable>;
}