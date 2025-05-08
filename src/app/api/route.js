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
    const response = await fetch("http://localhost:8080/auth/login", {
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

export const registerNewUser = async (
  name,
  email,
  password,
  confPassword,
  role
) => {
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
    const response = await fetch("http://localhost:8080/user/profile", {
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

export const getOtherProfile = async () => {
  try {
    const response = await fetch("http://localhost:8080/user/profile", {
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
  try {
    console.log(postId, "Teeeeeeeeeee");
    const response = await fetch(
      `http://localhost:8080/posts/${postId}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ใช้ session จาก browser
        body: JSON.stringify({ content }),
      }
    );

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

export const likePost = async (postId) => {
  try {
    const response = await fetch(`http://localhost:8080/posts/${postId}/like`, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Like failed");
    return { success: true };
  } catch (err) {
    console.error("Like error:", err);
    return { success: false, error: err.message };
  }
};

export const unlikePost = async (postId) => {
  try {
    const response = await fetch(`http://localhost:8080/posts/${postId}/like`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Unlike failed");
    return { success: true };
  } catch (err) {
    console.error("Unlike error:", err);
    return { success: false, error: err.message };
  }
};

export async function getAllPosts(setPosts, setError) {
  try {
    const res = await fetch("/api/posts", {
      method: "GET",
      credentials: "include", // เพื่อให้ส่ง session cookie
    });
    if (!res.ok) throw new Error("ไม่สามารถโหลดโพสต์ได้");
    const data = await res.json();
    setPosts(data);
  } catch (err) {
    console.error(err);
    setError(err.message);
  }
}

export async function getPublicCards(setCards, setError) {
  try {
    const res = await fetch("http://localhost:8080/artist/public-cards", {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("โหลด Public Cards ไม่สำเร็จ");
    const data = await res.json();
    console.log("✅ Public Cards Response:", data); // ✅ log ตรงนี้เลย!
    setCards(data);
  } catch (err) {
    console.error(err);
    setError(err.message);
  }
}

export async function createCommissionCard(formData, onSuccess, onError) {
  try {
    const res = await fetch("http://localhost:8080/artist/commission-cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("สร้าง Commission Card ไม่สำเร็จ");
    const data = await res.json();
    console.log("✅ Created Commission Card:", data); // ✅ log ตรงนี้เลย!
    onSuccess(data);
  } catch (err) {
    console.error(err);
    onError(err.message);
  }
}

export const deletePost = async (postId) => {
  try {
    const res = await fetch(`http://localhost:8080/posts/${postId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("5555555555555555555555555", res);
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: "Failed to delete post" };
  }
};

export const getAuthorProfile = async (authorId) => {
  try {
    const res = await fetch(`http://localhost:8080/user/${authorId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("5555555555555555555555555", res);
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: "Failed to get profile" };
  }
};
