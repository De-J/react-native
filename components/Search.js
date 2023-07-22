import { Component } from "react";
import { TextInput, StyleSheet, View } from "react-native"

import CustomButton from "./CustomButton";
import { search } from "../utils/requests";
import MainContext from "../contexts/mainContext";

class Search extends Component {
    constructor() {
        super();
        this.state = {
            text: ""
        }
    }

    handlePress = async () => {
        const { setVideos, appendHistory } = this.context;
        try {
            appendHistory(this.state.text);
            let res = await search(this.state.text, "channel");

            // extract channel id from initial search
            const channelId = res.data.items[0].id.channelId;

            // search for videos of above channelId
            res = await search(this.state.text, "video", channelId);
            setVideos(res.data.items);
        }
        catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <View>
                <TextInput style={styles.input}
                    placeholder="Type a username"
                    onChangeText={(val) => this.setState({ text: val })}
                    onSubmitEditing={this.handlePress} />
                <CustomButton
                    ref={this.props.reference}
                    onPress={this.handlePress}
                    disabled={!this.state.text} />
            </View>
        )
    }
}

Search.contextType = MainContext;

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginBottom: 10
    }
})

export default Search;