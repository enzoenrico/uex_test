import { Tlocation } from "@/types/types"
import { Input } from "@mui/material"
import { Box } from "@mui/system"
import { APIProvider, Map } from "@vis.gl/react-google-maps"

interface MapViewProps {
	location: Tlocation
	zoom: number
}

export default function MapView({ location, zoom }: MapViewProps) {
	return (
		<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
			<Box sx={{
				width: 1,
				height: 1,
				borderRadius: 1
			}}>
				<Map
					zoomControl
					fullscreenControl
					defaultZoom={zoom}
					// problemas com o centro do mpa
					// tentar definir ele programaticamente retorna um error de parsing

					defaultCenter={{ lat: 10, lng: 20 }}
				/>
			</Box>
		</APIProvider>
	)
}