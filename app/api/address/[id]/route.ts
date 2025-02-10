import prisma from '@/prisma/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const p_a = await params
	const addressId = p_a.id
	console.log(`Fetching for ${addressId}`)

	try {
		console.log(`Fetching address with id: ${addressId}`)
		const address = await prisma.address.findFirst({
			where: {
				id: addressId
			}
		})

		return NextResponse.json(
			address,
			{ status: 200 }
		)
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch address' },
			{ status: 500 }
		)
	}
}