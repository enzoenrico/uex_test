import prisma from "@/prisma/prisma";
import { CreateContactPayload } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { userId, contact, address }: CreateContactPayload = await req.json()

		const new_add = await prisma.address.create({
			data: {
				cep: address.cep,
				streetName: address.streetName,
				streetNumber: address.streetNumber,
				county: address.county,
				state: address.state,
				Lat: address.Lat,
				Lng: address.Lng,
				countryCode: address.countryCode,
				complement: address.complement
			}
		})

		const new_contact = await prisma.contact.create({
			data: {
				name: contact.name,
				User: {
					connect: { id: userId }
				},
				address: {
					connect: { id: new_add.id }
				}
			},
			include: {
				address: true // pra também retornar o novo endereço criado
			}
		})
		return NextResponse.json(new_contact)
	} catch (error) {
		console.error(error)
		return NextResponse.json({ message: "erro no servidor!!" }, { status: 500 })
	}
}