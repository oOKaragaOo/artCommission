
export const checkSession = async (setSessionUser) => {
    try {
        const res = await fetch("http://localhost:8080/auth/session", {
            method: "GET",
            credentials: "include",
        });

        if (res.ok) {
            const data = await res.json();

            // if (data.user) {
            //     // ดึงข้อมูลจาก database โดยใช้ user.id หรือ email
            //     const userRes = await fetch(`http://localhost:8080/auth/user/${data.user.id}`, {
            //         method: "GET",
            //         credentials: "include",
            //     });
            //
            //     if (userRes.ok) {
            //         const userData = await userRes.json();
                    setSessionUser(data); // ✅ map ข้อมูลจาก database
                    console.log("Session User:", data);
            //     } else {
            //         setSessionUser(null);
            //     }
            // }
        } else {
            setSessionUser(null);
        }
    } catch (err) {
        console.error("Session check failed:", err);
        setSessionUser(null);
    }
};

export const refreshProfile = async () => {
    try {
        const res = await fetch("http://localhost:8080/user/profile", {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to refresh profile");

        const data = await res.json();
        return data.user;
    } catch (err) {
        console.error("Error refreshing profile:", err);
        return null;
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

export const getProfile = async () => {
    try {
        const response = await fetch('http://localhost:8080/user/profile', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const contentType = response.headers.get("content-type");
        console.log("Content-Type:", contentType);

        if (!contentType || !contentType.includes("application/json")) {
            const errorText = await response.text();
            console.error("❌JSON:", errorText);
            return { error: "Server response is not JSON." };
        }

        const data = await response.json();
        console.log("Response Data:", data);

        if (!response.ok) {
            return { error: data.error || "Unauthorized Access" };
        }
        return data;
    } catch (err) {
        console.error("⚠️ Error during fetching profile:", err);
        return { error: "Unable to connect to the server." };
    }
};

export const getFeedProfile = async (postId, setPost, setError) => {
    try {
        const response = await fetch(`http://localhost:8080/user/posts/${postId}`);

        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.error);
        } else {
            const data = await response.json();
            setPost(data);
        }
    } catch (err) {
        console.error("Error in getFeedProfile: ", err);
        setError("Something went wrong!");
    }
};

export const createPost = async ({ caption, imageUrl }) => {
try {
  const response = await fetch("http://localhost:8080/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // สำคัญมากถ้าใช้ session login
    body: JSON.stringify({
      caption,
      imageUrl,
    }),
  });

  const result = await response.json();

  if (response.ok) {
    console.log("✅ Post created:", result);
    return { success: true, data: result };
  } else {
    console.error("❌ Failed to create post:", result.error);
    return { success: false, error: result.error };
  }
} catch (error) {
  console.error("⚠️ Network error:", error);
  return { success: false, error: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้" };
}
};

export const commentPost = async (postId, content) => {
try { console.log(postId, "Teeeeeeeeeee")
  const response = await fetch(`http://localhost:8080/posts/${postId}/comment`, {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // ใช้ session จาก browser
    body: JSON.stringify({ content }),
  });

  const result = await response.json();

  if (response.ok) {
    console.log("✅ Comment added:", result);
    return { success: true, data: result };
  } else {
    console.error("❌ Failed to comment:", result.error);
    return { success: false, error: result.error };
  }
} catch (error) {
  console.error("⚠️ Network error:", error);
  return { success: false, error: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้" };
}
};
  