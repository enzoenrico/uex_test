import { Box, Button, Stack, TextareaAutosize, TextField, Typography } from '@mui/material'
import SearchBar from './search-bar'
import { useState, useCallback } from 'react'

interface OverlayProps {
	setOverlayVisibility: (b: boolean) => void
}

export default function FormOverlay({ setOverlayVisibility }: OverlayProps) {
	const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null)


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
				sx={{
					width: 1,
					gap: 2,
					p: 2
				}}
			>
				<Typography variant="h6">Adicione um novo amigo</Typography>
				
				<TextField
					label="Name"
					variant="outlined"
					fullWidth
				/>
				<TextField
					label="Email"
					type="email"
					variant="outlined"
					fullWidth
				/>
				<TextareaAutosize
					minRows={3}
					placeholder="Description"
					style={{
						width: '100%',
						padding: '8px',
						borderRadius: '4px'
					}}
				/>
				<SearchBar />
				<Button
					variant="contained"
					sx={{ width: 'fit-content' }}
				>
					Adicionar contato
				</Button>
			</Stack>
		</Box>
	)
}