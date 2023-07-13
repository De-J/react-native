import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native"

import PieChart from "../components/PieChart";
import { getVideoStats } from "../utils/requests";

// import likeData from "../dummyLikeData.json"

const Insights = () => {
    const [data, setData] = useState([]);
    const [titles, setTitles] = useState([]);
    const route = useRoute();
    const { vidData } = route.params;
    
    const fetchVideoData = async () => {
        
        try {
            let videoIds = [], likes = [], title_arr = [];
            vidData.forEach((ele) => {
                videoIds.push(ele.id.videoId);
            });


            let res = await getVideoStats(videoIds.join());
            let acc = res.data.items;
            acc.forEach((ele) => {
                likes.push(parseInt(ele.statistics.likeCount, 10));
                title_arr.push(ele.snippet.title)
            })
            setData(likes);
            setTitles(title_arr);
        }
        
        catch (err) {
            console.error(err.response.data);
        }

    }

    useEffect(() => {
        fetchVideoData();
    }, []);


    const colors = ["green", "red", "blue", "yellow", "coral", "orange"];
    return (
        <View style={{ flex: 1, justifyContent: "center", paddingTop: 100, paddingLeft: 40, paddingRight: 40, gap: 20 }}>
            <PieChart
                data={data}
                colors={colors}
                legendData={titles}
            />
            <View style={{ flex: 1, alignSelf: "center", gap: 5 }}>
                {titles.map((ele, idx) =>
                    <View style={{ flexDirection: "row", gap: 5 }}>
                        <Text style={{ backgroundColor: colors[idx], color: colors[idx], fontFamily: "sf-pro-disp" }}>x</Text>
                        <Text style={{ fontFamily: "sf-pro-disp" }} key={idx}>{ele}: {data[idx]}</Text>
                    </View>
                )}
            </View>

        </View>
    );
}

export default Insights;