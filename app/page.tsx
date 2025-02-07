"use client"

import { Button, Divider } from "@mui/material";
import { Stack, TextareaAutosize, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import SearchIcon from '@mui/icons-material/Search'
import { Box } from "@mui/material";
import UserCard from "@/components/user-card";
import MapView from "@/components/map-view";
import { Tlocation } from "@/types/types";

export default function Home() {
	const [msg, setMsg] = useState<string>("")

	const [mapPosition, setMapPosition] = useState<Tlocation>({ lat: 38, lon: 27 })

	useEffect(() => {
		console.log(mapPosition)
	}, [mapPosition])

	return (
		<Box
			sx={{
				width: '100vw',
				height: '100vh',
				display: "flex",
				gap: 2,
				p: 2
			}}>
			{/* left area | users */}
			<Box sx={{
				width: '30%',
				borderRadius: 1,
				borderColor: 'black',
				borderWidth: 1,
				p: 1
			}}>
				<Box sx={{
					width: 1,
					height: 1,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-around',
					gap: 1
				}}>
					<Stack sx={{
						width: 1,
						height: '90%',
						overflowY: 'scroll',
						gap: 1,
						p: 1
					}}>
						{
							[...Array(16)].map((v, index) => (
								<Stack
									key={index}
									sx={{
										width: 1,
										gap: 1
									}}>
									<UserCard
										name="Lorem Ipsum"
										description="Placeholder"
										image_url="/public/globe.svg"
										location={{ lat: 53.54, lon: 10 }}
										setLocation={setMapPosition}
									/>

									{/* pra no último elemento não ter um divider em baixo */}
									{index < 15 && <Divider sx={{ width: '100%' }} variant="fullWidth" />}
								</Stack>
							))
						}
					</Stack>

					<Divider sx={{ width: '100%' }} variant="middle" />

					{/* logged user area */}
					<Stack sx={{
						width: 1,
						maxHeight: 0.1
					}}>
						{/* mudar esse componente pra ser um standalone */}
						<UserCard
							name="logged user"
							description="change the description for it"
							image_url="/public/globe.svg"
						/>

					</Stack>

				</Box>
			</Box>
			{/* map area | user interaction (mostly) */}
			<Box sx={{
				height: '100%',
				flex: 1,
				borderColor: 'black',
				borderWidth: 1,
				borderRadius: 1
			}}>
				<MapView location={mapPosition} zoom={5} />
			</Box>
		</Box>
	)
}