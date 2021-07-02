import React from 'react';
import Block from '../components/Block';
import Text from '../components/Text';
import { theme } from '../constants';

const AddReminder = ()=>{

    return(
        <Block color={theme.colors.white} >
            <Text>AddReminder</Text>
        </Block>
    );
}
export default AddReminder;