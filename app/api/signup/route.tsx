import prisma from "@/prisma/prisma"
import { NextResponse } from "next/server"
import { generateToken, setAuthCookie } from "@/utils/auth"
import { Address, User } from '@prisma/client';

export async function POST(req: Request) {
	const { user, address }: { user: User, address: Address } = await req.json()


	try {
		//endereço first pra poder linkar ele com o user
		const newAdd = await prisma.address.create({
			data: address
		})

		const newUser = await prisma.user.create({
			data: {
				...user,
				addressId: newAdd.id
			}
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
		console.error(error)
		return NextResponse.json(
			{ message: 'Error creating user' },
			{ status: 500 }
		)
	}
}