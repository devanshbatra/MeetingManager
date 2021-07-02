import React from 'react';
import Block from '../components/Block';
import Text from '../components/Text';
import Card from '../components/Card';
import Header from '../components/Header';
import { theme, mocks } from '../constants';
import { ScrollView, TouchableOpacity } from 'react-native';

const Profile = ()=>{

    return(
        <Block color={theme.colors.offWhite} >
            <Header screenName="profile" />
            <Block>
                <ScrollView 
                    contentContainerStyle={{paddingTop: 20, paddingBottom: 70}}
                    showsVerticalScrollIndicator={false}
                >
                    <Card flex={false} margin={[10, 20]} row space="between" padding={[20, 15]} shadow >
                        <Text primary bold >Reminders Created</Text>
                        <Text gray bold >{mocks.reminders.length}</Text>
                    </Card>
                    <Card flex={false} margin={[10, 20]} row space="between" padding={[20, 15]} shadow >
                        <Text primary bold >Notes Saved</Text>
                        <Text gray bold >{mocks.notes.length}</Text>
                    </Card>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={()=> console.log('pressed') }
                    >
                        <Card flex={false} margin={[10, 20]} padding={[20, 15]} shadow >
                            <Text primary bold >Back up app data</Text>
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={()=> console.log('pressed') }
                    >
                        <Card flex={false} margin={[10, 20]} padding={[20, 15]} shadow >
                            <Text primary bold >Add Backup Account</Text>
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={()=> console.log('pressed') }
                    >
                        <Card flex={false} margin={[10, 20]} padding={[20, 15]} shadow >
                            <Text primary bold >Logout</Text>
                        </Card>
                    </TouchableOpacity>

                </ScrollView>
            </Block>
        </Block>
    );
}
export default Profile;