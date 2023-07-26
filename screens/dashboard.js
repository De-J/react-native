import { Component } from 'react';
import { StyleSheet, View, Text, Button } from "react-native";

// import response from "../dummydata.json";

import Search from "../components/Search";
import VideoList from '../components/VideoList';
import VideoContext from "../contexts/videoContext";
import HistoryContext from "../contexts/historyContext";

class Dashboard extends Component {
    constructor() {
        super();

    }
    myRef;

    gotoInsights = () => {
        const { videos } = this.context;
        this.props.navigation.navigate("Insights", { vidData: videos });
    }

    render() {
        return (
            <HistoryContext.Consumer>
                {histContext =>
                    <VideoContext.Consumer>
                        {vidContext =>
                            <View style={styles.container}>
                                <View style={styles.searchBox}>
                                    <Text style={styles.label}>Username / Handle:</Text>
                                    <Search 
                                        ref={(e) => this.myRef = e}
                                        historyContext={histContext} 
                                        videoContext={vidContext}/>
                                </View>
                                <VideoList />
                                <Button
                                    title="Insights"
                                    onPress={this.gotoInsights} />
                            </View>
                        }
                    </VideoContext.Consumer>}
            </HistoryContext.Consumer>
        );
    }
}

Dashboard.contextType = VideoContext;

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