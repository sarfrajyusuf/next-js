import connectDB from "@/config/db";
import User from "@/models/userModel";
import sendEmail from "@/helpers/mailer";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
connectDB();
/**
 * The function handles user registration by creating a new user, hashing the password, and sending a
 * verification email.
 * @param {NextRequest} req - The `req` parameter in the `POST` function represents the incoming
 * request object in Next.js. It contains information about the HTTP request made to the server, such
 * as headers, body, method, and query parameters. In this case, it is specifically a `NextRequest`
 * object, which is
 * @returns a JSON response with different messages and status codes based on the conditions met during
 * the registration process. Here are the possible return scenarios:
 */
export async function POST(req: NextRequest) {
  try {
    const {
      username,
      email,
      password,
    }: { username: string; email: string; password: string } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({
        message: "All fields are required",
        status: 400,
      });
    }

    const isExist = await User.findOne({ email });
    if (isExist) {
      return NextResponse.json({
        message: "User Already Exists!",
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await sendEmail({ email, emailType: "VERIFY", userId: user._id });

    return NextResponse.json({
      message: "User Successfully Registered!",
      status: 201,
      body: { user },
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
