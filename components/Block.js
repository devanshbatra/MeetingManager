import React from "react";
import { StyleSheet, View, Animated, TouchableWithoutFeedback, TouchableOpacity, StatusBar, SafeAreaView } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

import { theme } from "../constants";

export default function Block({
    flex,
    row,
    column,
    center,
    middle,
    left,
    right,
    top,
    bottom,
    card,
    shadow,
    color,
    space,
    padding,
    margin,
    animated,
    wrap,
    gradient,
    clickable,
    style,
    children,
    onClick,
    ...props }) {

    function handleMargins() {
        if (typeof (margin) === "number") {
            return {
                marginTop: margin,
                marginRight: margin,
                marginBottom: margin,
                marginLeft: margin
            };
        }

        if (typeof (margin) === "object") {
            const marginSize = Object.keys(margin).length;
            switch (marginSize) {
                case 1:
                    return {
                        marginTop: margin[0],
                        marginRight: margin[0],
                        marginBottom: margin[0],
                        marginLeft: margin[0]
                    };
                case 2:
                    return {
                        marginTop: margin[0],
                        marginRight: margin[1],
                        marginBottom: margin[0],
                        marginLeft: margin[1]
                    };
                case 3:
                    return {
                        marginTop: margin[0],
                        marginRight: margin[1],
                        marginBottom: margin[2],
                        marginLeft: margin[1]
                    };
                default:
                    return {
                        marginTop: margin[0],
                        marginRight: margin[1],
                        marginBottom: margin[2],
                        marginLeft: margin[3]
                    };
            }
        }
    }

    function handlePaddings() {
        if (typeof padding === "number") {
            return {
                paddingTop: padding,
                paddingRight: padding,
                paddingBottom: padding,
                paddingLeft: padding
            };
        }

        if (typeof padding === "object") {
            const paddingSize = Object.keys(padding).length;
            switch (paddingSize) {
                case 1:
                    return {
                        paddingTop: padding[0],
                        paddingRight: padding[0],
                        paddingBottom: padding[0],
                        paddingLeft: padding[0]
                    };
                case 2:
                    return {
                        paddingTop: padding[0],
                        paddingRight: padding[1],
                        paddingBottom: padding[0],
                        paddingLeft: padding[1]
                    };
                case 3:
                    return {
                        paddingTop: padding[0],
                        paddingRight: padding[1],
                        paddingBottom: padding[2],
                        paddingLeft: padding[1]
                    };
                default:
                    return {
                        paddingTop: padding[0],
                        paddingRight: padding[1],
                        paddingBottom: padding[2],
                        paddingLeft: padding[3]
                    };
            }
        }
    }


    const blockStyles = [
        styles.block,
        flex && { flex: 1 },
        flex === false && { flex: 0 }, // reset / disable flex
        row && styles.row,
        column && styles.column,
        center && styles.center,
        middle && styles.middle,
        left && styles.left,
        right && styles.right,
        top && styles.top,
        bottom && styles.bottom,
        margin && { ...handleMargins() },
        padding && { ...handlePaddings() },
        card && styles.card,
        shadow && styles.shadow,
        space && { justifyContent: `space-${space}` },
        wrap && { flexWrap: "wrap" },
        color && styles[color], // predefined styles colors for backgroundColor
        color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
        style // rewrite predefined styles
    ];

    if (animated) {
        return (
            <Animated.View style={blockStyles} {...props}>
                {children}
            </Animated.View>
        );
    }
    if (gradient) {
        return (
            <LinearGradient
                colors={[theme.colors.primaryGreen, theme.colors.primaryGreen,  "#32e099"]}
                // useAngle={true}
                // angle={125}
                // angleCenter={{ x: 0.5, y: 0.5 }}
                locations= {[0, 0.5, 0.9]}
                style={blockStyles}>
                {children}
            </LinearGradient>
        );
    }

    if (clickable) {
        return (
            <TouchableWithoutFeedback onPress={onClick} >
                <View style={blockStyles} {...props}>
                    {children}
                </View>
            </TouchableWithoutFeedback>
        )
    }
    return (

        <View style={blockStyles} {...props}>
            {children}
        </View>

    );
}

const styles = StyleSheet.create({
    block: {
        flex: 1
    },
    row: {
        flexDirection: "row"
    },
    column: {
        flexDirection: "column"
    },
    card: {
        borderRadius: theme.sizes.radius
    },
    center: {
        alignItems: "center"
    },
    middle: {
        justifyContent: "center"
    },
    left: {
        justifyContent: "flex-start"
    },
    right: {
        justifyContent: "flex-end"
    },
    top: {
        justifyContent: "flex-start"
    },
    bottom: {
        justifyContent: "flex-end"
    },
    shadow: {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 13,
        elevation: 3
    },
    accent: { backgroundColor: theme.colors.accent },
    primary: { backgroundColor: theme.colors.primaryGreen },
    //   secondary: { backgroundColor: theme.colors.secondary },
    //   tertiary: { backgroundColor: theme.colors.tertiary },
    black: { backgroundColor: theme.colors.black },
    white: { backgroundColor: theme.colors.white },
    gray: { backgroundColor: theme.colors.grayFont },
    gray2: { backgroundColor: theme.colors.gray2 },
    safeAreaStyle: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    }
});

