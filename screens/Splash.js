import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Block from '../components/Block';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from '../components/Text';
import Card from '../components/Card';
import { theme } from '../constants';
import Realm from 'realm';
let realm;



const Splash = ({navigation}) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [firstLaunch, setFirstLaunch] = useState(false);
    useEffect(()=>{

        AsyncStorage.getItem("alreadyLaunched").then(val=>{
            if(val===null){
                AsyncStorage.setItem("alreadyLaunched", "true");
                setFirstLaunch(true);
                console.log("This is first launch");
            }else{
                setFirstLaunch(false);
                console.log("This is not a first launch", val);
            }
        })

    }, []);
    
    useEffect(()=>{
        try{
            realm = new Realm({path: "UserDatabase.realm"});
            const userData = realm.objects("UserDetails");
            if(userData[0].isLoggedIn){
                console.log("Is logged in", userData);
                setLoggedIn(true);
                setTimeout(()=> navigation.replace("MainRoute") , 1500);
            }else{
                if(firstLaunch){
                    setTimeout(()=> navigation.replace("Onboarding") , 1500); 
                }else{
                    setTimeout(()=> navigation.replace("Login") , 1500); 
                }
            }
        }catch(err){
            console.log("Logged Out");
            if(firstLaunch){
                setTimeout(()=> navigation.replace("Onboarding") , 1500); 
            }else{
                setTimeout(()=> navigation.replace("Login") , 1500); 
            }
        }
    }, [firstLaunch]);
    

    return (
        <Block center middle gradient >
            <StatusBar
                backgroundColor={theme.colors.primaryGreen}
                animated={true}
            />
            <Text white bold h1 >Splash Screen</Text>
        </Block>
    );
}

const styles = StyleSheet.create({
    Cont: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    }
});

export default Splash;