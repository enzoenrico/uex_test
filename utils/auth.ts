import { NextRequest, NextResponse } from 'next/server'
import * as jose from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)
const COOKIE_NAME = 'uex_maps'

if (!JWT_SECRET) {
	throw new Error('JWT não encontrado no .env')
}

// o que é enviado junto com o jwt
export interface JWTPayload {
	userId: string;
	email: string;
}

export async function verifyAuth(request: NextRequest) {
	const token = request.cookies.get(COOKIE_NAME)?.value
	if (!token) {
		return null
	}

	try {
		const { payload } = await jose.jwtVerify(token, JWT_SECRET)
		return payload as JWTPayload
	} catch (error) {
		return null
	}
}

export async function generateToken(user: { id: string, email: string }) {
	const token = await new jose.SignJWT({
		userId: user.id,
		email: user.email
	})
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('24h') // 1dia
		.sign(JWT_SECRET)

	return token
}

export function setAuthCookie(response: NextResponse, token: string) {
	response.cookies.set(COOKIE_NAME, token, {
		httpOnly: true,
		// caso rode em prod
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 86400 // 1 dia
	})
}

export function withAuth(handler: Function) {
	// wrapper pra outros handlers de rota
	// pra nao ter que reescrever o mesmo código em todas as rotas que precisam de auth
	return async (request: NextRequest) => {
		const user = await verifyAuth(request)

		if (!user) {
			return NextResponse.json(
				{ message: 'Unauthorized' },
				{ status: 401 }
			)
		}

		const req = request as NextRequest & { user: JWTPayload }
		req.user = user

		return handler(req)
	}
}
