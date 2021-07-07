import React, { useState, useEffect, FC } from 'react'
import {
    View,
    TextInput,
    StyleSheet
} from 'react-native'

interface TextFieldProps {
    placeholder: string
    isSecure?: boolean
    onTextChange: Function
    isOtp?: boolean
}

export const TextField: FC<TextFieldProps> = ({ 
    placeholder, 
    isSecure = false, 
    onTextChange,
    isOtp =false
}) => {

    const [isPassword, setIsPassword] = useState(false)

    useEffect(() => {
        setIsPassword(isSecure)
    }, [])

    if (isOtp) {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder={placeholder}
                    autoCapitalize="none"
                    onChangeText={(text) => onTextChange(text)}
                    style={styles.otpTextField}
                    maxLength={6}
                />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder={placeholder}
                    autoCapitalize="none"
                    secureTextEntry={isPassword}
                    onChangeText={(text) => onTextChange(text)}
                    style={styles.textField}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        borderRadius: 30,
        backgroundColor: '#DBDBDB',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 20,
        paddingRight: 10
    },
    textField: {
        flex: 1,
        height: 50,
        fontSize: 20,
        color: '#000'
    },
    otpTextField: {
        flex: 1,
        height: 50,
        fontSize: 30,
        color: '#000',
        textAlign: 'center'
    }
})
