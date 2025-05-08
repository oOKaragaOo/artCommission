export const uploadImageToCloudinary = async (file, userId) => {
    const formData = new FormData();

    const folder = `users/${userId}`; // 📁 โฟลเดอร์เฉพาะของ user
    formData.append("file", file);
    formData.append("upload_preset", "img_upload"); // 👈 upload preset ที่นายตั้ง
    formData.append("folder", folder); // 👈 ✅ จัดไฟล์เข้าโฟลเดอร์นี้

    const res = await fetch(
        "https://api.cloudinary.com/v1_1/dfih2nba0/image/upload",
        {
            method: "POST",
            body: formData,
        }
    );
    const data = await res.json();
    console.log("Hi cloudinary --> 🧑‍⚖️",data)
    if (!res.ok) throw new Error(data.error?.message || "อัปโหลดล้มเหลว");
    return data.secure_url;
};
