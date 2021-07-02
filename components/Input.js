import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import Block from './Block';
import { theme } from '../constants';
import { Eye, EyeOff } from 'react-native-feather';

const Input = ({ placeholder, placeHolderTextColor, backgroundColor, color, fontSize, autoFocus, email, number, phone, password, width, error, style, ...props }) => {


    const isSecure = password
        ? true
        : false;

    const [showEye, setShowEye] = useState(false);

    const placeholderTextColor = placeHolderTextColor ? placeHolderTextColor : theme.colors.grayFont;
    const backColor = backgroundColor ? backgroundColor : theme.colors.transparent;
    const autofocus = autoFocus ? true : false;
    const inputType = email
        ? "email-address"
        : number
            ? "numeric"
            : phone
                ? "phone-pad"
                : "default";

    function handleEyeClick() {
        setShowEye(!showEye);
    }

    

    const inputStyles = [
        styles.inputfield,
        color && { color: color },
        error && { borderColor: theme.colors.accent },
        fontSize && { fontSize: fontSize },
        { backgroundColor: backColor }
    ];

    return (
        <Block flex={false} row center style={{ ...styles.inputCont, width, backgroundColor: backColor, ...style }} >
            <TextInput
                placeholder={placeholder}
                autoFocus={autofocus}
                placeholderTextColor={placeholderTextColor}
                secureTextEntry={isSecure ? (showEye ? false : true) : false}
                style={inputStyles}
                keyboardType={inputType}
                {...props} />
            {
                isSecure ?
                    <TouchableWithoutFeedback onPress={() => handleEyeClick()}>
                        {showEye ? <Eye stroke="gray" fill="#fff0" width={25} height={25} /> :
                            <EyeOff stroke="gray" fill="#fff0" width={25} height={25} />}
                    </TouchableWithoutFeedback> :
                    null
            }
        </Block>
    );
}
const styles = StyleSheet.create({
    inputfield: {
        width: "100%",
        paddingLeft: 5
    },
    inputCont: {
        borderRadius: theme.sizes.borderRadius,
        overflow: "hidden"
    }
});
export default Input;