import { Component } from "react";
import { TextInput, StyleSheet, View } from "react-native"

import CustomButton from "./CustomButton";
import { search } from "../utils/requests";
import VideoContext from "../contexts/videoContext";
import HistoryContext from "../contexts/historyContext";

class Search extends Component {
    constructor() {
        super();
        this.state = {
            text: ""
        }
    }

    handlePress = async () => {
        const { setVideos } = this.props.videoContext;
        const { appendHistory } = this.props.historyContext;
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

// Search.contextType = MainContext;

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginBottom: 10
    }
})

const withBothContext = MyComponent => (
    props => (
        <HistoryContext>
            {histContext =>
                <VideoContext.Consumer>
                    {vidContext => 
                        <MyComponent {...props} 
                            historyContext={histContext} 
                            videoContext={vidContext} />}
                </VideoContext.Consumer>}
        </HistoryContext>
    )
)

export default withBothContext(Search);