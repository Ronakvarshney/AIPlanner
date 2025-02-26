import dbConnect from "@/lib/dbConnect";
import User from "@/model/usermodel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const { userid } = await req.json();

    if (!userid) {
      return NextResponse.json("User ID is required", { status: 400 });
    }

    
    

    await dbConnect(); 

    const response = await User.findOne({ id: userid });


    if (!response) {
      return NextResponse.json("User not found", { status: 404 });
    }

    return NextResponse.json(response.data , { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
