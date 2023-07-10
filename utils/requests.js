import axios from "axios";

const API_KEY = "";
// put this in .env after finding a suitable react-native package

export const search = (query, type, channelId = "") => {

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

    const instance = axios.create({
        baseURL: "https://www.googleapis.com/youtube/v3/search",
        params: params,
        responseType: "json"
    });

    return instance;
}

export const getVideoStats = (videoIds) => {
    
    const params = {
        key: API_KEY,
        part: "snippet,statistics",
        id: videoIds
    };
    
    const instance = axios.create({
        baseURL: "https://www.googleapis.com/youtube/v3/videos",
        params: params,
        responseType: "json"
    });

    return instance;
}