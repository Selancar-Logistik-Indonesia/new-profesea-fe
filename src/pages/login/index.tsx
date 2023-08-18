import { useState, ReactNode } from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from 'src/hooks/useAuth'
import { useSettings } from 'src/@core/hooks/useSettings'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { CircularProgress } from '@mui/material'
import Head from 'next/head'
import themeConfig from 'src/configs/themeConfig'

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
	width: '100%',
	[theme.breakpoints.up('md')]: {
		maxWidth: 400
	},
	[theme.breakpoints.up('lg')]: {
		maxWidth: 450
	}
}))

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
	width: '100%',
	[theme.breakpoints.down('md')]: {
		maxWidth: 400
	}
}))

const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().min(5).required()
})

const defaultValues = {
	password: '',
	email: ''
}

interface FormData {
	email: string
	password: string
}

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const auth = useAuth()
	const theme = useTheme()
	const { settings } = useSettings()
	const hidden = useMediaQuery(theme.breakpoints.down('md'))
	const { skin } = settings

	const {
		control,
		setError,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues,
		mode: 'onBlur',
		resolver: yupResolver(schema)
	})

	const onSubmit = (data: FormData) => {
		const { email, password } = data;
		auth.login({ email, password }, () => {
			setError('email', {
				type: 'manual',
				message: 'Email or Password is invalid'
			})
		})
	}

	return (
		<>
			<Head>
				<title>{`${themeConfig.templateName} - Login Page`}</title>
			</Head>
			<Box sx={{
				position: 'fit',
				width: '100%',
				height: '100%',
				backgroundImage: "url(/images/bglogin.jpg)",
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
			}}>
				<Box className='content-right'>
					<RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: '1px solid ${theme.palette.divider}' } : {}}>
						<Box
							sx={!hidden ? {
								boxSizing: 'border-box',
								maxWidth: '100%',
								marginTop: '10%',
								marginLeft: '10%',
								background: '#FFFFFF',
								border: '1px solid rgba(76, 78, 100, 0.12)',
								borderRadius: '20px',
								p: 7,
								height: '80%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: 'background.paper'
							} : {
								p: 7,
								height: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: 'background.paper'
							}}
						>
							<BoxWrapper>
								<Box sx={{ mb: 3, maxWidth: '100%', justifyContent: 'center', alignContent: 'center', textAlign: 'center' }}>
									<Link href='/'>
										<Box
											component="img"
											src='/images/logosamudera.png'
											sx={{ width: 125, mt: 5 }}
										>
										</Box>
									</Link>
									<Typography variant='h5' sx={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: "#424242" }}>Login</Typography>
									<Typography variant='body2' sx={{ textAlign: 'center', color: "#424242" }}> Please Sign to your account and start your adventures!</Typography>
								</Box>
								<form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
									<FormControl fullWidth sx={{ mb: 4, mt: 4 }}>
										<Controller
											name='email'
											control={control}
											rules={{ required: true }}
											render={({ field: { value, onChange, onBlur } }) => (
												<TextField
													autoFocus
													label='Email'
													value={value}
													onBlur={onBlur}
													onChange={onChange}
													error={Boolean(errors.email)}
													placeholder='Email'
												/>
											)}
										/>
										{errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
									</FormControl>
									<FormControl fullWidth>
										<InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
											Password
										</InputLabel>
										<Controller
											name='password'
											control={control}
											rules={{ required: true }}
											render={({ field: { value, onChange, onBlur } }) => (
												<OutlinedInput
													value={value}
													onBlur={onBlur}
													label='Password'
													onChange={onChange}
													id='auth-login-v2-password'
													error={Boolean(errors.password)}
													type={showPassword ? 'text' : 'password'}
													endAdornment={
														<InputAdornment position='end'>
															<IconButton
																edge='end'
																onMouseDown={e => e.preventDefault()}
																onClick={() => setShowPassword(!showPassword)}
															>
																<Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
															</IconButton>
														</InputAdornment>
													}
												/>
											)}
										/>
										{errors.password && (
											<FormHelperText sx={{ color: 'error.main' }} id=''>
												{errors.password.message}
											</FormHelperText>
										)}
									</FormControl>
									<Box sx={{ marginTop: '10%' }}>
										<Button disabled={auth.loading} fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
											{
												auth.loading ? (
													<CircularProgress color='primary' />
												) : `Login`
											}
										</Button>
									</Box>
									<Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
										<Typography sx={{ mr: 2, color: "#424242" }}>Don't Have yet an account??</Typography>
										<Typography href='/register' component={Link} sx={{ color: 'primary.main', fontWeight: 'bold', textDecoration: 'none' }}>
											Register Here!
										</Typography>
									</Box>
									<Divider
										sx={{
											'& .MuiDivider-wrapper': { px: 4 },
											mt: theme => `${theme.spacing(5)} !important`,
											mb: theme => `${theme.spacing(7.5)} !important`
										}}
									>

									</Divider>

								</form>
							</BoxWrapper>
						</Box>
					</RightWrapper>
				</Box>
			</Box>
		</>
	)
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
