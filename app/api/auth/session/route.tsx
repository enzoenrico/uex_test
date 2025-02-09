import { verifyAuth } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const user = await verifyAuth(request)
	if (!user) {
		return NextResponse.json(
			{ message: "Unauthed" },
			{ status: 401 }
		)
	}
	return NextResponse.json({ user })
}