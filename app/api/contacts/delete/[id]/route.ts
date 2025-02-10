import prisma from "@/prisma/prisma"
import { NextResponse } from "next/server"

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const p = await params
		if (!p?.id) {
			return NextResponse.json(
				{ error: 'ID não encontrado' },
				{ status: 400 }
			)
		}

		const deletedContact = await prisma.contact.delete({
			where: {
				id: p.id
			}
		})
		return NextResponse.json(
			{ message: 'ok' },
			{ status: 200 }
		)
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: 'erro server' },
			{ status: 500 }
		)
	}
}