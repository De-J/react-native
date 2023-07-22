import { createContext, useState } from "react";

const MainContext = createContext({});

export const MainProvider = ({children}) => {
    const [videos, setVideos] = useState([]);
    const [history, setHistory] = useState({});
    const [selected, setSelected] = useState("");

    const appendHistory = (text) => {
        const obj = {...history}
        if (obj.hasOwnProperty(text)) {
            obj[text]++;
        } else {
            obj[text] = 1;
        }
        setHistory(obj);
    }
    
    return(
        <MainContext.Provider value={{videos, setVideos, history, appendHistory, selected, setSelected}}>
            {children}
        </MainContext.Provider>
    )
}

export default MainContext;