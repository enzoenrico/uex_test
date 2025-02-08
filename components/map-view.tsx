"use client"
import { Tlocation } from "@/types/types"
import { Input, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { APIProvider, Map, MapCameraChangedEvent, MapCameraProps } from "@vis.gl/react-google-maps"
import { Suspense, useCallback, useEffect, useState } from "react"

interface MapViewProps {
	mapCenter: google.maps.LatLng
	setMapCenter: (e: google.maps.LatLng) => void

	zoom: number
	setZoom: (n: number) => void
}


export default function MapView({ zoom, setZoom, mapCenter, setMapCenter }: MapViewProps) {
	// preciso passar isso do parent pro mapa, pra cada posição poder ser passada de cima e editada desse componente	
	// const [mapCenter, setMapCenter] = useState<google.maps.LatLng>({ lat: 54.54, lng: 53 })
	// const [zoom, setZoom] = useState(9)

	return (
		<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
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
						onZoomChanged={(map) => setZoom(map.detail.zoom)}
						gestureHandling={'greedy'}
						onDrag={(map) => setMapCenter(map.detail.center)}
					/>
				</Suspense>
			</Box>
		</APIProvider >
	)
}