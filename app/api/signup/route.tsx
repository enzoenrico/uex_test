import prisma from "@/prisma/prisma"
import { NextResponse } from "next/server"
import { generateToken, setAuthCookie } from "@/utils/auth"

export async function POST(req: Request) {
	const userData = await req.json()

	try {
		const newUser = await prisma.user.create({
			data: userData
		})

		const token = generateToken({
			id: newUser.id,
			email: newUser.email
		})

		const response = NextResponse.json(
			{
				message: 'User created successfully',
				user: { id: newUser.id, email: newUser.email }
			},
			{ status: 201 }
		)

		setAuthCookie(response, token)
		return response

	} catch (error) {
		return NextResponse.json(
			{ message: 'Error creating user' },
			{ status: 500 }
		)
	}
}
