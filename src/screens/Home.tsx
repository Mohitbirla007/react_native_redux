import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../components/CustomButton';
import { increaseCounter, decreseCounter, clearUserList } from '../redux/ReduxToolkit/store/slices/userSlice';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import { launchImageLibrary } from 'react-native-image-picker';

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

    const selectFile = () => {
        requestPermission()
    }

    const requestPermission = () => {
        requestMultiple([PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.MEDIA_LIBRARY]).then(result => {
            if(result['ios.permission.MEDIA_LIBRARY'] === 'granted' && result['ios.permission.PHOTO_LIBRARY'] === 'granted') {
                launchImageLibrary({
                    mediaType: 'mixed',
                    includeBase64: true,
                }).then((imageLibraryResponse) => {
                    if(imageLibraryResponse.assets)
                    imageLibraryResponse.assets.forEach((item) => {
                        console.log("2222222222222222", item.uri)
                    })
                }).catch(err => console.log("22222222222", err))
            }
        })
    }

    return (
        <SafeAreaView style={{paddingHorizontal: 10}}>
            <Text style={[styles.blackText, styles.marginVirticle]}>User name : {selector.userName}</Text>
            {userList && userList.map((item: any) =>
                <Text>{item.name}</Text>
            )}
            <CustomButton text={`Decrese ${counterSelector.counter}`} handlePress={handleOnpress} buttonStyle={styles.buttonWidth40} textStyle={styles.whiteText} />
            <CustomButton text={`Clear User`} handlePress={clearUser} buttonStyle={styles.buttonWidth40} textStyle={styles.whiteText} />
            <CustomButton text={"select file"} buttonStyle={styles.buttonWidth40} textStyle={styles.whiteText} handlePress={selectFile}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    blackText: { color: 'black' },
    whiteText: { color: 'white' },
    buttonWidth40: { width: '40%' },
    marginVirticle: {marginVertical: 20,}
})