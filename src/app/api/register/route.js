// import {NextResponse} from "next/server";
// import {connectMongoDB} from "../../../../lib/mongodb";
// import User from "../../../../models/User";
// import bcrypt from "bcryptjs";
//
// export const POST = async (req) => {
//     try {
//         const { name, email, password , role } = await req.json();
//
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);
//         // Connect... to MongoDB
//         await connectMongoDB();
//         // Create the user #== Sign In ==#
//         await User.create({ name, email, password: hashedPassword , role });
//
//         return NextResponse.json({ message: "User registered." }, { status: 201 });
//     } catch (error) {
//         console.error("Error during user registration:", error);
//         return NextResponse.json({ message: "An error occurred while registering the user." }, { status: 500 });
//     }
// };