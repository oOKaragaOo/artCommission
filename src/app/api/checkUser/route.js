// SessionContext.js
"use client";
import React, { createContext, useState, useEffect } from "react";
import {checkSession} from "../route";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [sessionUser, setSessionUser] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                await checkSession(setSessionUser);
            } catch (error) {
                console.error("Error fetching session:", error);
            }
        };
        fetchSession();
    }, []);

    return (
        <SessionContext.Provider value={{ sessionUser, setSessionUser }}>
            {children}
        </SessionContext.Provider>
    );
};
