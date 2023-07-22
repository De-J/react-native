import { createContext, useState } from "react";

const HistoryContext = createContext({});

export const HistoryProvider = ({ children }) => {
    const [history, setHistory] = useState({});

    const appendHistory = (text) => {
        const obj = { ...history }
        if (obj.hasOwnProperty(text)) {
            obj[text]++;
        } else {
            obj[text] = 1;
        }
        setHistory(obj);
    }

    return (
        <HistoryContext.Provider value={{ history, appendHistory }}>
            {children}
        </HistoryContext.Provider>
    )
}

export default HistoryContext;

