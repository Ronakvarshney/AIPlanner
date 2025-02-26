import dbConnect from "@/lib/dbConnect";
import User from "@/model/usermodel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const { userData, aidata } = await req.json(); 

    if (!userData || !aidata) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const email = userData.email;
    let user = await User.findOne({ email });

    if (user) {
     
      await User.updateOne({ _id: user._id }, { $push: { data: JSON.parse(aidata) } });

      return NextResponse.json({ message: "Trip added successfully", user }, { status: 200 });
    }

   
    const newUser = await User.create({
      name: userData.name,
      email: userData.email,
      verifiedemail: userData.verified_email,
      picture: userData.picture,
      data: JSON.parse(aidata), 
      id : userData.id ,
    });

    console.log(" user created successfully:", newUser);

    return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });

  } catch (error) {
    console.error(" Error processing request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
