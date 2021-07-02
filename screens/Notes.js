import React, {useState, useEffect} from 'react';
import { FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Block from '../components/Block';
import Header from '../components/Header';
import Text from '../components/Text';
import Card from '../components/Card';
import { theme, mocks } from '../constants';

const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get("window").height;

const Notes = ({navigation})=>{

    const [notes, setNotes] = useState(mocks.notes);

    return(
        <Block>
            <Header screenName = "notes" navigation={navigation} options="all" setNotes={setNotes} />
            <Block center >
                <FlatList 
                    data={notes}
                    keyExtractor={(item, index)=>index.toString()}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 80, paddingTop: 10}}
                    renderItem={({index, item})=>(
                        <TouchableOpacity
                            activeOpacity={0.87}
                            onPress={()=> navigation.navigate("NoteDetail", {index: index, navText: "Note Details"}) }
                        >
                            <Card margin={[10, 15]} padding={15} flex={false} shadow style={styles.NoteCont} >
                                <Text primary bold >{item.title}</Text>
                                <Block flex={false} padding={[5, 0, 25, 5]} >
                                    <Text gray >{item.desc.slice(0, 30)}...</Text>
                                </Block>
                                <Block>
                                    <Text gray2 date >{item.date.toDateString().slice(4)} . {item.date.getHours()}:{item.date.getMinutes()}</Text>
                                </Block>
                            </Card>
                        </TouchableOpacity>
                    )}
                />
            </Block>
        </Block>
    );
}

const styles = StyleSheet.create({
    NoteCont:{
        width: winWidth*0.43
    }
});

export default Notes;