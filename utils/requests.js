import axios from "axios";

const API_KEY = "";
// put this in .env after finding a suitable react-native package

const instance = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    responseType: "json"
})

export const search = async (query, type, channelId = "") => {

    const params = {
        key: API_KEY,
        part: "snippet",
        type: type,
    };

    if (type === "video") {
        params["channelId"] = channelId;
        params["order"] = "viewCount";
    }
    else
        params["q"] = query;

    return instance("/search", {params: params});
}

export const getVideoStats = async (videoIds) => {
    
    const params = {
        key: API_KEY,
        part: "snippet,statistics",
        id: videoIds
    };

    return instance("/videos", {params: params});
}