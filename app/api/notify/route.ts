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
    const body = await request.json();
    const { fid, notification } = body;

    const result = await sendFrameNotification({
      fid,
      title: notification.title,
      body: notification.body,
      notificationDetails: notification.notificationDetails,
    });

    if (result.state === "error") {
      return NextResponse.json(
        { error: result.error },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    );
  }
}