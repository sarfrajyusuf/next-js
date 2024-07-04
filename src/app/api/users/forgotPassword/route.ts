import connectDB from "@/config/db";
import sendEmail from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email } = reqBody;
    const user = await User.findOne({ email: email });
    console.log(user, "++++====::::>>");
    if (!user) {
      return NextResponse.json({
        message: "User Not Found.",
        status: 400,
        body: {},
      });
    }
    await sendEmail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json({
      message: "Check Your Email.",
      status: 200,
      body: {},
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
