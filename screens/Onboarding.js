import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { theme } from '../constants';
import Call from '../assets/img/call.png';
import Sync from '../assets/img/sync.png';
import Notes from '../assets/img/notes.png';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({navigation}) => {


    return (
        <Onboarding
            onSkip={ ()=> navigation.replace("Login") }
            onDone={ ()=> navigation.replace("Login") }
            titleStyles={{color: theme.colors.grayFont}}
            subTitleStyles={{color: theme.colors.gray2}}
            pages={[
                {
                    backgroundColor: '#a6e4d0',
                    image: <Image source = {Call} style={styles.dispImg} />,
                    title: 'Floating Widget',
                    subtitle: 'Now add reminders, take notes. All during your calls',
                },
                {
                    backgroundColor: '#E5C94F',
                    image: <Image source = {Notes} style={styles.dispImg} />,
                    title: 'Reframe anytime',
                    subtitle: 'Reframe/edit your events and notes anytime after the call',
                },
                {
                    backgroundColor: '#e9bcbe',
                    image: <Image source = {Sync} style={styles.dispImg} />,
                    title: 'Google Calendar',
                    subtitle: 'All your events would be synced with Google Calendar',
                },
            ]}
        />
    );
}

const styles = StyleSheet.create({
    dispImg: {
        width: 200,
        height: 200,
        borderRadius: 15,
    }
});

export default OnboardingScreen;