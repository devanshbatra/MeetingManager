import React from "react";
import { StyleSheet } from "react-native";

import Block from "./Block";
import { theme } from "../constants";

const Card = ({ color, style, children, ...props })=>{

    const cardStyles = [styles.card, style];
    return(
        <Block color={color || theme.colors.white} style={cardStyles} {...props}>
        {children}
      </Block>
    );
}

const styles = StyleSheet.create({
    card: {
      borderRadius: 15,
      padding: theme.sizes.base + 4,
      marginBottom: theme.sizes.base,
      overflow: "hidden",
      padding: 0
    }
  });

export default Card;









