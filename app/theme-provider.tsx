'use client'

import { createTheme, ThemeProvider } from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline'
import React from "react"

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#ff8200'
		},
		secondary: {
			main: '#000000'
		},
	}
})

interface ThemeProps {
	children: React.ReactNode
}

export function AppThemeProvider({ children }: ThemeProps) {
	return (
		<ThemeProvider theme={theme}>
			{/* default styling da lib */}
			<CssBaseline />
			{children}
		</ThemeProvider>
	)
}