import dbConnect from "@/lib/dbConnect";
import User from "@/model/usermodel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    // Parse request body
    const body = await req.json();
    const { userData, aidata } = body;

    if (!userData || !aidata) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const email = userData.email;
    let user = await User.findOne({ email });

    if (user) {
      // Update user data by pushing new trip details
      user = await User.findByIdAndUpdate(
        user._id,
        { $push: { data: JSON.parse(aidata || "[]") } },
        { new: true }
      );

      return NextResponse.json({ message: "Trip added successfully", user }, { status: 200 });
    }

    // Create a new user if not found
    const newUser = new User({
      name: userData.name,
      email: userData.email,
      verifiedemail: userData.verified_email,
      picture: userData.picture,
      data: JSON.parse(aidata || "[]"),
      id: userData.id,
    });

    await newUser.save();

    console.log("User created successfully:", newUser);

    return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });

  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
