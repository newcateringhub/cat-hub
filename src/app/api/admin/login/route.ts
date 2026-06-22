import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (
      body.username === process.env.ADMIN_USERNAME &&
      body.password === process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json({
        success: true,
      });
    }

    return NextResponse.json(
      {
        error: "Invalid credentials",
      },
      {
        status: 401,
      }
    );
  } catch {
    return NextResponse.json(
      {
        error: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}