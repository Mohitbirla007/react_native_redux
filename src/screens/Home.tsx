import React, { useEffect } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../components/CustomButton';
import { increaseCounter, decreseCounter, clearUserList } from '../redux/ReduxToolkit/store/slices/userSlice';
import { requestMultiple, PERMISSIONS, PermissionStatus, check, RESULTS, request } from 'react-native-permissions';
import { launchImageLibrary } from 'react-native-image-picker';
import { createThumbnail } from "react-native-create-thumbnail";
import ImagePicker, { Video } from "react-native-image-crop-picker";
import { generateThumbnail } from '../utils';
import DocumentPicker,{ DocumentPickerOptions } from 'react-native-document-picker';

export const Home = () => {
    const [userList, setUserList] = React.useState([]);
    const dispatch = useDispatch();
    const selector = useSelector((state: any) => state.users)
    const counterSelector = useSelector((state: any) => state.counter)

    useEffect(() => {
        setUserList(selector.userList)
    })

    const handleOnpress = () => {
        dispatch(decreseCounter())
    }
    const clearUser = () => {
        dispatch(clearUserList())
    }

    const selectFile = async () => {
        requestPermission()
        // const permission = await requestPermission()
        // if (permission) {
        //     // imagePicker();
        //     documentPicker();
        // }
    }

    const imageCropPicker = async () => {
        const fetchVideo = await ImagePicker.openPicker({
            mediaType: "video",
            multiple: true,
            compressVideoPreset: '640x480'
        })
        const videos = await Promise.all(fetchVideo.map(async (video) => {
            return {
                ...video,
                thumbnail: await generateThumbnail(video.sourceURL ?? "")
            }
        }))
        console.log("44444444444444", videos)
    }

    const documentPicker = async () => {
        try {
            const result = await DocumentPicker.pick({
              type: [DocumentPicker.types?.audio],
              allowMultiSelection:true
            });
            console.log("111111111111", result)
          } catch (error) {
             Alert.alert('User canceled document picker');
          }
    }

    const imagePicker = () => {
        launchImageLibrary({
            mediaType: 'mixed',
            includeBase64: true,
        }).then((imageLibraryResponse) => {
            if (imageLibraryResponse.assets)
                imageLibraryResponse.assets.forEach(async (item) => {
                    if (item.uri) {
                        const thumbnail = await generateThumbnail(item.uri ?? "");
                        Alert.alert("showAlert", JSON.stringify(thumbnail))
                    }
                })
        }).catch(err => console.log("22222222222", err))
    }

    const requestPermission = async () => {
        try {
            // Check both permissions
            const permissionResult = await requestMultiple([PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY]);
            const result = permissionResult["ios.permission.PHOTO_LIBRARY"] === permissionResult["ios.permission.PHOTO_LIBRARY_ADD_ONLY"] ? permissionResult["ios.permission.PHOTO_LIBRARY"] : RESULTS.DENIED;
        
            switch (result) {
              case RESULTS.UNAVAILABLE:
                console.log('Feature is not available');
                return false;
              
              case RESULTS.DENIED:
                // Request both permissions if either is denied
                const readResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
                const writeResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
                return readResult === RESULTS.GRANTED && writeResult === RESULTS.GRANTED;
              
              case RESULTS.LIMITED:
                console.log('Limited access granted');
                return true;
              
              case RESULTS.GRANTED:
                console.log('All permissions granted');
                return true;
              
              case RESULTS.BLOCKED:
                console.log('Permissions denied and not requestable anymore');
                return false;
                
              default:
                return false;
            }
          } catch (error) {
            console.error('Permission error:', error);
            return false;
          }
    }

    return (
        <SafeAreaView style={{ paddingHorizontal: 10 }}>
            <Text style={[styles.blackText, styles.marginVirticle]}>User name : {selector.userName}</Text>
            {userList && userList.map((item: any) =>
                <Text>{item.name}</Text>
            )}
            <CustomButton text={`Decrese ${counterSelector.counter}`} handlePress={handleOnpress} buttonStyle={styles.buttonWidth40} textStyle={styles.whiteText} />
            <CustomButton text={`Clear User`} handlePress={clearUser} buttonStyle={styles.buttonWidth40} textStyle={styles.whiteText} />
            <CustomButton text={"select file"} buttonStyle={styles.buttonWidth40} textStyle={styles.whiteText} handlePress={selectFile} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    blackText: { color: 'black' },
    whiteText: { color: 'white' },
    buttonWidth40: { width: '40%' },
    marginVirticle: { marginVertical: 20, }
})