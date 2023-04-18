import React, { useState, useEffect } from "react";
import CurrentUserContext from "./CurrentUserContext";
import { useHistory } from "react-router-dom";
import JoblyApi from "./api.js";
import jwtDecode from "jwt-decode";

const CurrentUserProvider = ({children}) => {
    const [currUser, setCurrUser] = useState(null);
    const [token, setToken] = useState(null);
    const history = useHistory();
    
    // checks for token in localStorage and sets State
    async function getUserInfo (token) {
        try {
            setToken(token);
            JoblyApi.token = token;
            const {username} = jwtDecode(token);
            const res = await JoblyApi.getCurrentUser(username);
            setCurrUser(res);
        } catch (error) {
            console.log(error);
        }
    }

    // after first render, check local storage for currUser
    useEffect(() => {
        const userToken = localStorage.getItem("joblyToken");
        if (userToken && !currUser) {
            try {
                getUserInfo(userToken);
            } catch (error) {
                console.log(error);
            }
        }
    }, []);

    const login = async (username, password) => {
        try {
            const res = await JoblyApi.login(username, password);
            setToken(res);
            JoblyApi.token = res;
            localStorage.setItem("joblyToken", res);
            await getUserInfo(res);
            history.push("/");
        } catch (error) {
            throw error;
        }
    }

    const logout = () => {
        setCurrUser(null);
        setToken(null);
        localStorage.removeItem("joblyToken");
        history.push("/");
    }

    const register = async (formData) => {
        try {
            const res = await JoblyApi.register(formData);
            setToken(res);
            setCurrUser(formData);
            JoblyApi.token = res;
            localStorage.setItem("joblyToken", res);
            history.push("/");
        } catch (error) {
            throw error;
        }
    }

    /** Update a user's profile.  Returns true upon success.  Throws error otherwise */
    const userUpdate = async (username, formData) => {
        try {
            const res = await JoblyApi.profileUpdate(username, formData);
            setCurrUser({
                ...currUser,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email
            });
            return true;
        } catch (error) {
            throw error;
        }
    }

    return (
        <CurrentUserContext.Provider value={{currUser, token, login, logout, register, userUpdate}}>
            {children}
        </CurrentUserContext.Provider>
    );
}

export default CurrentUserProvider;