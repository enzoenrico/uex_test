"use client"

import { Button, ButtonGroup, CircularProgress, Divider, Typography } from "@mui/material";
import { Stack, TextareaAutosize, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import SearchIcon from '@mui/icons-material/Search'
import { Box } from "@mui/material";
import UserCard from "@/components/user-card";
import MapView from "@/components/map-view";
import { Tlocation } from "@/types/types";
import { AddCircle, EmojiPeopleTwoTone, Filter, People, PeopleOutline, PinSharp, Route } from "@mui/icons-material";
import FormOverlay from "@/components/edit-details";
import { MapCameraProps } from "@vis.gl/react-google-maps";
import { useSession } from "@/utils/use-session";
import SearchBar from "@/components/search-bar";
import { Address, User } from "@prisma/client";
import { Lock } from 'lucide-react';

const initialCameraState = {
	center: { lat: 54.7, lng: 12 },
	zoom: 10
}

export default function Home() {
	// init params
	const [mapCameraCenter, setMapCameraCenter] = useState<google.maps.LatLng>(initialCameraState.center)
	const [zoom, setZoom] = useState<number>(initialCameraState.zoom)

	const [mapPins, setMapPins] = useState<google.maps.LatLng>([])

	useEffect(() => {
		console.log(mapCameraCenter)
	})

	// overlay de cadastro / edição de contatos
	const [isOverlayVisible, setOverlayVisibility] = useState<boolean>(false)

	const handleNewCameraCenter = (a: Address) => {
		const latlng_obj = { lat: a.Lat, lng: a.Lng } as google.maps.LatLng
		console.log(`Setting center in ${a.streetName} `)
		setMapCameraCenter(latlng_obj)
		setMapPins([...mapPins, latlng_obj])
	}

	// user vindo da session
	const { user: session_user, loadingUser } = useSession()

	const [incomingUsers, setIncomingUsers] = useState<User[] | null>(null)

	useEffect(() => {
		async function fetchUsers() {
			try {
				const users = await fetch('/api/users');
				const json_users = await users.json();
				setIncomingUsers(json_users);
			} catch (error) {
				console.error("Couldn't fetch users")
			}
		}
		fetchUsers();
	}, [])

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
				width: '25%',
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
								<People />
							</Button>
							<Button>
								<Route />
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
							!incomingUsers ?
								(
									<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
										<CircularProgress />
									</Box>
								) : incomingUsers.length < 1 ? (
									<Typography>No users found</Typography>
								) : (
									incomingUsers.map((user, index) => (
										<Stack
											key={user.id}
											sx={{
												width: 1,
												gap: 1
											}}>
											<UserCard
												name={user.email}
												description={user.name || "No description"}
												image_url="/public/globe.svg"
												db_info={user}
												setAddress={(e) => handleNewCameraCenter(e)}
											/>
											{index < incomingUsers.length - 1 && <Divider sx={{ width: '100%' }} variant="fullWidth" />}
										</Stack>
									))
								)
						}
					</Stack>

					<Divider sx={{ width: '100%' }} variant="middle" />

					{/* logged user area */}
					<Stack sx={{
						width: 1,
						maxHeight: 0.1
					}}>
						{/* session user ta retornando undefined */}
						<UserCard
							name={session_user ? session_user.email : "nao "}
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
					<Box
						sx={{
							width: '100%',
							height: '100%'
						}}
					>
						<MapView
							zoom={zoom}
							setZoom={setZoom}
							mapCenter={mapCameraCenter}
							setMapCenter={setMapCameraCenter}
							pins={mapPins}
						/>
					</Box>
					{/* overlay pra editar os contatos */}
					{isOverlayVisible ? (<FormOverlay setOverlayVisibility={setOverlayVisibility} />) : null}
				</Box>
			</Box>
		</Box>
	)
}