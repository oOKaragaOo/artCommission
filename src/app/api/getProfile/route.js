// "use client";
// import React, { createContext, useState, useEffect } from "react";
// import { getProfile } from "../route";
//
// export const ProfileContext = createContext();
//
// export const ProfileProvider = ({ children }) => {
//     const [ profileUser, setProfileUser] = useState(null);
//
//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 await getProfile(setProfileUser);
//             } catch (error) {
//                 console.error("Error fetching session:", error);
//             }
//         };
//         fetchProfile();
//     }, []);
//
//     return (
//         <ProfileContext.Provider value={{ profileUser, setProfileUser }}>
//             {children}
//         </ProfileContext.Provider>
//     );
// };
