import { Component, forwardRef } from "react";
import { TextInput, StyleSheet, View } from "react-native"

import CustomButton from "./CustomButton";
import { search } from "../utils/requests";

class Search extends Component {
    constructor() {
        super();
        this.state = {
            text: "",
            value: "abcd"
        }
    }
    customButton;

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate");
        // if (nextState.value !== this.state.value) {
        //     return true;
        // }
        // return false;
    }

    componentWillUpdate() {
        console.log("componentWillUpdate");
    }

    componentDidUpdate() {
        console.log("componentDidUpdate");
    }
    
    componentWillMount() {
        console.log("componentWillMount");
    }

    componentDidMount() {
        console.log("componentDidMount");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount")
    }

    handlePress = async () => {
        const { setVideos } = this.props.videoContext;
        const { appendHistory } = this.props.historyContext;
        try {
            // this.setState({value: "abcd"});
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
        console.log("search render");
        return (
            <View>
                <TextInput style={styles.input}
                    placeholder="Type a username"
                    onChangeText={(val) => this.setState({ text: val })}
                    onSubmitEditing={this.handlePress} />
                <CustomButton
                    // ref={e => this.customButton = e}
                    onPress={this.handlePress}
                    disabled={!this.state.text} />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginBottom: 10
    }
})

export default Search;