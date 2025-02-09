"use client"
import { useState, useEffect, useRef } from 'react';
import { TextField, Paper, Box } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

interface PlaceAutocompleteProps {
	setSelectedPlace: (place: google.maps.places.PlaceResult) => void;
}

export const SearchBar = ({ setSelectedPlace }) => {
	const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const places = useMapsLibrary('places');

	useEffect(() => {
		if (!places || !inputRef.current) return;

		const autocomplete = new places.Autocomplete(inputRef.current, {
			fields: ['geometry', 'name', 'formatted_address'],
		});

		autocomplete.addListener('place_changed', () => {
			//lidar com a mudança de local selecionado aqui!!!
			// por agora vou só adicionar um callback pra um state parent
			const place = autocomplete.getPlace();
			console.log('Selected place:', place);
			setSelectedPlace(place)

		});

		setPlaceAutocomplete(autocomplete);

	}, [places]);

	return (
		<Box sx={{ position: 'relative', width: '100%' }}>
			<TextField
				inputRef={inputRef}
				fullWidth
				placeholder="Insira um endereço aqui"
				variant="outlined"
				InputProps={{
					startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
					sx: {
						'& .MuiOutlinedInput-notchedOutline': {
							borderColor: 'divider'
						},
						'&:hover .MuiOutlinedInput-notchedOutline': {
							borderColor: 'primary.main'
						},
						'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
							borderColor: 'primary.main'
						}
					}
				}}
			/>
		</Box>
	);
};

export default SearchBar;