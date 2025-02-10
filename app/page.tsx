"use client"

import { Button, ButtonGroup, CircularProgress, Divider, Typography } from "@mui/material";
import { Stack, TextareaAutosize, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import SearchIcon from '@mui/icons-material/Search'
import { Box } from "@mui/material";
import UserCard from "@/components/user-card";
import MapView from "@/components/map-view";
import { Tlocation } from "@/types/types";
import { AddCircle, EmojiPeopleTwoTone, Filter, People, PeopleOutline, PinSharp, Route, TextDecrease, TextIncrease } from "@mui/icons-material";
import FormOverlay from "@/components/edit-details";
import { MapCameraProps } from "@vis.gl/react-google-maps";
import { useSession } from "@/utils/use-session";
import { Address, Contact, User } from "@prisma/client";
import { Lock } from 'lucide-react';
import ProfileCard from "@/components/profile-card";

const initialCameraState = {
	center: { lat: 54.7, lng: 12 },
	zoom: 10
}

export default function Home() {
	// init params
	const [mapCameraCenter, setMapCameraCenter] = useState<google.maps.LatLng>(initialCameraState.center)
	const [zoom, setZoom] = useState<number>(initialCameraState.zoom)
	const [mapPins, setMapPins] = useState<google.maps.LatLng>([])

	// overlay de cadastro / edição de contatos
	const [isOverlayVisible, setOverlayVisibility] = useState<boolean>(false)

	const handleNewCameraCenter = (a: Address) => {
		const latlng_obj = { lat: a.Lat, lng: a.Lng } as google.maps.LatLng
		setMapCameraCenter(latlng_obj)
		setMapPins([...mapPins, latlng_obj])
	}

	// user vindo da session
	const { user, loading } = useSession()
	const [userInfo, setUserInfo] = useState<User | null>()

	const getLoggedInfo = async () => {
		const user_data = await fetch(`/api/users/${user?.userId}`)
		const json_data = await user_data.json()
		setUserInfo(json_data)
	}

	const [incomingUsers, setIncomingUsers] = useState<User[] | null>(null)
	const [invertedAlfabetic, setAlfabeticInverted] = useState(false)

	useEffect(() => {
		// roda função pra pegar info do usuario logado
		getLoggedInfo()
		async function fetchUsers() {
			try {
				if (!user?.userId) return;
				const contacts = await fetch(`/api/contacts/${user.userId}`, {
					method: 'GET'
				})
				if (contacts.ok) {
					const json_contacts: Contact[] = await contacts.json()
					setIncomingUsers(json_contacts)
					// inicializa os users filtrados como os users sem filtro, pra evitar erros de UI
					setFilteredUsers(json_contacts.sort((a, b) => 
						invertedAlfabetic ? 
							a.name.localeCompare(b.name) : 
							b.name.localeCompare(a.name)
					))
					console.log(json_contacts)
				} else {
					throw new Error('Fetch falhou')
				}
			} catch (error) {
				console.error(error)
			}
		}
		fetchUsers();
	}, [user?.userId])

	const [searchText, setSearchText] = useState<string>("")
	const [filteredUsers, setFilteredUsers] = useState<User[] | null>()
	const handleFilter = (val: string) => {
		setSearchText(val)
		if (val.trim().length < 1) {
			setFilteredUsers(incomingUsers);
			return;
		}
		const f = incomingUsers?.filter((u) => {
			return u.name.toLowerCase().includes(val.toLowerCase());
		});
		setFilteredUsers(f);
	}

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
						{/* Button group for filtering */}
						<ButtonGroup variant="contained" size="medium" sx={{ width: 0.4 }}>
							<Button onClick={() => setAlfabeticInverted(true)}>
								<TextIncrease />
							</Button>
							<Button onClick={() => setAlfabeticInverted(false)}>
								<TextDecrease />
							</Button>
							<Button onClick={() => { setSearchText(""); }}>
								<Filter />
							</Button>
						</ButtonGroup>
					</Box>

					{/* Replace SearchBar with a TextField search field */}
					<Box sx={{ width: 1, my: 1 }}>
						<TextField
							type="search"
							placeholder={"Filtrar por nome"}
							value={searchText}
							onChange={(e) => handleFilter(e.target.value)}
							fullWidth
						/>
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
							!incomingUsers ? (
								<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
									<CircularProgress />
								</Box>
							) : filteredUsers && filteredUsers.length < 1 ? (
								<Typography>No users found</Typography>
							) : (
								filteredUsers?.map((user, index) => (
									<Stack key={user.id} sx={{ width: 1, gap: 1 }}>
										<UserCard
											name={user.name}
											description={user.phone || "No description"}
											image_url="/public/globe.svg"
											db_info={user}
											setAddress={(e) => handleNewCameraCenter(e)}
											id={user.id}
										/>
										{index < filteredUsers!.length - 1 && <Divider sx={{ width: '100%' }} variant="fullWidth" />}
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
						<ProfileCard
							name={userInfo ? userInfo.name : "Loading "}
							description={userInfo ? userInfo.email : ":O"}
							setAddress={(e) => handleNewCameraCenter(e)}
							db_info={userInfo}
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