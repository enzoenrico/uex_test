import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const users = await prisma.user.findMany()
		if (users) {
			console.log(`returning ${users.length} users `)
			return NextResponse.json(
				users,
				{ status: 200 }
			)
		}
	} catch (error) {
		return NextResponse.json(
			{ message: "no users found :(" },
			{ status: 500 }
		)
	}
}