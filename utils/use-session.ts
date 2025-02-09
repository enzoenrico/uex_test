import { useEffect, useState } from 'react';
import { JWTPayload } from './auth';
export function useSession() {
	const [user, setUser] = useState<JWTPayload | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchSession() {
			const response = await fetch('/api/auth/session')
			console.log(response)
			if (response.ok) {
				const data: JWTPayload = await response.json()
				console.log(data)
				setUser(data)
			}
			// preciso adicionar error handling
		}
		fetchSession().then(r => console.log(r))
	}, [])
	return { user, loading }

}