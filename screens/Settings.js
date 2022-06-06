import React, {useState} from 'react';
import { Switch } from 'react-native';
import Block from '../components/Block';
import Text from '../components/Text';
import Card from '../components/Card';
import Header from '../components/Header';
import { theme, mocks } from '../constants';
import { ScrollView, TouchableOpacity } from 'react-native';

const Settings = () => {

    const [notifEnabled, setNotifEnabled] = useState(true);

    return (
        <Block>
            <Header screenName="settings" />
            <Block>
                <ScrollView
                    contentContainerStyle={{paddingTop: 20, paddingBottom: 70}}
                    showsVerticalScrollIndicator={false}
                >
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => console.log('pressed')}
                    >
                        <Card flex={false} margin={[10, 20]} padding={[20, 15]} shadow >
                            <Text primary bold >Change Notification Tone</Text>
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => console.log('pressed')}
                    >
                        <Card flex={false} margin={[10, 20]} padding={[20, 15]} shadow >
                            <Text primary bold >Change Reminder Tone </Text>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => console.log('pressed')}
                    >
                        <Card flex={false} margin={[10, 20]} padding={[20, 15]} shadow space="between" row >
                            <Text primary bold >Notifications</Text>
                            <Switch 
                                trackColor = {{true: theme.colors.grayFont, false: theme.colors.gray3}}
                                thumbColor = {theme.colors.primaryGreen}
                                value={notifEnabled}
                                onValueChange = {()=> setNotifEnabled(!notifEnabled) }
                            />
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => console.log('pressed')}
                    >
                        <Card flex={false} margin={[10, 20]} padding={[20, 15]} shadow >
                            <Text primary bold >Terms of Use</Text>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => console.log('pressed')}
                    >
                        <Card flex={false} margin={[10, 20]} padding={[20, 15]} shadow >
                            <Text primary bold >Privacy Policy</Text>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => console.log('pressed')}
                    >
                        <Card flex={false} margin={[10, 20]} padding={[20, 15]} shadow >
                            <Text primary bold >More Apps from Devansh Batra</Text>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => console.log('pressed')}
                    >
                        <Card flex={false} margin={[10, 20]} padding={[20, 15]} shadow space="between" row >
                            <Text primary bold >App Version</Text>
                            <Text gray bold caption >1.0.01</Text>
                        </Card>
                    </TouchableOpacity>
                </ScrollView>
            </Block>
        </Block>
    );
}
export default Settings;