import { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import HistoryContext from "../contexts/historyContext";

const History = () => {
    const { history } = useContext(HistoryContext);

    let arr = [];
    const loadHistory = () => {
        let id = 0;
        for (const key in history) {
            const obj = {
                id,
                text: key,
                count: history[key]
            }
            arr.push(obj);
            id++;
        }
    }
    loadHistory();
    return (
        <View style={styles.container}>
            <FlatList
                data={arr}
                renderItem={({ item }) => <ListItem text={item.text} count={item.count} />}
                keyExtractor={item => item.id} />
        </View>
    );
}

const ListItem = ({ text, count }) => {
    return (
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
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