'use client'
import { useState, useEffect } from 'react';
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
	Snackbar
} from '@mui/material';
import {
	Mail,
	Person,
	Phone,
	Lock,
	Visibility,
	VisibilityOff,
	PersonPinCircle,
	PersonSearchOutlined,
	PersonSearchRounded
} from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import PinDropIcon from '@mui/icons-material/PinDrop';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import { useRouter } from 'next/navigation';
import { cpf } from 'cpf-cnpj-validator';
import SearchBar from '../../components/search-bar';

export default function Signup() {
	const router = useRouter();
	const [snackbarShowing, setSnackBarVisibility] = useState<boolean>(false);
	const [snackbarMessage, setSnackBarMessage] = useState<string>("All good!");
	const [showPassword, setShowPassword] = useState(false);

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		cpf: '',
		cep: '',
		phone: '',
		pass: '',
		confirmPass: '',
		complement: '',
		street: '',
		number: '',
		county: '',
		country: '',
		lat: '',
		lng: ''
	});

	// state da searchbar
	const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

	// isso aqui é muito legal
	// autocomplete baseado no return da search do maps
	useEffect(() => {
		if (selectedPlace && selectedPlace.address_components) {
			// ^ aqui realmente tem os componentes que a gente precisa
			// lembrar de setar nas opções de return na url
			let street = '';
			let number = '';
			let county = '';
			let country = '';
			let lat = '';
			let lng = '';
			let cep = '';
			selectedPlace.address_components.forEach(comp => {
				if (comp.types.includes('route')) street = comp.long_name;
				if (comp.types.includes('street_number')) number = comp.long_name;
				if (comp.types.includes('administrative_area_level_2')) county = comp.long_name;
				if (comp.types.includes('country')) country = comp.long_name;
				if (comp.types.includes('postal_code')) cep = comp.long_name;
				lat = selectedPlace.geometry?.location.lat() || '';
				lng = selectedPlace.geometry?.location.lng() || '';
			});
			setFormData(prev => ({ ...prev, street, number, county, country, lat, lng }));
		}
	}, [selectedPlace]);

	// change de *quase todos os fields do form
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

		// só pra validar os campos preenchidos ou não
		const forValidation = { ...formData }
		delete forValidation.complement

		// validação se nada vier vazio || null
		const emptyFields = Object.values(forValidation).some(value => String(value.length) < 1 && value);
		// confirmar a senha também conta
		if (emptyFields || formData.pass !== formData.confirmPass) {
			setSnackBarMessage("Preencha todos os campos antes de enviar!")
			setSnackBarVisibility(true)
			return;
		}

		if (testCPF(formData.cpf) === false) {
			setSnackBarMessage("cpf inválido!!")
			setSnackBarVisibility(true)
			return;
		}

		// envio pra api
		const payload = {
			user: {
				email: formData.email,
				cpf: formData.cpf,
				phone: formData.phone,
				pass: formData.pass,
				name: formData.name
			},
			address: {
				cep: parseInt(formData.cep),
				streetName: formData.street,
				streetNumber: formData.number ? parseInt(formData.number) : null,
				county: formData.county,
				// state: 'REPLACE_WITH_STATE', 
				Lat: parseFloat(formData.lat),
				Lng: parseFloat(formData.lng),
				countryCode: formData.country.slice(0, 2).toUpperCase(),
				complement: formData.complement || null
			}
		}

		const response = await fetch('/api/signup', {
			method: 'POST',
			body: JSON.stringify(payload)
		})

		if (response.ok) {
			// set the session token
			router.push('/')
		} else {
			setSnackBarMessage("Algo deu errado em nosso servidor! Tente novamente")
			setSnackBarVisibility(true)
			return;
		}
	}

	const testCPF = (c: string) => {
		return cpf.isValid(c)
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
							label="Seu nome"
							name="name"
							type="text"
							value={formData.name}
							onChange={handleChange}
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
											<PersonSearchRounded size={20} />
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
						<SearchBar setSelectedPlace={setSelectedPlace} />
						{/* New address detail fields */}
						<TextField
							fullWidth
							label="Rua"
							name="street"
							value={formData.street}
							onChange={handleChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<HomeIcon />
									</InputAdornment>
								)
							}}
						/>
						<Box sx={{ display: 'flex', gap: 2 }}>
							<TextField
								fullWidth
								label="CEP"
								name="cep"
								value={formData.cep}
								onChange={handleChange}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<HomeIcon />
										</InputAdornment>
									)
								}}
							/>
							<TextField
								fullWidth
								label="N°"
								name="number"
								value={formData.number}
								onChange={handleChange}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<PinDropIcon />
										</InputAdornment>
									)
								}}
							/>
						</Box>
						<Box sx={{ display: 'flex', gap: 2 }}>
							<TextField
								fullWidth
								label="Bairro"
								name="county"
								value={formData.county}
								onChange={handleChange}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<LocationCityIcon />
										</InputAdornment>
									)
								}}
							/>
							<TextField
								fullWidth
								label="País"
								name="country"
								value={formData.country.slice(0, 2)}
								onChange={handleChange}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<PublicIcon />
										</InputAdornment>
									)
								}}
							/>
						</Box>

						<TextField
							fullWidth
							name="complement"
							label="Complemento (opcional)"
							type="text"
							value={formData.complement}
							onChange={handleChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<PersonPinCircle size={20} />
									</InputAdornment>
								)
							}}
						/>

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
