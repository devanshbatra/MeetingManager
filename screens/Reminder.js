import React, {useState, useEffect} from 'react';
import { FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Block from '../components/Block';
import Header from '../components/Header';
import Text from '../components/Text';
import Card from '../components/Card';
import { theme, mocks } from '../constants';
import Realm from 'realm';

let realm;
const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get("window").height;


const Reminder = ({navigation})=>{

    const [reminders, setReminders] = useState(mocks.reminders);
    const [now, setNow] = useState(new Date());
    useEffect(()=>{
        setReminders(()=> mocks.reminders.filter((reminder)=> (reminder.date.getTime()-now.getTime())/(1000*60*60)<24 ) )
        setNow(new Date());
        realm = new Realm({ path: 'Database.realm' });
        const reminders = realm.objects("Reminders");
        console.log("Coming from realm: ", reminders);
    }, []);

    return(
        <Block>
            <Header screenName="reminder" navigation={navigation} setReminders={setReminders} />
            <Block >
                <FlatList 
                    data={reminders}
                    keyExtractor={(item, index)=>index.toString()}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 80, paddingTop: 10}}
                    renderItem={({index, item})=>(
                        <TouchableOpacity
                            activeOpacity={0.87}
                            onPress={()=> navigation.navigate("ReminderDetail", {index: index, navText: "Reminder Details"}) }
                        >
                            <Card margin={[10, 15]} padding={15} flex={false} shadow style={{width: winWidth*0.43}} >
                                <Block margin={[0, 0, 10, 0]} >
                                    <Text gray2 date >{item.date.toDateString().slice(4)} . {item.date.getHours()}:{item.date.getMinutes()}</Text>
                                </Block>
                                <Text primary bold >{item.title}</Text>
                                <Block margin={[30, 0, 0, 0]} >
                                    <Text gray2 date >In {Math.floor((item.date.getTime()-now.getTime())/(1000*60*60))} hrs</Text>
                                </Block>
                            </Card>
                        </TouchableOpacity>
                    )}
                />
            </Block>
        </Block>
    );
}
export default Reminder;