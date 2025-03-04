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
	alpha,
	Snackbar
} from '@mui/material';

import {
	Mail,
	Person,
	Phone,
	Lock,
	Visibility,
	VisibilityOff
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';


export default function Signup() {
	const router = useRouter()

	const [snackbarShowing, setSnackBarVisibility] = useState<boolean>(false)
	const [snackbarMessage, setSnackBarMessage] = useState<string>("All good!")

	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		login_str: '',
		password: ''
	});

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const login_response = await fetch('/api/login', {
				method: 'POST',
				body: JSON.stringify(formData)
			});

			if (login_response.ok) {
				router.push('/');
			}
			if (login_response.status === 401) {
				//faz o toast
				setSnackBarMessage("Credenciais inválidas!!")
				setSnackBarVisibility(true)

				throw new Error("Credenciais inválidas")
			}
		} catch (error: Error) {
			console.error('Login failed:', error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
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

					<Box component="form" onSubmit={handleLogin} sx={{
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
						>
							Fazer login
						</Button>

						<Box sx={{
							textAlign: 'center', mt: 2
						}}>
							<Typography variant="body2" color="text.secondary">
								Ainda não tem uma conta? {' '}
								<Link href="/signup" underline="hover" color="primary.main">
									Crie uma conta aqui!
								</Link>
							</Typography>
						</Box>
					</Box>
				</CardContent>
			</Card>
			<Snackbar
				open={snackbarShowing}
				autoHideDuration={2500}
				onClose={() => setSnackBarVisibility(false)}
				message={snackbarMessage}
			/>

		</Box >
	);
};
