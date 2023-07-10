import { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const History = () => {
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        loadSearchHistory();
    });

    const loadSearchHistory = async () => {
        try {
            const data = await AsyncStorage.getItem('searchHistory');
            const history = JSON.parse(data);

            let filt_hist = []
            if (history !== null) {
                let id = 0;
                for (const key in history) {
                    if (typeof history[key] === 'number') {
                        filt_hist.push({
                            id,
                            text: key,
                            count: history[key]
                        })
                        id++;
                    }
                }
                setSearchHistory(filt_hist);
            }
            // console.log(filt_hist);
        }
        catch (error) {
            console.log('Error loading search history:', error);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={searchHistory}
                renderItem={({ item }) => <ListItem text={item.text} count={item.count} />}
                keyExtractor={item => item.id} />
        </View>
    );
}

const ListItem = ({text, count}) => {
    return (
        <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.text}>{count}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        padding: 20
    },
    text: {
        fontFamily: "sf-pro-disp",
        // borderWidth: 2,
        // borderColor: "red",
        fontSize: 16,
        marginBottom: 10
    },
})

export default History;