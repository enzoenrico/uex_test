import prisma from '@/prisma/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const param = await params
	//id do usuario pra puxar os contatos
	const contactsId = param.id
	console.log(`Fetching for ${contactsId}`)

	try {
		const contacts = await prisma.contact.findMany({
			where: {
				userId: contactsId
			}
		})

		return NextResponse.json(
			contacts,
			{ status: 200 }
		)
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch contacts' },
			{ status: 500 }
		)
	}
}
