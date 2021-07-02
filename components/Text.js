// just copy this code from the driving repo :)
import React from "react";
import { Text, StyleSheet } from "react-native";

import { theme } from "../constants";

const CustText=({h1, h2, h3, h4, h5, title, body, caption, date, size, transform, align, weight, height, regular, bold, semibold, center, right, color, primary, black, white, gray, gray2, gray3, tomato, style, children, ...props})=>{


    const textStyles = [
        styles.text,
        h1 && styles.h1,
        h2 && styles.h2,
        h3 && styles.h3,
        h4 && styles.h4,
        h5 && styles.h5,
        title && styles.title,
        body && styles.body,
        caption && styles.caption,
        date && styles.date,
        size && { fontSize: size },
        transform && { textTransform: transform },
        align && { textAlign: align },
        weight && { fontWeight: weight },
        height && { lineHeight: height },
        regular && styles.regular,
        bold && styles.bold,
        semibold && styles.semibold,
        center && styles.center,
        right && styles.right,
        color && styles[color],
        color && !styles[color] && { color },
        // color shortcuts
        black && styles.black,
        white && styles.white,
        primary && styles.primary,
        gray && styles.gray,
        gray2 && styles.gray2,
        gray3 && styles.gray3,
        tomato && styles.tomato,
        style // rewrite predefined styles
      ];

    return (
        <Text style={textStyles} {...props}>
          {children}
        </Text>
      );


}
const styles = StyleSheet.create({
    // default style
    text: {
      fontSize: theme.sizes.font,
      color: theme.colors.black
    },
    // variations
    regular: {
      fontWeight: "normal"
    },
    bold: {
        fontWeight: "bold"
    },
    semibold: {
      fontWeight: "600"
    },
    // position
    center: { textAlign: "center" },
    right: { textAlign: "right" },
    // colors
    primary: { color: theme.colors.primaryGreen },
    black: { color: theme.colors.black },
    white: { color: theme.colors.white },
    gray: { color: theme.colors.grayFont },
    gray2: { color: theme.colors.gray2 },
    gray3: { color: theme.colors.gray3 },
    tomato: { color: theme.colors.tomato },
    // fonts
    h1: theme.fonts.h1,
    h2: theme.fonts.h2,
    h3: theme.fonts.h3,
    h4: theme.fonts.h4,
    h5: theme.fonts.h5,
    title: theme.fonts.title,
    body: theme.fonts.body,
    caption: theme.fonts.caption,
    date: theme.fonts.date
  });

export default CustText;


