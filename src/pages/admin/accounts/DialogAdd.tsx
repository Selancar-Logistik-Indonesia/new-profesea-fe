import { Ref, forwardRef, ReactElement, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import { useForm } from 'react-hook-form'
import { HttpClient } from 'src/services'
import { getCleanErrorMessage } from 'src/utils/helpers'
import { CircularProgress } from '@mui/material'
import Account from 'src/contract/models/account'
import ITeam from 'src/contract/models/team'

import { FormHelperText, Autocomplete } from '@mui/material'

import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Fade ref={ref} {...props} />
})


type DialogProps = {
    visible: boolean;
    onCloseClick: VoidFunction;
    onStateChange: VoidFunction;
}

const DialogAdd = (props: DialogProps) => {
    const [onLoading, setOnLoading] = useState(false);
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [teamId, setTeamId] = useState(0);

    const [teams, getTeams] =useState<any[]>([]);
    const combobox = async () =>{
        const resp = await HttpClient.get(`/public/data/team?nonpublic=1`);
        if (resp.status != 200) {
            throw resp.data.message ?? "Something went wrong!";
        }
        getTeams(resp.data.teams);
    }

    useEffect(() => {   
    combobox()
    },[]) 
    
    
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(5).required()
    })

    const { 
        register,
        formState: { errors }, 
        handleSubmit,
    } = useForm<Account>({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    }) 

    const onSubmit = async (formData: Account) => {
        const {  name, email, username, password, password_confirmation, country_id, phone} = formData
        
        const json = {
            "name": name,
            "email": email,
            "username": username,
            "password": password,
            "password_confirmation": password_confirmation,
            "team_id": teamId, 
            "country_id": country_id,
            "phone": phone
        }
        
        setOnLoading(true);
        try {
            const resp = await HttpClient.post('/user-management', json);
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            props.onCloseClick();
            toast.success(`${json.name} submited successfully!`);
        } catch (error) {
            toast.error(`Opps ${getCleanErrorMessage(error)}`);
        }

        setOnLoading(false);
        props.onStateChange();
    }

    return (
        <Dialog
            fullWidth
            open={props.visible}
            maxWidth='sm'
            scroll='body'
            TransitionComponent={Transition}
        >
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}  >
                <DialogContent
                    sx={{
                        position: 'relative',
                        pb: theme => `${theme.spacing(8)} !important`,
                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                        pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                    }}
                >
                    <IconButton
                        size='small'
                        sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
                        onClick={props.onCloseClick}
                    >
                        <Icon icon='mdi:close' />
                    </IconButton>
                    <Box sx={{ mb: 6, textAlign: 'center' }}>
                        <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                            Add New Account
                        </Typography>
                        <Typography variant='body2'>Add Account</Typography>
                    </Box>
                    
                    <Grid container columnSpacing={'1'} rowSpacing={'2'} >
                        <Grid item md={12} xs={12}>
                            <TextField id="Name" label="Name" variant="outlined"  fullWidth sx={{ mb: 6 }} {...register("name")}/>
                        </Grid>
                        <Grid item md={6} xs={12} >
                            <TextField id="Email" label="Email" variant="outlined" fullWidth  {...register("email")}/>
                        </Grid>
                        <Grid item md={6} xs={12} >
                            <TextField id="Username" label="Username" variant="outlined" fullWidth sx={{ mb: 6 }} {...register("username")}/>                  
                        </Grid>
                        <Grid item md={6} xs={12} >
                            <FormControl fullWidth>
                                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                                Password
                                </InputLabel>
                                <OutlinedInput
                                    sx={{ mb: 6 }}
                                    label='Password'  
                                    id='password1' 
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
                        <Grid item md={6} xs={12} >
                            <FormControl fullWidth>
                                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                                Confirm Password
                                </InputLabel>
                                <OutlinedInput
                                    sx={{ mb: 6 }}
                                    label='Password'  
                                    id='password2' 
                                    error={Boolean(errors.password)}
                                    type={showPassword ? 'text' : 'password'}
                                    {...register("password_confirmation")}
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
                        <Grid item md={6} xs={12} > 
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={teams}  
                                {...register("team")}
                                getOptionLabel={(option:ITeam) => option.teamName}
                                renderInput={(params) => <TextField {...params} label="Role" />}
                                onChange={(event: any, newValue: ITeam | null)=> (newValue?.id) ? setTeamId(newValue.id) : setTeamId(0)}
                            />
                        </Grid>
                        <Grid item md={2} xs={12} >
                            <TextField id="Code" label="Code" variant="outlined" fullWidth sx={{ mb: 6 }} {...register("country_id")} />
                        </Grid>
                        <Grid item md={4} xs={12} >
                            <TextField id="Phone" label="Phone" variant="outlined" fullWidth sx={{ mb: 6 }} {...register("phone")}/>
                        </Grid>                        
                    </Grid>
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: 'center',
                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                        pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                    }}
                >
                    <Button variant='contained' sx={{ mr: 2 }} type='submit'>
                        {onLoading ? (<CircularProgress size={25} style={{ color: 'white' }} />) : "Submit"}
                    </Button>
                    <Button variant='outlined' color='secondary' onClick={props.onCloseClick}>
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default DialogAdd
