import React, { useState, useEffect } from "react";
import CurrentUserContext from "./CurrentUserContext";
import { useHistory } from "react-router-dom";
import JoblyApi from "./api.js";
import jwtDecode from "jwt-decode";

const CurrentUserProvider = ({children}) => {
    const [currUser, setCurrUser] = useState(null);  // crashes if set to {}
    const [token, setToken] = useState(null);
    const history = useHistory();

    // after first render, check local storage for token
    useEffect(() => {
        async function getUserInfo () {
            const userToken = localStorage.getItem("joblyToken");
            if (userToken) {
                try {
                    setToken(userToken);
                    JoblyApi.token = userToken;
                    const {username} = jwtDecode(userToken);
                    const res = await JoblyApi.getCurrentUser(username);
                    // works upto here.  
                    // debugger;
                    // setCurrUser(res);  // crashes here.  Why can't I set this to an object?
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getUserInfo();
        console.log("currUser: ", currUser);
    }, []);

    const login = async (username, password) => {
        try {
            const res = await JoblyApi.login(username, password);
            setToken(res);
            setCurrUser(username);
            JoblyApi.token = res;
            localStorage.setItem("joblyToken", res);
            //localStorage.setItem("joblyUsername", username);
            history.push("/");
        } catch (error) {
            throw error;
        }
    }

    const logout = () => {
        setCurrUser(null);
        setToken("");
        localStorage.removeItem("joblyToken");
        localStorage.removeItem("joblyUsername");
        history.push("/");
    }

    const register = async (formData) => {
        try {
            const res = await JoblyApi.register(formData);
            setToken(res);
            setCurrUser(formData.username);
            JoblyApi.token = res;
            localStorage.setItem("joblyToken", res);
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