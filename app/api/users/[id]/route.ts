import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/prisma/prisma'

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;

		const deletedUser = await prisma.user.delete({
			where: {
				id: id
			}
		});

		// desloga o usuário apagando o cookie dele
		const cookieStore = await cookies();
		cookieStore.delete('uex_maps');

		return NextResponse.json(deletedUser, { status: 200 }).redirected('/signup');
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to delete user' },
			{ status: 500 }
		);
	}
}

export async function GET(request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = await params

		const user_info = await prisma.user.findFirst({
			where: {
				id: id
			}
		})
		if (!user_info) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}
		return NextResponse.json(user_info, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
	}
}