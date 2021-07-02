import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Dimensions, TouchableOpacity, Alert, Switch, ScrollView } from 'react-native';
import { Clock, Calendar, AlignLeft, Plus, Bell, Check, Trash } from 'react-native-feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import Block from '../components/Block';
import Header2 from '../components/Header2';
import Text from '../components/Text';
import Input from '../components/Input';
import Card from '../components/Card';
import { theme, mocks } from '../constants';
import Realm from 'realm';


const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get("window").height;


const realm = new Realm({
    path: 'Database.realm',
    schema: [
        {
            name: "Reminders",
            properties: {
                _id: {type: "objectId", default: Realm.BSON.ObjectID()},
                title: "string",
                date: { type: "date", default: new Date() },
                time: { type: "date", default: new Date() },
                desc: "string",
                notify: { type: "bool", default: 0 },
                agenda: {type: "list", objectType: "string"}
            }
        }
    ]
});


const ReminderDetail = ({ navigation, route }) => {

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [data, setData] = useState({
        title: "",
        date: new Date("2021-06-28T12:00:00Z"),
        desc: "",
        notify: true,
        agenda: []
    });
    const [title, setTitle] = useState("");
    const [time, setTime] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [desc, setDesc] = useState("");
    const [notify, setNotify] = useState(false);
    const [agenda, setAgenda] = useState([]);
    const [newAgenda, setNewAgenda] = useState("");

    useEffect(() => {
        if(route.params.index!="new"){
            setData(mocks.reminders[route.params.index]);
            console.log("set data called.")
        }
        setTitle(data.title);
        setDesc(data.desc);
        setNotify(data.notify);
        setAgenda(data.agenda);
    }, [data]);

    useEffect(()=>{
        navigation.addListener("beforeRemove", (e)=>{
            e.preventDefault();

            Alert.alert(
                "Save Changes",
                "Do you want to save the changes",
                [
                    {text: "Discard", style: "destructive", onPress: ()=> navigation.dispatch(e.data.action)  },
                    {text: "Save", onPress: ()=> {
                        if(title===""){
                            Alert.alert("Title is missing", "Please add a title");
                            console.log(title, "isko missing bta rha h");
                        }else{
                            realm.write(()=> {
                                realm.create("Reminders", {
                                    title: title,
                                    date: date,
                                    time: time,
                                    desc: desc,
                                    notify: notify,
                                    agenda: agenda
                                })
                            } );
                            navigation.dispatch(e.data.action);
                        }
                    }  },
                ],
                {
                    cancelable: true
                }
            );
        })
    } ,[navigation, title])


    const DateHandler = (event, value) => {
        setShowDatePicker(false);
        console.log("For date", event);
        if (event.type === "set") {
            setDate(value);
        }
    }
    const TimeHandler = (event, value) => {
        const now = new Date()
        setShowTimePicker(false);
        console.log("For time", event, value.getTime() - now.getTime());
        if (event.type === "set") {
            if (date.toDateString() === value.toDateString()) {
                if (value.getTime() > now.getTime()) {
                    setTime(value)
                    console.log("Date is same, time value set.")
                } else {
                    Alert.alert("Time is invalid", "Please Select a future time");
                }
            } else {
                setTime(value);
                console.log("Date is different, time value set.")
            }
        }
    }

    const deleteAgenda=(item)=>{
        setAgenda((agendas)=> agendas.filter((agenda)=> agenda!==item ) );
    }
    const AddAgenda = ()=>{
        if(newAgenda!==""){
            setAgenda((prevAgenda)=> [...prevAgenda, newAgenda] );
            setNewAgenda("");
        }
    }

    return (
        <Block color={theme.colors.blue} >
            <Header2 back text={route.params.navText} navigation={navigation} />

            {/* White Curved block */}
            <Block flex={false} color={theme.colors.white} style={styles.whiteBlock} >
                {/* topBar green curved block */}
                <Block flex={false} color={theme.colors.primaryGreen} row padding={[20]} style={styles.topBar}  >
                    {/* Top date Display */}
                    <Card padding={[5, 0, 0, 0]} shadow center flex={false} color={theme.colors.white}  >
                        <Text gray bold >{date.toDateString().slice(4, 7)}</Text>
                        <Text gray bold >{date.toDateString().slice(8, 10)}</Text>
                        <Block color={theme.colors.tomato} padding={[5, 5, 8, 5]} flex={false} >
                            <Text white caption >{data.date.toDateString().slice(11)}</Text>
                        </Block>
                    </Card>
                    {/* title */}
                    <Block padding={[3, 5, 3, 20]} flex={false} >
                        <Input
                            placeholder="Click to Add Title"
                            placeHolderTextColor={theme.colors.white}
                            value={title}
                            color={theme.colors.white}
                            fontSize={theme.sizes.h2}
                            fontWeight="bold"
                            multiline={true}
                            numberOfLines={2}
                            onChangeText={(val) => {
                                setTitle(val);
                                console.log(title);
                            }}
                            style={{ marginRight: 20 }}
                        />
                    </Block>
                </Block>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}
                    bounces={false}
                    contentContainerStyle={{ paddingBottom: 500 }}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Date time and description */}
                    <Block flex={false} >
                        {/* date */}
                        <Block row margin={[30, 0, 10, 30]} flex={false}
                            clickable
                            onClick={() => setShowDatePicker(true)}
                        >
                            <Calendar stroke={theme.colors.grayFont} height={25} width={25} style={{ marginRight: 15 }} />
                            <Text h4 bold gray >{date.toDateString()}</Text>
                            {showDatePicker && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={new Date}
                                    is24Hour={true}
                                    display="default"
                                    mode="date"
                                    minimumDate={new Date}
                                    onChange={DateHandler}
                                />
                            )}
                        </Block>
                        {/* time */}
                        <Block row margin={[20, 0, 10, 30]} flex={false}
                            clickable
                            onClick={() => setShowTimePicker(true)}
                        >
                            <Clock stroke={theme.colors.grayFont} height={25} width={25} style={{ marginRight: 15 }} />
                            { }
                            <Text h4 bold gray >{time.toLocaleTimeString().slice(0, 5)}</Text>
                            {showTimePicker && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={new Date}
                                    is24Hour={true}
                                    display="default"
                                    minimumDate={new Date()}
                                    mode="time"
                                    display="spinner"
                                    onChange={TimeHandler}
                                />
                            )}
                        </Block>


                        {/* Description */}
                        <Block row margin={[20, 0, 10, 30]} center flex={false}  >
                            <AlignLeft stroke={theme.colors.grayFont} height={25} width={25} style={{ marginRight: 15 }} />
                            <Input
                                placeholder="Click to Add Description"
                                placeHolderTextColor={theme.colors.gray2}
                                value={desc}
                                color={theme.colors.grayFont}
                                fontSize={theme.sizes.h4}
                                fontWeight="bold"
                                multiline={true}
                                onChangeText={(val) => {
                                    setDesc(val);
                                }}
                                style={{ marginRight: 30 }}
                            />
                        </Block>

                    </Block>

                    {/* Agenda */}
                    <Block margin={20} >
                        <Text bold h2 black >Agenda</Text>
                        <Block row flex={false} center margin={[30, 0]} >
                            <Input
                                placeholder="Add Agenda"
                                placeHolderTextColor={theme.colors.gray2}
                                value={newAgenda}
                                color={theme.colors.grayFont}
                                fontSize={theme.sizes.h4}
                                fontWeight="bold"
                                multiline={true}
                                onChangeText={(val) => setNewAgenda(val)}
                                style={{ width: winWidth * 0.7 }}
                                backgroundColor={theme.colors.offWhite}
                            />
                            <Block flex={false} color={theme.colors.offWhite} middle center padding={5} margin={[0, 10]}
                                clickable onClick={()=> AddAgenda() }
                            >
                                <Plus stroke={theme.colors.tomato} strokeWidth={4} height={30} width={30} />
                            </Block>
                        </Block>
                                {/* Agenda list */}
                        {agenda.map((item, index)=> (
                            <Block flex={false} margin={[10, 10]} center row key={index.toString()} >
                                <Block flex={false} margin={[0, 10, 0, 0]} color={theme.colors.tomato}
                                    padding={5}
                                    style={{borderRadius: 5}}
                                    clickable onClick={()=> deleteAgenda(item) }
                                >
                                    <Trash stroke={theme.colors.offWhite}
                                        width={20}
                                        height={20}
                                        strokeWidth={3}
                                    />
                                </Block>
                                <Text h4 bold gray >{item}</Text>
                            </Block>
                        ))}        

                    </Block>

                </ScrollView>
            </Block>

            <Block row center mar padding={[0, 30]} >
                <Bell stroke={theme.colors.gray3} strokeWidth={3} height={25} width={25} style={{ marginRight: 15 }} />
                <Text style={{ flex: 1 }} bold gray3 h3 >Remind Me</Text>
                <Switch
                    trackColor={{ true: theme.colors.grayFont, false: theme.colors.gray3 }}
                    thumbColor={theme.colors.tomato}
                    value={notify}
                    onValueChange={() => setNotify(!notify)}
                />
            </Block>



        </Block>
    );
}

const styles = StyleSheet.create({
    topBar: {
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
    },
    whiteBlock: {
        height: winHeight * 0.83,
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
    }
});

export default ReminderDetail;