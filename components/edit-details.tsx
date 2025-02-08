import { Box, Button, Stack, TextareaAutosize, TextField, Typography } from '@mui/material'

interface OverlayProps {
	setOverlayVisibility: (b: boolean) => void
}

export default function FormOverlay({ setOverlayVisibility }: OverlayProps) {
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
				<Typography variant="h6">Contact Details</Typography>
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
				<Button
					variant="contained"
					type="submit"
					sx={{ width: 'fit-content' }}
				>
					Submit
				</Button>
			</Stack>
		</Box>
	)
}