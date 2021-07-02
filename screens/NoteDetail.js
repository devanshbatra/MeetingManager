import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Dimensions, Switch } from 'react-native';
import { Pocket, AlignLeft } from 'react-native-feather';
import Block from '../components/Block';
import Header2 from '../components/Header2';
import Input from '../components/Input';
import Text from '../components/Text';
import Card from '../components/Card';
import { theme, mocks } from '../constants';


const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get("window").height;

const NoteDetail = ({ navigation, route }) => {

    const [data, setData] = useState({
        title: "",
        desc: "",
        date: new Date(),
        pinned: false
    });
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [pinned, setPinned] = useState(false);

    useEffect(() => {
        if(route.params.index!=="new"){
            setData(mocks.notes[route.params.index]);
        }
        setTitle(data.title);
        setDesc(data.desc);
        console.log(data);
    }, [data]);

    return (
        <Block color={theme.colors.blue} >
            <Header2 back text={route.params.navText} navigation={navigation} />

            {/* White Curved block */}
            <Block flex={false} color={theme.colors.white} style={styles.whiteBlock} >
                {/* topBar green curved block */}
                <Block flex={false} color={theme.colors.primaryGreen} row padding={[20]} style={styles.topBar}  >
                    {/* Top date Display */}
                    <Card padding={[5, 0, 0, 0]} shadow center flex={false} color={theme.colors.white}  >
                        <Text gray bold >{data.date.toDateString().slice(4, 7)}</Text>
                        <Text gray bold >{data.date.toDateString().slice(8, 10)}</Text>
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
                            onChangeText={(val) => setTitle(val)}
                            style={{ marginRight: 20 }}
                        />
                    </Block>
                </Block>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}
                    bounces={false}
                    contentContainerStyle={{ paddingBottom: 500 }}
                >
                    {/*description */}
                    <Block row margin={[20, 20, 10, 30]} flex={false}  >
                        <AlignLeft stroke={theme.colors.grayFont} height={25} width={25} style={{ marginRight: 15, marginTop: 15 }} />
                        <Input
                            placeholder="Click to Add Description"
                            placeHolderTextColor={theme.colors.gray2}
                            value={desc}
                            color={theme.colors.grayFont}
                            fontSize={theme.sizes.h4}
                            fontWeight="bold"
                            multiline={true}
                            onChangeText={(val) => setDesc(val)}
                            style={{ marginRight: 30 }}
                        />
                    </Block>

                </ScrollView>
            </Block>

            <Block row center mar padding={[0, 30]} >
                <Pocket stroke={theme.colors.gray3} strokeWidth={3} height={25} width={25} style={{ marginRight: 15 }} />
                <Text style={{ flex: 1 }} bold gray3 h3 >Pin this note</Text>
                <Switch
                    trackColor={{ true: theme.colors.grayFont, false: theme.colors.gray3 }}
                    thumbColor={theme.colors.tomato}
                    value={pinned}
                    onValueChange={() => setPinned(!pinned)}
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


export default NoteDetail;