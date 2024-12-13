import React from 'react'
import { StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from 'react-native'

interface CustomInputProps {
    value: string,
    label: string,
    onChangeText: (value: string) => void,
    inputContainerStyle?: ViewStyle,
    style?: ViewStyle,
    labelStyle?: TextStyle
}

const CustomInput = (props: CustomInputProps) => {
    return (
        <View style={[styles.inputContainerStyle,props.inputContainerStyle]}>
            <Text style={[styles.lebelText, props.labelStyle]}>{props.label}</Text>
            <TextInput value={props.value} onChangeText={props.onChangeText} style={[styles.inputStyle, props.style]} />
        </View>
    )
}

export default CustomInput;

const styles = StyleSheet.create({
    inputContainerStyle: {marginHorizontal: 10, marginVertical: 10},
    inputStyle: { height: 40, paddingHorizontal: 10, borderRadius: 5, borderWidth: 1, borderColor: 'blue'},
    lebelText: {lineHeight: 30}
})