import { Component, createRef } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from "react-native";

import response from "../dummydata.json";

import MainContext from "../contexts/mainContext";
import { search } from "../utils/requests";
import Tile from "../components/Tile";
import CustomButton from '../components/CustomButton';
class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            text: "",
            videos: []
        };
        this.myRef = createRef();
    }

    componentDidMount() {
        this.myRef.current.changeTitle("search");
    };



    handlePress = async () => {
        const { appendHistory } = this.context;
        try {
            // console.log(this.myRef);
            appendHistory(this.state.text);
            let res = await search(this.state.text, "channel");

            // extract channel id from initial search
            const channelId = res.data.items[0].id.channelId;

            // search for videos of above channelId
            res = await search(this.state.text, "video", channelId);
            this.setState({ videos: response.items });
        }
        catch (err) {
            console.error();
        }
    }

    gotoInsights = () => {
        this.props.navigation.navigate("Insights", { vidData: this.state.videos });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchBox}>
                    <Text style={styles.label}>Username / Handle:</Text>
                    <TextInput style={styles.input}
                        placeholder="Type a username"
                        onChangeText={(val) => this.setState({ text: val })}
                        onSubmitEditing={this.handlePress} />
                    <CustomButton
                        ref={this.myRef}
                        onPress={this.handlePress} 
                        disabled={!this.state.text} />
                </View>
                <FlatList
                    data={this.state.videos}
                    renderItem={({ item }) => <Tile data={item} />}
                    keyExtractor={item => item.id.videoId}
                    ItemSeparatorComponent={<Text></Text>} />
                <Button
                    title="Insights"
                    onPress={this.gotoInsights} />
            </View>
        );
    }
}

Dashboard.contextType = MainContext;

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