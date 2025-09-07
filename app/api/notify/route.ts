import { sendFrameNotification } from "@/lib/notification-client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!process.env.REDIS_URL || !process.env.REDIS_TOKEN) {
    console.error("Redis not configured, notifications disabled.");
    return NextResponse.json(
      { error: "Redis not configured, notifications disabled." },
      { status: 500 },
    );
  }

  try {
    const { fid, title, body } = await request.json();
    await sendFrameNotification({ fid, title, body });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notification error:", error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 },
    );
  }
}