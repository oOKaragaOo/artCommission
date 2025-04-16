

export const checkSession = async (setSessionUser) => {
    try {
        const res = await fetch("http://localhost:8080/auth/session", {
            method: "GET",
            credentials: "include",
        });

        if (res.ok) {
            const data = await res.json();

            if (data.user) {
                // ดึงข้อมูลจาก database โดยใช้ user.id หรือ email
                const userRes = await fetch(`http://localhost:8080/auth/user/${data.user.id}`, {
                    method: "GET",
                    credentials: "include",
                });

                if (userRes.ok) {
                    const userData = await userRes.json();
                    setSessionUser(userData); // ✅ map ข้อมูลจาก database
                    console.log("Session User:", userData);
                } else {
                    setSessionUser(null);
                }
            }
        } else {
            setSessionUser(null);
        }
    } catch (err) {
        console.error("Session check failed:", err);
        setSessionUser(null);
    }
};


export const refreshProfile = async (setSessionUser) => {
    try {
        const res = await fetch("http://localhost:8080/user/profile", {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            console.error("Failed to refresh profile");
            return;
        }

        const data = await res.json();
        setSessionUser(data.user);
    } catch (err) {
        console.error("Error refreshing profile:", err);
    }
};


export const loginUser = async (email, password) => {
    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const errorText = await response.text();
            console.error("❌JSON:", errorText);
            return { error: "Server response is not JSON." };
        }

        const data = await response.json();

        if (!response.ok) {
            return { error: data.message || "Invalid Credentials" };
        }
        return data;
    } catch (err) {
        console.error("⚠️ Error during login:", err);
        return { error: "Unable to connect to the server." };
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await fetch("http://localhost:8080/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const data = await response.json();
            return { error: data.message || "User registration failed" };
        }

        return await response.json();
    } catch (error) {
        console.error("Error in registerUser: ", error);
        return { error: "Unable to connect to the server." };
    }
};

export const registerNewUser = async (name, email, password, confPassword, role) => {
    if (password !== confPassword) {
        return { error: "Passwords don't match" };
    }

    if (!name || !email || !password || !role) {
        return { error: "Please complete all fields" };
    }

    return await registerUser({ name, email, password, role });
};