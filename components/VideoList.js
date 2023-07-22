import { Component } from 'react';
import { FlatList, Text } from "react-native";

import VideoContext from '../contexts/videoContext';
import Tile from './Tile';

class VideoList extends Component {

    render() {
        const { videos } = this.context;
        return (
            <FlatList
                data={videos}
                renderItem={({ item }) => <Tile data={item} />}
                keyExtractor={item => item.id.videoId}
                ItemSeparatorComponent={<Text></Text>} />
        )
    }
}

VideoList.contextType = VideoContext;

export default VideoList;
