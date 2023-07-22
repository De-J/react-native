import { createContext, useState } from "react";

const VideoContext = createContext({});

export const VideoProvider = ({children}) => {
    const [videos, setVideos] = useState([]);
    const [selected, setSelected] = useState("");
    
    return(
        <VideoContext.Provider value={{videos, setVideos, selected, setSelected}}>
            {children}
        </VideoContext.Provider>
    )
}

export default VideoContext;