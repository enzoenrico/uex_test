'use client'
import { useState } from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	TextField,
	Typography,
	InputAdornment,
	IconButton,
	Link,
	alpha
} from '@mui/material';

import {
	Mail,
	Person,
	Phone,
	Lock,
	Visibility,
	VisibilityOff
} from '@mui/icons-material';


export default function Signup() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		login_str: '',
		password: ''
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Form submitted:', formData);
	};

	const formatCPF = (value) => {
		return value
			.replace(/\D/g, '')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d{1,2})/, '$1-$2')
			.replace(/(-\d{2})\d+?$/, '$1');
	};

	const formatPhone = (value) => {
		return value
			.replace(/\D/g, '')
			.replace(/(\d{2})(\d)/, '($1) $2')
			.replace(/(\d{5})(\d)/, '$1-$2')
			.replace(/(-\d{4})\d+?$/, '$1');
	};

	return (
		<Box sx={{
			minHeight: '100vh',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: 'background.default',
			p: 2
		}}>
			<Card sx={{
				width: '100%', maxWidth: 450
			}}>
				<CardContent sx={{
					p: 4
				}}>
					<Box sx={{
						textAlign: 'center', mb: 4
					}}>
						<Box sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 1
						}}>
							<Typography variant="h6" component="h6" gutterBottom color="primary">
								Olá de novo! {' '}
							</Typography>
						</Box>
						<Typography variant="subtitle1" color="text.secondary">
							Insira suas credenciais abaixo
						</Typography>
					</Box>

					<Box component="form" onSubmit={handleSubmit} sx={{
						display: 'flex', flexDirection: 'column', gap: 3
					}}>
						<TextField
							fullWidth
							label="Email, CPF ou Celular"
							name="login_str"
							// TODO!!
							// colocar uma custom validation o quanto antes
							type="text"
							value={formData.email}
							onChange={handleChange}
							value={formData.login_str}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Mail size={20} />
									</InputAdornment>
								)
							}}
						/>
						<TextField
							fullWidth
							label="Senha"
							name="password"
							type={showPassword ? "text" : "password"}
							value={formData.password}
							onChange={handleChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Lock size={20} />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => setShowPassword(!showPassword)}
											edge="end"
										>
											{showPassword ? <Visibility size={20} /> : <VisibilityOff size={20} />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>


						<Button
							type="submit"
							variant="contained"
							size="large"
							sx={{
								mt: 2,
								height: 48,
								backgroundColor: 'primary.main',
								transition: 'all 0.2s ease-in-out',
								'&:hover': {
									scale: 1.05
								},
								'&:focus': {
									scale: 1.05
								},
								'&:active': {
									transform: 'scale(0.95)',
									transition: 'all 0.1s ease-in-out'
								}
							}}
							onClick={() => {
								setTimeout(handleLogin(), 500) //olha a animação :o
							}}
						>
							Fazer login
						</Button>

						<Box sx={{
							textAlign: 'center', mt: 2
						}}>
							<Typography variant="body2" color="text.secondary">
								Já tem uma conta? Faça {' '}
								<Link href="/login" underline="hover" color="primary.main">
									Log in
								</Link>
							</Typography>
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Box >
	);
};
