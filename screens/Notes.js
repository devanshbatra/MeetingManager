import React, {useState, useEffect} from 'react';
import { FlatList, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import Block from '../components/Block';
import Header from '../components/Header';
import Text from '../components/Text';
import Card from '../components/Card';
import { useIsFocused } from '@react-navigation/native';
import { theme} from '../constants';
import Realm from 'realm';
import Empty from "../assets/img/empty.png";
let realm;

const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get("window").height;

const Notes = ({navigation})=>{

    const [notes, setNotes] = useState([]);
    const [noteMenu, setNoteMenu] = useState("all");
    const isFocused = useIsFocused();
    useEffect(()=> {
        try{
            realm = new Realm({ path: 'NoteDatabase.realm' });
            const notesData = realm.objects("Notes");
            setNotes(notesData);
            setNoteMenu("all");
        }catch{
            setNotes([]);
        }
    }, [isFocused]);

    return(
        <Block>
            <Header noteMenu={noteMenu} setNoteMenu={setNoteMenu} screenName = "notes" navigation={navigation} options="all" setNotes={setNotes} />
            <Block >
                {notes.length>0?(
                    <FlatList 
                        data={notes}
                        keyExtractor={(item, index)=>index.toString()}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 80, paddingTop: 10}}
                        renderItem={({index, item})=>(
                            <TouchableOpacity
                                activeOpacity={0.87}
                                onPress={()=> navigation.navigate("NoteDetail", {index: item._id, navText: "Note Details"}) }
                            >
                                <Card margin={[10, 15]} padding={15} flex={false} shadow style={{width: winWidth*0.43, height: 170}} >
                                    
                                    {item.title.length>30?(
                                        <Text primary bold >{item.title.slice(0, 30)}...</Text>
                                    ):(
                                        <Text primary bold >{item.title}</Text>
                                    )}
    
                                    <Block flex={false} padding={[5, 0, 25, 5]} >
                                        {item.desc.length>40?(
                                            <Text gray2 >{item.desc.slice(0, 40)}...</Text>
                                        ):(
                                            <Text gray2 >{item.desc}</Text>
                                        )}
                                    </Block>
                                    <Block bottom>
                                        <Text gray2 date >{item.date.toDateString().slice(4)} . {item.date.toLocaleTimeString().slice(0, 5)}</Text>
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
                                <Text gray center >Click on the add button to create a new note.</Text>
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

export default Notes;