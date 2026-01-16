// app/api/tracking/pageview/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import UAParser from "ua-parser-js";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const headers = request.headers;

    const userAgent = headers.get("user-agent") || "";
    const referrer = headers.get("referer") || "";
    const ip = headers.get("x-forwarded-for") || "127.0.0.1";

    const parser = new UAParser(userAgent);
    const deviceInfo = parser.getResult();

    // Generate session ID if not exists
    const sessionId =
      headers.get("x-session-id") || body.sessionId || crypto.randomUUID();

    // Track page visit
    await db.pageVisit.create({
      data: {
        sessionId,
        page: body.path || "/",
        referrer,
        userAgent,
        deviceType: deviceInfo.device.type as any,
        browser: deviceInfo.browser.name,
        os: deviceInfo.os.name,
        screenSize: body.screenSize,
        country: "BD", // Default for Bangladesh
        city: "Unknown",
      },
    });

    // Track page view event
    await db.event.create({
      data: {
        type: "PAGE_VIEW",
        page: body.path || "/",
        sessionId,
        data: {
          referrer,
          device: deviceInfo.device.type,
          browser: deviceInfo.browser.name,
        },
      },
    });

    return NextResponse.json({
      success: true,
      sessionId,
      message: "Page view tracked",
    });
  } catch (error) {
    console.error("Tracking error:", error);
    return NextResponse.json(
      { success: false, message: "Tracking failed" },
      { status: 500 }
    );
  }
}
