import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { theme } from '../constants';
import Block from '../components/Block';
import Text from '../components/Text';
import BarIcon from '../components/BarIcon';
import AddBtn from '../components/AddBtn';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import Notes from '../screens/Notes';
import Reminder from '../screens/Reminder';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import AddNote from '../screens/AddNote';
import AddReminder from '../screens/AddReminder';
import ReminderDetail from '../screens/ReminderDetail';
import NoteDetail from '../screens/NoteDetail';



const AuthRoute = () => {
    return (
        <Block center middle >
            <Text>Hello Auth</Text>
        </Block>
    );
}




const MainTab = createBottomTabNavigator();
const BottomTabRoute = ({navigation}) => {
    return (
        <MainTab.Navigator 
            initialRouteName="Reminder"
            tabBarOptions={{
                style: styles.bottomTab,
                showLabel: false
        }} >
            <MainTab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({focused})=> (<BarIcon icon="User" focused={focused} />)
            }}  />
            <MainTab.Screen name="Reminder" component={Reminder} options={{
                tabBarIcon: ({focused})=> (<BarIcon icon="Calendar" focused={focused} />)
            }}  />
            <MainTab.Screen name="AddNew" component={AddBtn} options={{
                tabBarButton: ()=>(<AddBtn navigation={navigation}  />)
            }} />
            <MainTab.Screen name="Notes" component={Notes} options={{
                tabBarIcon: ({focused})=> (<BarIcon icon="Clipboard" focused={focused} />)
            }}  />
            <MainTab.Screen name="Settings" component={Settings} options={{
                tabBarIcon: ({focused})=> (<BarIcon icon="Settings" focused={focused} />)
            }}  />
        </MainTab.Navigator>
    );
}



const MainStack = createStackNavigator();
const MainRoute = ()=>{
    return(
        <MainStack.Navigator>
            <MainStack.Screen name="BottomTabRoute" component={BottomTabRoute} options={{
                headerShown: false
            }} />
            <MainStack.Screen name="AddNote" component={AddNote} options={{
                headerShown: false
            }} />
            <MainStack.Screen name="AddReminder" component={AddReminder} options={{
                headerShown: false
            }} />
            <MainStack.Screen name="NoteDetail" component={NoteDetail} options={{
                headerShown: false
            }} />
            <MainStack.Screen name="ReminderDetail" component={ReminderDetail} options={{
                headerShown: false
            }} />
        </MainStack.Navigator>
    );
}



const AppStack = createStackNavigator();
const NavigationCont = () => {
    return (
        <NavigationContainer>
            <StatusBar 
                backgroundColor={theme.colors.primaryGreen}
            />
            <AppStack.Navigator initialRouteName="MainRoute" >
                <AppStack.Screen name="AuthRoute" component={AuthRoute} options={{
                    headerShown: false
                }} />
                <AppStack.Screen name="MainRoute" component={MainRoute} options={{
                    headerShown: false
                }} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    bottomTab: {
        height: 70,
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
        backgroundColor: theme.colors.glassWhite,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        shadowColor: theme.colors.grayFont,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.35,
        shadowRadius: 4,
        elevation: 10
    },
});

export default NavigationCont;