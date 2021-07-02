import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from "react-native";
import Text from "./Text";
import Block from "./Block";
import Card from "./Card";
import Input from "./Input";
import { theme, mocks } from '../constants';

const Header = ({ screenName, navigation, setReminders, setNotes }) => {
    const [greeting, setGreeting] = useState("Good Morning");
    const [instruction, setInstruction] = useState("You have some important");
    const [noteMenu, setNoteMenu] = useState("all");
    const [reminderMenu, setReminderMenu] = useState("today");
    const [now, setnow] = useState(new Date());
    useEffect(() => {
        const today = new Date();
        const hour = today.getHours();
        console.log(hour);
        if (hour > 4 && hour < 12) {
            setGreeting("Good morning");
        } else if (hour >= 12 && hour <= 16) {
            setGreeting("Good afternoon");
        } else {
            setGreeting("Good evening");
        }

        if (mocks.reminders.filter((reminder) => (reminder.date.getTime() - now.getTime()) / (1000 * 60 * 60) < 24).length === 0) {
            setInstruction("Relax, You don't have any");
        }
    }, []);

    return (
        <Block flex={false} style={styles.headerBox} color={theme.colors.primaryGreen} >
            {/* For top icons(if needed in future) */}
            <Block padding={[25, 20, 20, 20]} flex={false} >

            </Block>
            {/* for greeting */}
            <Block padding={[30, 0, 5, 50]} flex={false} >
                <Text bold white h1 >Hello {mocks.userProf.name.split(" ")[0]} </Text>
                <Text bold white h1 >{greeting},</Text>
            </Block>

            {/* Reminder Screen specific heading */}
            {(screenName === "reminder") ? (
                <Block flex={false} padding={[10, 0, 20, 52]} >
                    <Text gray3 h4 >{instruction}</Text>
                    <Text gray3 h4 >tasks to do for today</Text>
                </Block>
            ) : null}

            {/* notes Screen specific heading */}
            {(screenName === "notes")? (
                <Block flex={false} padding={[10, 0, 20, 52]} >
                <Text gray3 h4 >Checkout your saved notes</Text>
            </Block>
            ): null}

            {/* Profile Screen specific heading */}
            {(screenName === "profile")? (
                <Block flex={false} padding={[10, 0, 20, 52]} >
                <Text gray3 h4 >Account information and settings</Text>
            </Block>
            ): null}

            {/* settings Screen specific heading */}
            {(screenName === "settings")? (
                <Block flex={false} padding={[10, 0, 20, 52]} >
                <Text gray3 h4 >Personalise your Companion</Text>
            </Block>
            ): null}

            {(screenName === "reminder") ? (
                <Block flex={false} row padding={[5, 20]} >
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {/* Today */}
                        <Card flex={false} color={(reminderMenu === "today") ? theme.colors.white : theme.colors.primaryGreen}
                            padding={[10, 25]} margin={[0, 10]}
                            clickable onClick={() => {
                                setReminderMenu("today");
                                setReminders(() => mocks.reminders.filter((reminder) => (reminder.date.getTime() - now.getTime()) / (1000 * 60 * 60) < 24))
                            }}
                        >
                            <Text
                                style={{ color: (reminderMenu === "today" ? theme.colors.primaryGreen : theme.colors.gray3) }}
                                bold
                            >Today</Text>
                        </Card>

                        {/* This Week */}
                        <Card flex={false} color={(reminderMenu === "week") ? theme.colors.white : theme.colors.primaryGreen}
                            padding={[10, 25]} margin={[0, 10]}
                            clickable onClick={() => {
                                setReminderMenu("week");
                                setReminders(() => mocks.reminders.filter((reminder) => (reminder.date.getTime() - now.getTime()) / (1000 * 60 * 60) < (24 * 7)))
                            }}
                        >
                            <Text
                                style={{ color: (reminderMenu === "week" ? theme.colors.primaryGreen : theme.colors.gray3) }}
                                bold
                            >This Week</Text>
                        </Card>
                        {/* This month */}
                        {/* <Card flex={false} color={(reminderMenu==="month")?theme.colors.white: theme.colors.primaryGreen}
                            padding={[10, 25]} margin={[0, 10]} 
                            clickable onClick={()=> {
                                setReminderMenu("month");
                                setReminders(()=> mocks.reminders.filter((reminder)=> (reminder.date.getTime()-now.getTime())/(1000*60*60)<(24*7*30) ) )
                            } }    
                        >
                            <Text
                                style={{color: (reminderMenu==="month"?theme.colors.primaryGreen: theme.colors.gray3)}}
                                bold
                            >This Month</Text>
                        </Card> */}

                        {/* All */}
                        <Card flex={false} color={(reminderMenu === "all") ? theme.colors.white : theme.colors.primaryGreen}
                            padding={[10, 25]} margin={[0, 10]}
                            clickable onClick={() => {
                                setReminderMenu("all");
                                setReminders(mocks.reminders)
                            }}
                        >
                            <Text
                                style={{ color: (reminderMenu === "all" ? theme.colors.primaryGreen : theme.colors.gray3) }}
                                bold
                            >All</Text>
                        </Card>
                    </ScrollView>
                </Block>
            ) : null}

            {/* notes (ALL and PINNED) */}
            {(screenName === "notes") ? (
                <Block flex={false} row padding={[5, 20]} >
                    {/* All */}
                    <Card flex={false} color={(noteMenu === "all") ? theme.colors.white : theme.colors.primaryGreen}
                        padding={[10, 25]} margin={[0, 15]}
                        clickable onClick={() => {
                            setNotes(mocks.notes);
                            setNoteMenu("all");
                        }}
                    >
                        <Text
                            style={{ color: (noteMenu === "all" ? theme.colors.primaryGreen : theme.colors.gray3) }}
                            bold
                            h4
                        >Notes</Text>
                    </Card>
                    {/* pinned */}
                    <Card flex={false} color={(noteMenu === "pinned") ? theme.colors.white : theme.colors.primaryGreen}
                        padding={[10, 25]} margin={[0, 15]}
                        clickable onClick={() => {
                            setNotes(() => mocks.notes.filter((note) => note.pinned === true));
                            setNoteMenu("pinned");
                        }}
                    >
                        <Text
                            style={{ color: (noteMenu === "pinned" ? theme.colors.primaryGreen : theme.colors.gray3) }}
                            bold
                            h4
                        >Pinned Notes</Text>
                    </Card>
                </Block>
            ) : null}

        </Block>
    );
}

const styles = StyleSheet.create({
    headerBox: {
        // height: 100
    }
})

export default Header;