import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { changeVidId } from "../slices/videoSlice";

const Tile = ({ data }) => {
    const selected = useSelector((state) => state.videoId.value);
    const dispatch = useDispatch();

    const obj = data.snippet.thumbnails.medium;
    const imgData = {
        uri: obj.url,
        height: obj.height,
        width: obj.width
    }

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);


    return (
        <TouchableOpacity onPress={() => dispatch(changeVidId(data.id.videoId))}>
            <View style={styles.container}>
                <Text style={styles.text}>{data.snippet.title}</Text>
                {(selected !== data.id.videoId || selected === "") && <Image source={imgData} />}
                {(selected === data.id.videoId) && 
                    
                    <YoutubePlayer
                        height={200}
                        play={true}
                        videoId={`${data.id.videoId}`}
                        onChangeState={onStateChange}
                    />
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#dddddd",
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 10
    },
    text: {
        fontFamily: "sf-pro-disp",
    },
    thumbnail: {
        height: 200
    }
})

export default Tile;