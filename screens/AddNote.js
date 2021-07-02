import React from 'react';
import Block from '../components/Block';
import Text from '../components/Text';
import { theme } from '../constants';

const AddNote = ()=>{

    return(
        <Block color={theme.colors.white} >
            <Text>AddNote</Text>
        </Block>
    );
}
export default AddNote;