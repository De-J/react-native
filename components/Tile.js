import { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const Tile = ({data}) => {

    const [playing, setPlaying] = useState(false);
    
    const onStateChange = useCallback((state) => { 
        if (state === "ended") { 
            setPlaying(false);
        } 
    }, []);


    return (
        <View>
            <Text style={styles.text}>{data.snippet.title}</Text>
            <YoutubePlayer
                height={200}
                play={playing}
                videoId={`${data.id.videoId}`}
                onChangeState={onStateChange}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "sf-pro-disp",
    }
})

export default Tile;