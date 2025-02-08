import { NextResponse } from "next/server";

export function GET() {
	const good = NextResponse.json({ message: 'ok' }, { status: 200 })
	const bad = NextResponse.json({ message: 'not ok' }, { status: 400 })
	const c = Math.random()
	return c < 0.5? good : bad
}