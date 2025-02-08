'use client'

import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline'
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
		if (localStorage.getItem('darkMode_uex') === 'true') {
			setDarkMode(true)
		}
		// detecção de tema preferido pelo user!!
		// faz um watchMedia pra achar a propriedade de dark mode na primeira vez
		const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		setDarkMode(prefersDarkMode);

		// roda um event listener pra ver se a propriedade muda e altera o tema de acordo
		// ^ preeettty cool na minha opniao 
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e: MediaQueryListEvent) => {
			setDarkMode(e.matches);
		};
		mediaQuery.addEventListener('change', handleChange);

		//dismount sempre!!
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
				{/* default styling da lib */}
				<CssBaseline />
				{children}
			</MUIThemeProvider>
		</ThemeContext.Provider>
	)
}