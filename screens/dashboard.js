import { useState, useContext } from "react";
import { StyleSheet, View, Text, TextInput, Button, FlatList } from "react-native";

// import response from "../dummydata.json"

import MainContext from "../contexts/mainContext";
import { search } from "../utils/requests"
import Tile from "../components/Tile";

const Dashboard = ({ navigation }) => {
    const { appendHistory } = useContext(MainContext);

    const [text, setText] = useState("")
    const [videos, setVideos] = useState([]);

    const handlePress = async () => {
        try {
            appendHistory(text);
            let res = await search(text, "channel");

            // extract channel id from initial search
            const channelId = res.data.items[0].id.channelId;

            // search for videos of above channelId
            res = await search(text, "video", channelId);
            setVideos(res.data.items);
        }
        catch (err) {
            console.error(err);
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
                    placeholder="Type a username"
                    onChangeText={(val) => setText(val)}
                    onSubmitEditing={handlePress}/>
                <Button
                    title="Search"
                    onPress={handlePress}
                    disabled={!text} />
            </View>
            <FlatList
                data={videos}
                renderItem={({ item }) => <Tile data={item} />}
                keyExtractor={item => item.id.videoId}
                ItemSeparatorComponent={<Text></Text>} />
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