import { useSelector } from "react-redux";
import { View, Text, FlatList, StyleSheet } from "react-native";

const History = () => {
    const history = useSelector(state => state.history.histObj);

    console.log(history);

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
    console.log(arr);
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