import { useState, useRef } from "react";
import { StyleSheet, View, Text, TextInput, Button, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

// import response from "../dummydata.json"

import { search } from "../utils/requests"
import Tile from "../components/Tile";

const Dashboard = ({ navigation }) => {
    const [text, setText] = useState("")
    const [videos, setVideos] = useState([]);
    const frequency = useRef({});

    const handlePress = async () => {
        try {
            let res = await search(text, "channel").get();

            const channelId = res.data.items[0].id.channelId;

            res = await search(text, "video", channelId).get();
            // setVideos(response.items);
            setVideos(res.data.items);

        }
        catch (err) {
            console.error(err.response.data)
        }

        (frequency[text]) ? frequency[text]++ : frequency[text] = 1;

        try {
            await AsyncStorage.setItem('searchHistory', JSON.stringify(frequency));
        } catch (error) {
            console.log('Error saving search history:', error);
        }
    }

    const gotoInsights = () => {
        navigation.navigate("Insights", { vidData: videos });
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <Text style={styles.label}>Username / Handle:</Text>
                <TextInput style={styles.input}
                    placeholder="Search..."
                    onChangeText={(val) => setText(val)} />
                <Button
                    title="Submit"
                    onPress={handlePress} />
            </View>
            <FlatList
                data={videos}
                renderItem={({ item }) => <Tile data={item} />}
                keyExtractor={item => item.id.videoId} />
            <Button
                title="Insights"
                onPress={gotoInsights} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    searchBox: {
        marginBottom: 10
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        fontFamily: "sf-pro-disp"
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginBottom: 10
    },
})

export default Dashboard;