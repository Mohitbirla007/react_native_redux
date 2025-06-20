import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export const Setting = () => {

    const navigation = useNavigation();
    return(
        <View>
            <Text>Settings</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Comment' as never)}>
                <Text>Go to Comment</Text>
            </TouchableOpacity>
        </View>
    )
} 