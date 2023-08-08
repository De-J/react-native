import { useContext } from 'react';
import { FlatList, Text } from "react-native";

import MainContext from '../contexts/mainContext';
import Tile from './Tile';

const VideoList = () => {
    const { videos } = useContext(MainContext);
    return (
        <FlatList
            data={videos}
            renderItem={({ item }) => <Tile data={item} />}
            keyExtractor={item => item.id.videoId}
            ItemSeparatorComponent={<Text></Text>} />
    )
}

export default VideoList;
