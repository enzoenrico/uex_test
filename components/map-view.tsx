"use client"
import { Tlocation } from "@/types/types"
import { Input, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Map, MapCameraChangedEvent, MapCameraProps, Marker } from "@vis.gl/react-google-maps"
import { Suspense, useCallback, useEffect, useState } from "react"

interface MapViewProps {
	mapCenter: google.maps.LatLng
	setMapCenter: (e: google.maps.LatLng) => void

	zoom: number
	setZoom: (n: number) => void

	pins: google.maps.LatLng[]
}


export default function MapView(
	{ zoom, setZoom, mapCenter, setMapCenter, pins }
		: MapViewProps
) {
	// preciso passar isso do parent pro mapa, pra cada posição poder ser passada de cima e editada desse componente	
	// const [mapCenter, setMapCenter] = useState<google.maps.LatLng>({ lat: 54.54, lng: 53 })
	// const [zoom, setZoom] = useState(9)

	return (
		<Box sx={{
			width: 1,
			height: 1,
			borderRadius: 1,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		}}>
			{/* fallback no caso do mapa não carregar */}
			<Suspense fallback={
				<Typography variant="h3">
					Mapa carregando...
				</Typography>
			}>
				<Map
					center={mapCenter}
					zoom={zoom}
					reuseMaps={true}
					gestureHandling={'greedy'}
					onCameraChanged={(ev: MapCameraChangedEvent) => {
						setZoom(ev.detail.zoom);
						setMapCenter(ev.detail.center);
					}}
				>
					{
						pins.map((position, i) => (
							<Marker
								position={position}
							/>
						))
					}
				</Map>
			</Suspense>
		</Box>
	)
}