import React from "react";
import { StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Text from "./Text";
import Block from "./Block";
import Input from "./Input";
import { ChevronLeft } from 'react-native-feather';
import { theme } from '../constants';


const winHeight = Dimensions.get('window').height;
const winWidth = Dimensions.get('window').width;

const Header2 = ({back, text, style, navigation})=>{

    return(
        <Block row flex={false} space="between" padding={[25, 20, 20, 20]} color={theme.colors.primaryGreen} style={{...style}}  >

            {back?(
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={()=> navigation.goBack() }
                >
                    <Block flex={false} row  >
                        <ChevronLeft stroke={theme.colors.white} height={25} width={25} />
                        <Text h3 white bold style={{marginLeft: 10}} >{text}</Text>
                    </Block>
                </TouchableOpacity>
            ):null}

        </Block>
    );
}

export default Header2;