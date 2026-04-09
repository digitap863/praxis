import { generateAdminToken } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { email, password } = await req.json();
    if (!email && !password) {
      return NextResponse.json(
        { success: false, message: "email and password is required" },
        { status: 400 }
      );
    }
    const trimmedEmail = email?.trim();

    if (
      trimmedEmail !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 400 }
      );
    }

    const accessToken = generateAdminToken(email);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    (await cookies()).set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: expiresAt,
    });

    return Response.json({
      success: true,
      message: "Login successful",
      admin: email,
    });
  } catch (error) {
    console.error("Error in Loggin:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return new NextResponse("Error in Loggin: " + error, {
      status: 400,
    });
  }
};