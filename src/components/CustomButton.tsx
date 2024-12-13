import React from 'react'
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'

interface ButtonProps {
    handlePress?: () => void;
    text: string;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle; 
}

const CustomButton = (props: ButtonProps) => {
    return (
        <TouchableOpacity onPress={props.handlePress} style={[styles.buttonContainer, props.buttonStyle]}>
            <Text style={[styles.blackText, props.textStyle]}>{props.text}</Text>
        </TouchableOpacity>
    )
}
export default CustomButton;

const styles = StyleSheet.create({
    buttonContainer: { marginVertical: 20, backgroundColor: 'gray', borderRadius: 5, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'center' },
    blackText: {color: 'black'}
})