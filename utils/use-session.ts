import { useEffect, useState } from 'react';
import { JWTPayload } from './auth';
export function useSession() {
	const [user, setUser] = useState<JWTPayload | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchSession() {
			const response = await fetch('/api/auth/session')
			if (response.ok) {
				const data = await response.json()
				setUser(data.user)
			}
			// preciso adicionar error handling
		}
		fetchSession()
	}, [])
	return { user, loading }

}