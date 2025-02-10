"use client"
import { Tlocation } from "@/types/types"
import { useSession } from "@/utils/use-session"
import { PersonPinCircle } from "@mui/icons-material"
import { Avatar, Button, Card, Popover, Stack, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { Address, User } from "@prisma/client"
import { AnimatePresence } from "framer-motion"
import React, { useEffect, useState } from "react"

interface UserCardProps {
	name: string
	image_url: string
	description: string
	db_info: User
	//latlng dentro do obj Address, pra usar o mapCenter
	setAddress: (ll: Address) => void
	id?: string
}

export default function ProfileCard({ name, description, db_info, setAddress }: UserCardProps) {
	const [details, setDetails] = useState<boolean>(false)
	const [anchor, setAnchor] = useState()
	const { user, loading } = useSession()

	const handleDeletion = async (password: string) => {
		console.log(db_info.email)
		if (db_info.pass === password) {
			const deleted = await fetch(`/api/users/${db_info.id}`, {
				method: "DELETE"
			})
			if (deleted.ok) {
				console.log('amigo deletado')
			}
		}
	}

	const handleClick = async (e) => {
		setDetails(true)
		setAnchor(e.currentTarget)
		console.log(db_info)
		console.log('fetching address')
		const address_data = await fetch(`/api/address/${db_info.addressId}`)
		const j_add: Address = await address_data.json()
		setAddress(j_add)
	}

	return (
		<Card sx={{
			width: '100%',
			minHeight: '3rem',
			display: 'flex',
			alignItems: 'center',
			cursor: 'pointer',
			p: 2,
			borderWidth: 1,
			":hover": { bgcolor: 'gray', borderColor: 'blue', },
			transition: '0.25s ease-in-out'
		}}
			//  show editing and interactions on hover
			onMouseLeave={() => setDetails(false)}

			onClick={(e) => handleClick(e)}
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

			{/* {details ? (<PersonPinCircle />) : <p>no</p>} */}
			<Popover
				open={details}
				onClose={() => setDetails(false)}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				anchorEl={anchor}
			>
				<Stack spacing={2} sx={{ p: 2, minWidth: 200 }}>
					<Typography variant="body1" color="error" sx={{ fontWeight: 'medium' }}>
						Quer remover este amigo?
					</Typography>
					<Stack direction="row" spacing={1} justifyContent="flex-end">
						<Button variant="outlined" color="primary" size="small" onClick={(e) => {
							e.stopPropagation();
							setDetails(false);
						}}>
							Cancelar
						</Button>
						<Button
							variant="contained"
							color="error"
							size="small"
							onClick={(e) => {
								e.stopPropagation();
								const password = prompt("Por favor, digite sua senha para confirmar a exclusão:");
								if (password) {
									handleDeletion(password);
								}
							}}
						>
							Remover
						</Button>
					</Stack>
				</Stack>
			</Popover>
		</Card>
	)
}