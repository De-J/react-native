import axios from "axios";
import { YOUTUBE_API_KEY } from "@env";

const instance = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    responseType: "json"
})

export const search = async (query, type, channelId = "") => {

    const params = {
        key: YOUTUBE_API_KEY,
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
        key: YOUTUBE_API_KEY,
        part: "snippet,statistics",
        id: videoIds
    };

    return instance("/videos", {params: params});
}