import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function middleware(request: NextRequest) {
	const token = request.cookies.get('uex_maps')?.value
	const { pathname } = request.nextUrl

	const publicRoutes = ['/login', '/signup', '/api/login', '/api/signup']
	if (publicRoutes.includes(pathname)) {
		return NextResponse.next()
	}

	const protectedPaths = ['/', '/profile', '/api/protected']
	const isProtectedPath = protectedPaths.some(path =>
		pathname.startsWith(path)
	)

	if (isProtectedPath) {
		if (!token) {
			return NextResponse.redirect(new URL('/login', request.url))
		}
		try {
			const { payload } = await jose.jwtVerify(token, JWT_SECRET)
			console.log('JWT Válido', payload)
			const response = NextResponse.next()
			//id do user no header da request
			response.headers.set('x-user-id', payload.userId as string)
			return response
		} catch (error) {
			console.error('JWT inválido', error)
			return NextResponse.redirect(new URL('/login', request.url))
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/',
		'/profile/:path*',
		'/api/protected/:path*',
		'/login',
		'/signup'
	]
}
