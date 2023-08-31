import React, { useState } from 'react'
import { Button, TextField, FormControl, IconButton, useMediaQuery, InputLabel, OutlinedInput, InputAdornment, FormHelperText, Grid, Box, Typography, Card, CardHeader, CardContent } from '@mui/material'
import { useForm } from 'react-hook-form'
import { HttpClient } from 'src/services'
import Icon from 'src/@core/components/icon'
import { useTheme } from '@mui/material/styles'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { getCleanErrorMessage } from 'src/utils/helpers'

type FormData = {
    old_password: string
    password: string
    password_confirmation: string
}

const ManageAccount = () => {
    const schema = yup.object().shape({
        password: yup.string().min(5).required()
    })
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data: FormData) => {
        const { old_password, password, password_confirmation } = data
        const json = {
            "old_password": old_password,
            "password": password,
            "password_confirmation": password_confirmation,
        };

        try {
            const response = await HttpClient.post('/auth/change-password', json);
            if (response.status != 200) {
                alert(response.data?.message ?? "Something went wrong");
            }

            toast.success("password changed successfully");
        } catch (error) {
            toast.error(`Opps ${getCleanErrorMessage(error)}`);
        }
    }

    const theme = useTheme()
    const hidden = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            <CardHeader
                title={
                    <Typography variant="body2" style={{ fontSize: '18px', color: '#32487A', fontWeight: '600' }}>
                        Change Password
                    </Typography>
                }
            />
            <CardContent>
                <Box component='form' noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}  >
                    <Grid container sx={!hidden ? {
                        p: 4,
                        display: 'flex',
                        alignItems: 'left',
                        justifyContent: 'left',
                        marginBottom: '10px',
                        marginLeft: '2px'
                    } : {}}>

                        <Grid container spacing={6}>
                            <Grid item xs={12} sm={6}>
                                <TextField id="old_password" label="Old Password" variant="outlined" fullWidth sx={{ mb: 6 }} {...register("old_password")} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={6}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                                        New Password
                                    </InputLabel>
                                    <OutlinedInput
                                        sx={{ mb: 6 }}
                                        label='New Password'
                                        id='password'
                                        error={Boolean(errors.password)}
                                        type={showPassword ? 'text' : 'password'}
                                        {...register("password")}
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
                                    {errors.password && (
                                        <FormHelperText sx={{ color: 'error.main' }} id=''>
                                            {(errors as any).password?.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                                        Confirm Password
                                    </InputLabel>
                                    <OutlinedInput
                                        sx={{ mb: 6 }}
                                        label='Password'
                                        id='password_confirmation'
                                        error={Boolean(errors.password)}
                                        type={showPassword ? 'text' : 'password'}
                                        {...register("password_confirmation")}
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                <IconButton edge='end' onMouseDown={e => e.preventDefault()} onClick={() => setShowPassword(!showPassword)}>
                                                    <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {errors.password && (
                                        <FormHelperText sx={{ color: 'error.main' }} id=''>
                                            {(errors as any).password?.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} mb={5}>
                            <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>Password Requirements:</Typography>
                            <Box component='ul' sx={{ pl: 4, mb: 0, '& li': { mb: 1, color: 'text.primary' } }}>
                                <li>Minimum 8 characters long - the more, the better</li>
                                <li>At least one lowercase & one uppercase character</li>
                                <li>At least one number, symbol, or whitespace character</li>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant='contained' color='success' size='small' type='submit' sx={{ mt: 7, mb: 7 }}>
                                <Icon
                                    fontSize='large'
                                    icon={'solar:diskette-bold-duotone'}
                                    color={'success'}
                                    style={{ fontSize: '18px' }}
                                />
                                <div style={{ marginLeft: 5 }}>SAVE</div>
                            </Button>
                            <Button size='small' type='button' variant='text' sx={{ color: 'red' }} startIcon={<Icon icon={'mdi:delete-alert'} />}>
                                DELETE YOUR ACCOUNT?
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ManageAccount
