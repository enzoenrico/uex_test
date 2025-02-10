import { Box, Button, CircularProgress, Stack, TextareaAutosize, TextField, Typography } from '@mui/material'
import SearchBar from './search-bar'
import React, { useEffect, useState } from 'react'
import { CreateContactPayload } from '@/types/types'
import { useSession } from '@/utils/use-session'

interface OverlayProps {
	setOverlayVisibility: (b: boolean) => void
}

export default function FormOverlay({ setOverlayVisibility }: OverlayProps) {
	const { user, loading } = useSession()
	const [selectedAdd, setSelectedAdd] = useState<google.maps.places.PlaceResult | null>()
	const handlePlaceChange = (place: google.maps.places.PlaceResult) => {
		setSelectedAdd(place)
	}

	const [payloadLoading, setPayloadLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!user) {
			// not authed
			return
		}
		console.log('Running payload')
		setPayloadLoading(true)
		const formElement = e.target as HTMLFormElement;
		const formData = new FormData(formElement);
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;

		if (!selectedAdd || !name || !email) return;

		// isso aqui ta absurdo de feio.
		const payload: CreateContactPayload = {
			userId: user.userId,
			contact: {
				name,
				email
			},
			address: {
				streetName: selectedAdd.formatted_address || '',
				streetNumber: Number(selectedAdd.address_components?.find(c => c.types.includes('street_number'))?.long_name) || null,
				county: selectedAdd.address_components?.find(c => c.types.includes('administrative_area_level_2'))?.long_name || '',
				state: selectedAdd.address_components?.find(c => c.types.includes('administrative_area_level_1'))?.long_name || '',
				Lat: selectedAdd.geometry?.location?.lat() || 0,
				Lng: selectedAdd.geometry?.location?.lng() || 0,
				countryCode: selectedAdd.address_components?.find(c => c.types.includes('country'))?.short_name || '',
				cep: Number(selectedAdd.address_components?.find(c => c.types.includes('postal_code'))?.long_name) || 0,
				complement: ''
			}
		}
		const response = await fetch('/api/contacts', {
			method: 'POST',
			body: JSON.stringify(payload)
		})
		if (response.ok) {
			console.log('created successfully')

		}
		setPayloadLoading(false)

	}

	return (
		<Box sx={{
			position: 'absolute',
			top: 16,
			left: 16,
			width: '400px',
			bgcolor: 'background.paper',
			borderRadius: 1,
			boxShadow: 3,
			zIndex: 1000
		}}>
			<Stack
				component="form"
				onSubmit={(e) => handleSubmit(e)}
				sx={{
					width: 1,
					gap: 2,
					p: 2
				}}
			>
				<Typography variant="h6">Contact Details</Typography>

				<TextField
					name="name"
					label="Name"
					variant="outlined"
					fullWidth
				/>
				<TextField
					name="email"
					label="Email"
					type="email"
					variant="outlined"
					fullWidth
				/>

				<SearchBar setSelectedPlace={handlePlaceChange} />
				{payloadLoading ?
					(<CircularProgress />)
					: (< Button
						variant="contained"
						sx={{ width: 'fit-content' }}
						type='submit'
					// onClick={(e) => handleSubmit(e)}
					>
						Submit
					</Button>
					)
				}
			</Stack>
		</Box >
	)
}