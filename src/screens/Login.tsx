import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, increaseCounter, setUserName } from '../redux/ReduxToolkit/store/slices/userSlice';
import CustomInput from '../components/CustomInput';

export const Login = () => {
    const [debounceText, setDebounceText] = React.useState('');
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const selector = useSelector((state: any) => state.users);
    const counterSelector = useSelector((state: any) => state.counter)
    const debounceTimeout = React.useRef<any>(null);

    const handleOnpress = () => {
        dispatch(increaseCounter())
    }
    const handleNextPress = () => {
        dispatch(fetchUser(selector.userName));
        navigation.navigate("MainApp" as never)
    }
    const handleChangeText =(text: string) => {
    dispatch(setUserName(text));
    if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        setDebounceText(text);
      }, 1000);
  
    }
    const calculate = React.useMemo(() => {
        console.log("render calculate")
        return 1 + 2
    }, []);

    return (
        <SafeAreaView style={[styles.flex1]}>
            <CustomInput label='User Name' value={selector.userName} onChangeText={handleChangeText} inputContainerStyle={styles.buttonWidth90}/>
            <Text>{debounceText}</Text>
            <CustomButton text={`Increase ${counterSelector.counter}`} handlePress={handleOnpress} buttonStyle={styles.buttonWidth40} textStyle={styles.whiteText}/>
            <CustomButton text={'Next ->'} handlePress={handleNextPress} buttonStyle={styles.buttonWidth40} textStyle={styles.whiteText}/>
            <Text style={{alignSelf: 'center'}}>{calculate}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flex1: { flex: 1 },
    inputStyle: { borderWidth: 1, height: 30, borderRadius: 5, paddingHorizontal: 5 },
    blackText: { color: 'black' },
    fontSize40: { fontSize: 40 },
    flatlistContainer: { justifyContent: 'center', alignItems: 'center', marginVertical: 30 },
    navigationButtonContainser: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', borderWidth: 1, alignSelf: 'flex-end', alignItems: 'flex-end' },
    navigationContainserLandscape: { justifyContent: 'space-around', alignItems: 'flex-end', flex: 1 },
    button: { marginVertical: 20, backgroundColor: 'gray', borderRadius: 5, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'center' },
    buttonWidth40: { width: '40%' },
    buttonWidth50: { width: '50%' },
    buttonWidth90: { width: '90%' },
    whiteText: { color: 'white' },
    centerBtnContainer: {}
})