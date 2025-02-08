import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma"
import { User } from "@prisma/client";

interface endpoint_body {
	user_info: User
}

export async function POST(req: Request) {
	const data = await req.json();
	const new_user: User = data.user_info

	try {
		const user_entry = await prisma.user.create({
			data: new_user
		})
	} catch (error)[
		console.error(error)
		return NextResponse.json(
			{ message: "Erro criando o usuario" },
			{ status: 500 }

}
