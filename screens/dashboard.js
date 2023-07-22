import { Component, createRef } from 'react';
import { StyleSheet, View, Text, Button } from "react-native";

// import response from "../dummydata.json";

import Search from "../components/Search";
import VideoList from '../components/VideoList';
import MainContext from '../contexts/mainContext';

class Dashboard extends Component {
    constructor() {
        super();
        this.button = null
        this.setRef = element => {
            this.button = element
        }
    }

    componentDidMount() {
        this.button.changeTitle("search");
    };


    gotoInsights = () => {
        const { videos } = this.context;
        this.props.navigation.navigate("Insights", { vidData: videos });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchBox}>
                    <Text style={styles.label}>Username / Handle:</Text>
                    <Search reference={this.setRef} />
                </View>
                <VideoList />
                <Button
                    title="Insights"
                    onPress={this.gotoInsights} />
            </View>
        );
    }
}

Dashboard.contextType = MainContext;

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
    }
})

export default Dashboard;