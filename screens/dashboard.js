import { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";

// import response from "../dummydata.json"

import Search from "../components/Search";
import VideoList from "../components/VideoList";

const Dashboard = ({ navigation }) => {
    const myRef = useRef(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        myRef.current.changeTitle("Submit");
    }, [])
    

    const gotoInsights = () => {
        navigation.navigate("Insights", { vidData: videos });
    }

    return (
        <View style={styles.container}>
            <Search ref={myRef}/>
            <VideoList />
            <Button
                title="Insights"
                onPress={gotoInsights} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    searchBox: {
        marginBottom: 10
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        fontFamily: "sf-pro-disp"
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginBottom: 10
    },
})

export default Dashboard;