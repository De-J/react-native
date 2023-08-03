import { useState, useContext } from "react";
import { TextInput, StyleSheet, View } from "react-native"

import CustomButton from "./CustomButton";
import { search } from "../utils/requests";
import MainContext from "../contexts/mainContext";

const Search = () => {
    const [text, setText] = useState("");

    const handlePress = async () => {
        const { setVideos, appendHistory } = useContext(MainContext);
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


    return (
        <View>
            <TextInput style={styles.input}
                placeholder="Type a username"
                onChangeText={(val) => setText(val)}
                onSubmitEditing={handlePress} />
            <CustomButton
                ref={this.props.reference}
                onPress={handlePress}
                disabled={!text} />
        </View>
    )
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