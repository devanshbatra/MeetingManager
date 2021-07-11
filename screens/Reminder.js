import React, {useState, useEffect} from 'react';
import { FlatList, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Block from '../components/Block';
import Header from '../components/Header';
import Text from '../components/Text';
import Card from '../components/Card';
import { theme } from '../constants';
import Empty from '../assets/img/empty.png';
import { useIsFocused } from '@react-navigation/native';
import Realm from 'realm';

let realm;
const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get("window").height;


const Reminder = ({navigation})=>{

    const [reminders, setReminders] = useState([]);
    const [now, setNow] = useState(new Date());
    const [reminderMenu, setReminderMenu] = useState("today");
    const isFocused = useIsFocused();
    useEffect(()=>{
        try{
            realm = new Realm({ path: 'Database.realm' });
            const remindersData = realm.objects("Reminders");
            setReminders(remindersData);
            setReminderMenu("today");
        }catch{
            setReminders([]);
            console.log("failed to fetch");
        }
        setReminders((reminders)=> reminders.filter((reminder)=> (reminder.date.getTime()-now.getTime())/(1000*60*60)<24 && reminder.date.getTime()-now.getTime() > 0 ) )
        setNow(new Date());
    }, [isFocused]);

    return(
        <Block>
            <Header reminderMenu={reminderMenu} setReminderMenu={setReminderMenu}  screenName="reminder" navigation={navigation} setReminders={setReminders} />
            <Block >
                {reminders.length>0?(
                <FlatList 
                    data={reminders}
                    keyExtractor={(item, index)=>index.toString()}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 80, paddingTop: 10}}
                    renderItem={({index, item})=>(
                        <TouchableOpacity
                            activeOpacity={0.87}
                            onPress={()=> {
                                navigation.navigate("ReminderDetail", {index: item._id, navText: "Reminder Details"});
                            } }
                        >
                            <Card margin={[10, 15]} padding={15} flex={false} shadow style={{width: winWidth*0.43, height: 170}} >
                                <Block margin={[0, 0, 20, 0]} flex={false} >
                                    <Text gray2 date >{item.date.toDateString().slice(4)} . {item.date.toLocaleTimeString().slice(0, 5)}</Text>
                                </Block>
                                <Block flex={false} >
                                    {item.title.length>37?(
                                        <Text primary bold >{item.title.slice(0, 37)}...</Text>
                                    ):(
                                    <Text primary bold >{item.title}</Text>
                                    )}
                                </Block>
                                <Block margin={[30, 0, 0, 0]} bottom >
                                    {(item.date.getTime()-now.getTime())>0?(

                                        <Text gray2 date >In {Math.floor((item.date.getTime()-now.getTime())/(1000*60*60))} hrs</Text>
                                    ):(
                                        <Text tomato date >Passed</Text>
                                    )}
                                </Block>
                            </Card>
                        </TouchableOpacity>
                    )}
                />
                ):(
                    <Block center padding={[5, 10]} color={theme.colors.white} >
                        <Image 
                            source={Empty}
                            style={styles.empty}
                            />
                            <Text>Nothing was found here</Text>
                            <Block bottom margin={[0, 0, 100, 0]} >
                                <Text gray center >Click on the add button to create a new reminder.</Text>
                            </Block>
                    </Block>
                )}
            </Block>
        </Block>
    );
}

const styles = StyleSheet.create({
    empty:{
        height: 200,
        width: 200,
        marginTop: 30
    }
});

export default Reminder;