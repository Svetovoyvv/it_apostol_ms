import {useState} from "react";
import {useMediaQuery, useTheme} from "@mui/material";

const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
        } catch (error) {
        return initialValue;
        }
    })
    const setValue = value => {
        try {
        let valueToStore =
            value instanceof Function ? value(storedValue) : value;
        if (value === null) {
            valueToStore = initialValue;
        }
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
        }
    };
    return [storedValue, setValue];
}

const useIsMobile = () => {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.down('md'));
}
export {
    useLocalStorage,
    useIsMobile,
};