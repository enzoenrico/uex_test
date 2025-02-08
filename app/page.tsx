"use client"

import { Button, ButtonGroup, Divider, Typography } from "@mui/material";
import { Stack, TextareaAutosize, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import SearchIcon from '@mui/icons-material/Search'
import { Box } from "@mui/material";
import UserCard from "@/components/user-card";
import MapView from "@/components/map-view";
import { Tlocation } from "@/types/types";
import { AddCircle, Filter } from "@mui/icons-material";
import FormOverlay from "@/components/edit-details";
import { MapCameraProps } from "@vis.gl/react-google-maps";

const initialCameraState = {
	center: { lat: 54.7, lng: 12 },
	zoom: 10
}

export default function Home() {
	// init params
	const [mapCameraCenter, setMapCameraCenter] = useState<google.maps.LatLng>(initialCameraState.center)
	const [zoom, setZoom] = useState<number>(initialCameraState.zoom)

	useEffect(() => {
		console.log(mapCameraCenter)
	}, [mapCameraCenter])

	// overlay de cadastro / edição de contatos
	const [isOverlayVisible, setOverlayVisibility] = useState<boolean>(false)

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
				minWidth: '20%',
				maxWidth: '25%',
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
					{/* top part com filtros e Add user */}
					<Box sx={{
						width: 1,
						height: 0.1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-around'
					}}>
						<Button size="medium" variant="contained" type="button" sx={{
							gap: 1
						}}
							onClick={() => setOverlayVisibility(true)}
						>
							<AddCircle />
							<Typography variant="button" >Add a Contact </Typography>
						</Button>
						{/* TODO */}
						{/* Add the filters here */}
						<ButtonGroup variant="contained" size="medium" sx={{ width: 0.4 }}>
							<Button onClick={() => setMapCameraCenter({ lat: 10, lng: 10 })}>
								<Filter />
							</Button>
							<Button>
								<Filter />
							</Button>
							<Button>
								<Filter />
							</Button>
						</ButtonGroup>
					</Box>
					<Stack sx={{
						width: 1,
						height: '90%',
						overflowY: 'scroll',
						gap: 1,
						p: 1
					}}>
						{/* map de usuários | placeholder até implementar o banco */}
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
				height: 1,
				display: 'flex',
				flex: 1,
				borderColor: 'black',
				borderWidth: 1,
				borderRadius: 1,
			}}>
				<Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
					<Box sx={{ width: '100%', height: '100%' }}>
						<MapView zoom={zoom} setZoom={setZoom} mapCenter={mapCameraCenter} setMapCenter={setMapCameraCenter} />
					</Box>
					{/* overlay pra editar os contatos */}
					{isOverlayVisible && <FormOverlay />}
				</Box>

			</Box>
		</Box>
	)
}