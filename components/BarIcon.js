import React from 'react';
import {StyleSheet} from 'react-native';
import Block from '../components/Block';
import Text from '../components/Text';
import { theme } from '../constants';
import {Clipboard, User, Calendar, Settings} from 'react-native-feather';

const BarIcon = ({icon, focused})=>{

    return(
        <Block  center middle  >
            {(focused)?(
                <Block
                    flex={false}
                    style={styles.line}
                ></Block>
            ):null}
            {(icon==="User")?(
                <User stroke={focused?theme.colors.primaryGreen: theme.colors.gray2}
                    strokeWidth={2.5}
                    height={30}
                    width={30}
                />
            ):null}
            {(icon==="Calendar")?(
                <Calendar stroke={focused?theme.colors.primaryGreen: theme.colors.gray2}
                    strokeWidth={2.5}
                    height={30}
                    width={30}
                />
            ):null}
            {(icon==="Clipboard")?(
                <Clipboard stroke={focused?theme.colors.primaryGreen: theme.colors.gray2}
                    strokeWidth={2.5}
                    height={30}
                    width={30}
                />
            ):null}
            {(icon==="Settings")?(
                <Settings stroke={focused?theme.colors.primaryGreen: theme.colors.gray2}
                    strokeWidth={2.5}
                    height={30}
                    width={30}
                />
            ):null}
        </Block>
    );
}
const styles = StyleSheet.create({
    line:{
        width: 30,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: theme.colors.primaryGreen,
        backgroundColor: theme.colors.primaryGreen,
        position: 'absolute',
        top: 0
    }
})

export default BarIcon;