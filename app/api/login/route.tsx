import prisma from "@/prisma/prisma"
import { NextResponse } from "next/server"
import { generateToken, setAuthCookie } from "@/utils/auth"

export async function POST(req: Request) {
	const incoming_login: {
		login_str: string,
		password: string
	} = await req.json()

	try {
		const user_info = await prisma.user.findFirst({
			where: {
				OR: [
					{ email: incoming_login.login_str },
					{ phone: incoming_login.login_str },
					{ cpf: incoming_login.login_str }
				],
			}
		})

		if (incoming_login.password === user_info?.pass) {
			const token = await generateToken({
				id: user_info.id,
				email: user_info.email
			})

			const response = NextResponse.json(
				{
					message: 'ok',
					user: { id: user_info.id, email: user_info.email }
				},
				{
					status: 200,
					headers: {
						'Content-Type': 'application/json',
					}
				}
			)

			setAuthCookie(response, token)
			console.log('Login successful, token set:', token)
			return response
		}
		return NextResponse.json({ message: 'unauthorized' }, { status: 401 })
	} catch (error) {
		return NextResponse.json({ message: 'Server error' }, { status: 500 })
	}
}