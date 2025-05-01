export const getUserById = async (userId) => {
    try {
        const res = await fetch(`http://localhost:8080/user/${userId}`, {
            credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "User not found");
        return data.user;
    } catch (err) {
        console.error("getUserById error:", err);
        return null;
    }
};
