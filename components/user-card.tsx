"use client"
import { Tlocation } from "@/types/types"
import { PersonPinCircle } from "@mui/icons-material"
import { Avatar, Card, Stack, Typography } from "@mui/material"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"

interface UserCardProps {
	name: string
	image_url: string
	description: string
	location: TLocation
	// mostrar a posição no mapa
	setLocation: (l: Tlocation) => void
}

export default function UserCard({ name, image_url, description, location, setLocation }: UserCardProps) {
	const [details, setDetails] = useState<boolean>(false)

	return (
		<Card sx={{
			width: '100%',
			minHeight: '3rem',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-evenly',
			cursor: 'pointer',
			p: 2,
			":hover": { bgcolor: 'gray', borderColor: 'blue', borderWidth: 1, }
		}}
			//  show editing and interactions on hover
			onMouseEnter={() => {
				setDetails(true)
				setLocation(location)
			}}
			onMouseLeave={() => setDetails(false)}
		>
			<Avatar sx={{
				mr: 2
			}}
				src={'/public/vercel.svg'}
				// a alt pode ser o user name, pra puxar a primeira letra como icone de fallback
				alt={name}
			/>
			<Stack>
				<Typography variant="body1">
					{name}
				</Typography>
				<Typography variant="body2">
					{description}
				</Typography>
			</Stack>

			{details ? (<PersonPinCircle />) : <p>no</p>}

		</Card>


	)
}