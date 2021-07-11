import React from 'react';
import { StatusBar, StyleSheet, Dimensions, Alert } from 'react-native';
import Block from '../components/Block';
import Text from '../components/Text';
import Card from '../components/Card';
import { theme } from '../constants';
import Realm from 'realm';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
} from '@react-native-google-signin/google-signin';


const realm = new Realm({
    path: "UserDatabase.realm",
    schema: [
        {
            name: "UserDetails",
            properties: {
                name: "string",
                email: "string",
                photoSrc: "string",
                idToken: "string",
                isLoggedIn: { type: "bool", default: 0 }
            }
        }
    ]
});


const Login = ({navigation}) => {


    const handleLogin = async() => {
        GoogleSignin.configure({
            webClientId: '701223007797-4gv3j96m4g11kam5b0ds3sag48kk7pmi.apps.googleusercontent.com',
            offlineAccess: true
        });
        try{
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);
            realm.write(()=> {
                realm.create("UserDetails", {
                    name: userInfo.user.name,
                    email: userInfo.user.email,
                    photoSrc: userInfo.user.photo,
                    idToken: userInfo.idToken,
                    isLoggedIn: true
                });
            });
            navigation.replace("MainRoute");
          }catch(error){
            if(error.code === statusCodes.SIGN_IN_CANCELLED){
              console.log("user cancelled the login flow");
            }
            else if(error.code === statusCodes.IN_PROGRESS){
              console.log("operation (e.g. sign in) is in progress already");
            }
            else if(error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE){
              console.log("Play services needs to be installed");
            }
            else{
              console.log("Network eror", error);
              Alert.alert(
                  "Network Unavailable",
                  "Please check your network connection and try again later."
              );
            }
          }
    }


    // const signOut = async()=>{
    //     realm.write(()=>{
    //         realm.deleteAll();
    //         console.log("Logged out");
    //     })
    //     try{
    //         await GoogleSignin.revokeAccess();
    //         await GoogleSignin.signOut();
    //         console.log("Also signed out by google");
    //     }catch(error){
    //         console.log("err while google signout: ", error);
    //     }
    // }

    // const checkStatus=()=>{
    //     try{
    //         const userData = realm.objects("UserDetails");
    //         console.log(userData[0].isLoggedIn);
    //         if(userData[0].isLoggedIn){
    //             console.log("Is logged in", userData);
    //         }else{
    //             console.log("Logged out");
    //         }
    //     }catch{
    //         console.log("Might be logged out");
    //     }
    // }

    return (
        <Block center middle color={theme.colors.offWhite} >
            <StatusBar
                backgroundColor={theme.colors.offWhite}
                barStyle="dark-content"
                animated={true}
            />
            <Text h2 gray bold >Login/welcome Screen</Text>
            <GoogleSigninButton
                style={styles.signBtn}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={handleLogin} />
        </Block>
    );
}

const styles = StyleSheet.create({
    signBtn:{
        width: 250,
        height: 70,
        position: "absolute",
        bottom: 50
    }
});

export default Login;