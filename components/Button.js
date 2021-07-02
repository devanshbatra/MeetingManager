import React from 'react';
import { TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../constants';

const CustomBtn = ({
    style,
    opacity,
    color,
    underlayColor,
    startColor,
    endColor,
    flat,
    end,
    line,
    start,
    locations,
    shadow,
    width,
    children,
    gradient,
    ...props }) => {

    const buttonStyles = [
        styles.button,
        shadow && styles.shadow,
        line && styles.line,
        width && {width: width},
        flat && styles.flat,
        color && styles[color], // predefined styles colors for backgroundColor
        color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
        style
    ];


    if (line) {
        return (
            <TouchableOpacity
                style={buttonStyles}
                activeOpacity={opacity || 0.8}
                {...props}
            >
                {children}
            </TouchableOpacity>
        );
    }
    if (gradient) {
        return (
            <LinearGradient
                colors={[theme.colors.primaryLight, theme.colors.primaryDark, theme.colors.primaryDark]}
                useAngle={true}
                angle={90}
                angleCenter={{ x: 0.8, y: 0.5 }}
                style={buttonStyles}>
                <TouchableOpacity
                    activeOpacity={opacity || 0.8}
                    {...props}
                >
                    {children}
                </TouchableOpacity>
            </LinearGradient>
        );
    }
    return (
        <TouchableHighlight
            style={buttonStyles}
            underlayColor={underlayColor || theme.colors.yellow}
            {...props}  >
            {children}
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "80%",
        backgroundColor: theme.colors.primaryGreen,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    normal: {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 0
    },
    line: {
        borderColor: theme.colors.primaryGreen,
        borderWidth: 2,
        borderRadius: theme.sizes.radius,
        elevation: 0
    },
    shadow: {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2
    },
    flat: {
        elevation: 0,
        borderRadius: 0
    },
    accent: { backgroundColor: theme.colors.accent },
    primary: { backgroundColor: theme.colors.primaryGreen },
    black: { backgroundColor: theme.colors.black },
    white: { backgroundColor: theme.colors.white },
    gray: { backgroundColor: theme.colors.grayFont },
    gray2: { backgroundColor: theme.colors.gray2 },
    gray3: { backgroundColor: theme.colors.gray3 },
})

export default CustomBtn;


