import React, { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';

interface containerStyle {
    marginTop: number
}

interface InputProps {
    isSecure?: boolean,
    containerStyle?: containerStyle,
    defaultText?: string,
    placeHolder?: string,
    keyboardType?: KeyboardTypeOptions
}

const MInput = forwardRef((props: InputProps, ref: any) => {

    const { isSecure, containerStyle, keyboardType } = props;


    const [text, setText] = useState(props?.defaultText ?? '');

    useImperativeHandle(ref, () => ({
        getText: () => {
            return text;
        },
        resetText: () => {
            setText('');
        }
    }), [text]);


    return (
        <View ref={ref} style={[containerStyle && containerStyle]}>
            <TextInput
                secureTextEntry={
                    isSecure || MInput.defaultProps?.isSecure
                }
                placeholder={props?.placeHolder ?? ''}
                style={styles.input}
                value={text}
                keyboardType={keyboardType}
                onChangeText={(value: string) => { setText(value) }}
            />
        </View>
    )
});

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 5,
        fontSize: 16,
        minHeight: 40,
        paddingHorizontal: 10
    }
});

MInput.defaultProps = {
    isSecure: false,
    containerStyle: {
        marginTop: 0
    }
}

export default MInput;
