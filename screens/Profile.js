import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import Block from '../components/Block';
import Text from '../components/Text';
import Card from '../components/Card';
import Header from '../components/Header';
import { theme, mocks } from '../constants';
import { ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
    GoogleSignin
} from '@react-native-google-signin/google-signin';
import Realm from 'realm';
let realm1;
let realm2;
let realm3;

const Profile = ({navigation})=>{
    const [numberOfRem, setNumberOfRem] = useState(0);
    const [numberOfNotes, setNumberOfNotes] = useState(0);
    const [loading, setLoading] = useState(false);
    const isFocused = useIsFocused();
    useEffect(()=>{
        realm2 = new Realm({path: "Database.realm"});
        const reminderData = realm2.objects("Reminders");
        setNumberOfRem(reminderData.length);

        realm3 = new Realm({path: "NoteDatabase.realm"});
        const noteData = realm3.objects("Notes");
        setNumberOfNotes(noteData.length);
    }, [isFocused]);

    const logoutAlert = ()=>{
        Alert.alert(
            "Logout",
            "Are you sure, you want to logout ?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Logout",
                    onPress: () => handleLogout(),
                }
            ],
            {
                cancelable: true
            }
        );
    }

    const handleLogout = async()=>{
        setLoading(true);
        console.log("Log out initiated");
        GoogleSignin.configure({
            webClientId: '701223007797-4gv3j96m4g11kam5b0ds3sag48kk7pmi.apps.googleusercontent.com',
            offlineAccess: true
        });
        try{
            realm1 = new Realm({path: "UserDatabase.realm"});
            realm2 = new Realm({path: "Database.realm"});
            realm3 = new Realm({path: "NoteDatabase.realm"});
            realm1.write(()=>{
                realm1.deleteAll();
                console.log("removed users");
            });
            realm2.write(()=>{
                realm2.deleteAll();
                console.log("removed reminders");
            });
            realm3.write(()=>{
                realm3.deleteAll();
                console.log("removed notes");
            });
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            navigation.replace("AuthRoute");
            console.log("Also signed out by google");
        }catch(error){
            console.log("err while google signout: ", error);
        }
    }

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
                        <Text gray bold >{numberOfRem}</Text>
                    </Card>
                    <Card flex={false} margin={[10, 20]} row space="between" padding={[20, 15]} shadow >
                        <Text primary bold >Notes Saved</Text>
                        <Text gray bold >{numberOfNotes}</Text>
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
                        onPress={logoutAlert}
                    >
                        <Card flex={false} row space="between" margin={[10, 20]} padding={[20, 15]} shadow >
                            <Text primary bold >Logout</Text>
                            {loading?(
                                <ActivityIndicator 
                                    size="small"
                                    color={theme.colors.primaryGreen}
                                />
                            ):null}
                        </Card>
                    </TouchableOpacity>

                </ScrollView>
            </Block>
        </Block>
    );
}
export default Profile;