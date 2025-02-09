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
import { User } from '@prisma/client';


export default function Signup() {
	//pro redirect
	const router = useRouter()

	const [snackbarShowing, setSnackBarVisibility] = useState<boolean>(false)
	const [snackbarMessage, setSnackBarMessage] = useState<string>("All good!")
	const [showPassword, setShowPassword] = useState(false);

	const [formData, setFormData] = useState({
		email: 'e.enrico2005@gmail.com',
		cpf: '10481285989',
		phone: '41991924190',
		pass: 'password',
		confirmPass: 'password',
		address: 'placeholder'
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formData)

		// validação se nada vier vazio || null
		const emptyFields = Object.values(formData).some(value => String(value.length) < 1);
		// confirmar a senha também conta
		if (emptyFields || formData.pass !== formData.confirmPass) {
			setSnackBarMessage("Preencha todos os campos antes de enviar!")
			setSnackBarVisibility(true)
			return;
		}
		const payload: User = {
			email: formData.email,
			cpf: formData.cpf,
			phone: formData.phone,
			pass: formData.pass,
			addressId: 'dev'
		}

		const response = await fetch('/api/signup', {
			method: 'POST',
			body: JSON.stringify(payload)
		})

		if (response.ok) {
			// set the session token

			router.push('/')
		}
	}
	const formatCPF = (value) => {
		return value
			.replace(/\D/g, '')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d{1,2})/, '$1-$2')
			.replace(/(-\d{2})\d+?$/, '$1');
	};

	const formatPhone = (value) => {
		//formato br com (**)*****-****
		return value
			.replace(/\D/g, '')
			.replace(/(\d{2})(\d)/, '($1) $2')
			.replace(/(\d{5})(\d)/, '$1-$2')
			.replace(/(-\d{4})\d+?$/, '$1');
	};

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'background.default',
				p: 2,
			}}
		>
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
								Bem vindo! {' '}
							</Typography>
							<Typography variant='h5' component={"p"} className="animate-bounce">
								👋
							</Typography>
						</Box>
						<Typography variant="subtitle1" color="text.secondary">
							Preencha as informações abaixo para criarmos sua conta
						</Typography>
					</Box>

					{/* signup form */}
					<Box component="form" onSubmit={handleSubmit} sx={{
						display: 'flex', flexDirection: 'column', gap: 3
					}}>
						<TextField
							fullWidth
							label="Email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Mail size={20} />
									</InputAdornment>
								),
							}}
						/>

						<Box sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 1
						}}>
							<TextField
								fullWidth
								label="CPF"
								name="cpf"
								value={formData.cpf}
								onChange={(e) => {
									const formatted = formatCPF(e.target.value);
									setFormData(prev => ({ ...prev, cpf: formatted }));
								}}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Person size={20} />
										</InputAdornment>
									),
								}}
							/>

							<TextField
								fullWidth
								label="Telefone"
								name="phone"
								value={formData.phone}
								onChange={(e) => {
									const formatted = formatPhone(e.target.value);
									setFormData(prev => ({ ...prev, phone: formatted }));
								}}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Phone size={20} />
										</InputAdornment>
									),
								}}
							/>

						</Box>
						{/* insir map search aqui */}
						<TextField
							fullWidth
							label="Senha"
							name="pass"
							type={showPassword ? "text" : "password"}
							value={formData.pass}
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

						<TextField
							fullWidth
							label="Confirmar senha"
							name="confirmPass"
							type={showPassword ? "text" : "password"}
							value={formData.confirmPass}
							onChange={handleChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Lock size={20} />
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
							Criar nova conta
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
			<Snackbar
				open={snackbarShowing}
				autoHideDuration={2500}
				onClose={() => setSnackBarVisibility(false)}
				message={snackbarMessage}
			/>
		</Box>
	);
};
