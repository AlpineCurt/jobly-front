import React, { useState } from "react";
import CurrentUserContext from "./CurrentUserContext";
import { useHistory } from "react-router-dom";
import JoblyApi from "./api.js";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

const CurrentUserProvider = ({children}) => {
    const [currUser, setCurrUser] = useState(null);
    const [token, setToken] = useState(null);
    const history = useHistory();

    const login = async (username, password) => {
        try {
            const res = await JoblyApi.login(username, password);
            setToken(res);
            setCurrUser(username);
            JoblyApi.token = res;
            history.push("/");
        } catch (error) {
            throw error;
        }
    }

    const logout = () => {
        setCurrUser(null);
        setToken("");
        history.push("/");
    }

    const register = async (formData) => {
        try {
            const res = await JoblyApi.register(formData);
            setToken(res);
            setCurrUser(formData.username);
            JoblyApi.token = res;
            history.push("/");
        } catch (error) {
            throw error;
        }
    }

    return (
        <CurrentUserContext.Provider value={{currUser, token, login, logout, register}}>
            {children}
        </CurrentUserContext.Provider>
    );
}

export default CurrentUserProvider;