'use client'

import { DarkMode, Person, ToggleOff, WbSunny } from "@mui/icons-material"
import { Button, createTheme, Fab, ThemeProvider as MUIThemeProvider } from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline'
import { APIProvider } from "@vis.gl/react-google-maps"
import React, { createContext, useContext, useState, useEffect } from "react"

const lightMode = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#0014dc'
		},
		secondary: {
			main: '#000528'
		},
	}
})

const darkMode = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#4169E1'
		},
		secondary: {
			main: '#2f2f2f'
		},
	}
})

interface ThemeProps {
	children: React.ReactNode
}

const ThemeContext = createContext({
	isDarkMode: false,
	toggleTheme: () => { }
})

export function AppThemeProvider({ children }: ThemeProps) {
	const [isDarkMode, setDarkMode] = useState<boolean>(false)

	useEffect(() => {
		// checando o local-storage pra achar a flag definida pelo user
		const storedDarkMode = localStorage.getItem('darkMode_uex');
		if (storedDarkMode !== null) {
			setDarkMode(storedDarkMode === 'true');
			return;
		}

		//aí se o usuário nunca setou uma preferencia, coloca em dark mode
		const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		setDarkMode(prefersDarkMode);

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e: MediaQueryListEvent) => {
			// só atualiza se o valor já tiver sido definido
			if (localStorage.getItem('darkMode_uex') === null) {
				setDarkMode(e.matches);
			}
		};
		mediaQuery.addEventListener('change', handleChange);

		//dismout func
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, [])
	const toggleTheme = () => {
		const newMode = !isDarkMode;
		setDarkMode(newMode)
		localStorage.setItem('darkMode_uex', String(newMode))
	}
	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			<MUIThemeProvider theme={isDarkMode ? darkMode : lightMode}>
				<Fab
					variant="circular"
					color={isDarkMode ? 'primary' : 'secondary'}
					size="medium"
					onClick={toggleTheme}
					sx={{
						position: 'fixed',
						bottom: 16,
						right: 16,
						zIndex: 1000
					}}
				>
					{isDarkMode ?
						<WbSunny />
						: <DarkMode />
					}
				</Fab>
				{/* default styling da lib */}
				<CssBaseline />
				{/* colocando o api provider direto no theme provider pra conseguir rodar a api*/}
				{/* de google maps search fora do componenente do mapa */}
				<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
					{children}
				</APIProvider>
			</MUIThemeProvider>
		</ThemeContext.Provider>
	)
}