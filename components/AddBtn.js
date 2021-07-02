import React, { useState } from 'react';
import { Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Plus, Clipboard, Calendar, X } from 'react-native-feather';
import Block from './Block';
import Text from './Text';
import Card from './Card';
import { theme } from "../constants";

const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get("window").height;

const AddBtn = ({ navigation }) => {
    const [showPopup, setShowPopup] = useState(false);
    return (
        <TouchableOpacity
            onPress={() => {
                setShowPopup(true);
                // navigation.navigate("AddNote")
            }}
        >
            <Block flex={false} color={theme.colors.primaryGreen} style={styles.btnCont} center middle >
                <Plus stroke={theme.colors.white}
                    strokeWidth={3}
                    height={30}
                    width={30}
                />

                {/* popup */}
                <Modal
                    visible={showPopup}
                    transparent={true}
                    onRequestClose={() => setShowPopup(false)}
                    animationType="slide"
                >
                    <Block center middle>
                        <Block flex={false} color={theme.colors.glassWhite} padding={[40, 15]} style={styles.popupCont} >
                            <TouchableOpacity
                                onPress={()=> {
                                    setShowPopup(false);
                                    navigation.navigate("NoteDetail", {index: "new", navText: "New Note"});

                                }}
                            >
                                <Card row flex={false} color={theme.colors.transparent} padding={[10, 20]} >
                                    <Clipboard
                                        stroke={theme.colors.grayFont}
                                        height={25}
                                        width={25}
                                        style={{ marginRight: 15 }}
                                    />
                                    <Text h4 bold gray >New Note</Text>
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=> {
                                    setShowPopup(false);
                                    navigation.navigate("ReminderDetail", {index: "new", navText: "New Reminder"});

                                }}
                            >
                                <Card row flex={false} color={theme.colors.transparent} padding={[10, 20]} >
                                    <Calendar
                                        stroke={theme.colors.grayFont}
                                        height={25}
                                        width={25}
                                        style={{ marginRight: 15 }}
                                    />
                                    <Text h4 bold gray >New Reminder</Text>
                                </Card>
                            </TouchableOpacity>


                            <Block flex={false} color={theme.colors.white} style={styles.closeBtn} center middle >
                                <TouchableOpacity
                                    onPress={() => setShowPopup(false)}
                                >
                                    <X stroke={theme.colors.primaryGreen}
                                        strokeWidth={3}
                                        height={30}
                                        width={30}
                                    />
                                </TouchableOpacity>
                            </Block>

                        </Block>
                    </Block>
                </Modal>

            </Block>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    btnCont: {
        width: 60,
        height: 60,
        borderRadius: 30,
        top: -20,
        elevation: 4,
    },
    popupCont: {
        bottom: 90,
        position: "absolute",
        width: winWidth,
        borderTopStartRadius: 25,
        borderTopEndRadius: 25,
    },
    closeBtn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        top: -20,
        elevation: 4,
        position: "absolute",
        left: winWidth / 2 - 30
    }
});

export default AddBtn;