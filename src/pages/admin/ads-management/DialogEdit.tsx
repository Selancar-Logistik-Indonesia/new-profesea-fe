import { Ref, useState, forwardRef, ReactElement } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { styled } from '@mui/material/styles'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import { useForm } from 'react-hook-form'
import { HttpClient } from 'src/services'
import { getCleanErrorMessage } from 'src/utils/helpers'
import { CircularProgress } from '@mui/material'
// import User from 'src/contract/models/company'
import { DateType } from 'src/contract/models/DatepickerTypes'
// import { Autocomplete } from '@mui/material'
import DatePicker from 'react-datepicker'

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useDropzone } from 'react-dropzone'
import Link from 'next/link'



const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Fade ref={ref} {...props} />
})


type EditProps = {
    selectedItem: any;
    visible: boolean;
    onCloseClick: VoidFunction;
    onStateChange: VoidFunction;
};

interface FileProp {
    name: string
    type: string
    size: number
}

const Img = styled('img')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(10)
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.down('sm')]: {
      width: 250
    }
}))

const DialogEdit = (props: EditProps) => {
    const [onLoading, setOnLoading] = useState(false)
    // const [UserId, setUserId] = useState(0);
    const [date, setDate] = useState<DateType>(new Date(props.selectedItem.expired_at))
    const [files, setFiles] = useState<File[]>([])    
    // const [User, getUser] =useState<any[]>([])

    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        accept: {
        'image/*': ['.png', '.jpg', '.jpeg', '.gif']
        },
        onDrop: (acceptedFiles: File[]) => {
        setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
        }
    })

    const img = files.map((file: FileProp) => (
        <img key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file as any)} width={450} />
    ))

    // const combobox = async () =>{
        
    //     const resp = await HttpClient.get(`/user-management?page=1&take=250&team_id=4`);
    //     if (resp.status != 200) {
    //         throw resp.data.message ?? "Something went wrong!";
    //     }
    //     getUser(resp.data.users.data);
    // }

    // useEffect(() => {   
    // combobox()
    // },[]) 
    

    const { 
        register,
        handleSubmit,
    } = useForm<any>({
        mode: 'onBlur'
    }) 

    const onSubmit = async (formData: { description : string , cta:string}) => {
        const { description } = formData
        const { cta } = formData
        const json = {
            // "user_id": UserId,
            "attachments": files,
            "expired_at": date?.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }).split('/').reverse().join('-')+" "
            +date?.toTimeString().split(' ')[0],
            "description" : description,
            "cta" : cta
        }

        setOnLoading(true);
        try {

            // console.log(json);
            const resp = await HttpClient.postFile(`/ads/${props.selectedItem.id}`, json);
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            props.onCloseClick();
            toast.success(`Ads updated successfully!`);
        } catch (error) {
            toast.error(`Opps ${getCleanErrorMessage(error)}`);
        }

        setOnLoading(false);
        props.onStateChange();
    }

    // console.log(props)

    return (
        <Dialog
            fullWidth
            open={props.visible}
            maxWidth='sm'
            scroll='body'
            onClose={props.onCloseClick}
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
                    <IconButton size='small' onClick={props.onCloseClick} sx={{ position: 'absolute', right: '1rem', top: '1rem' }} >
                        <Icon icon='mdi:close' />
                    </IconButton>
                    <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography variant="body2" color={"#32487A"} fontWeight="600" fontSize={18}>
                            Edit ADS
                        </Typography>
                        <Typography variant='body2'>Fulfill your ADS Info here</Typography>
                    </Box>
                    <Grid container columnSpacing={'1'} rowSpacing={'2'} >
                        {/* <Grid item md={12} xs={12} > 
                            <Autocomplete
                                disablePortal
                                id="combo-box-Trainer"
                                value={props.selectedItem.user}
                                options={User}  
                                getOptionLabel={(option:Trainer) => option.name}
                                renderInput={(params) => <TextField {...params} label="Trainer"  {...register("user_id")} />}
                                onChange={(event: any, newValue: Trainer | null)=> (newValue?.id) ? setUserId(newValue.id) : setUserId(0)}
                            />
                        </Grid> */}
                        <Grid item md={12} xs={12} >
                            <DatePickerWrapper>
                                <DatePicker
                                showTimeSelect
                                minDate={new Date()}
                                dateFormat='dd/MM/yyyy hh:mm aa'
                                selected={date}
                                id='basic-input'
                                onChange={(date: Date) => setDate(date)}
                                placeholderText='Click to select a date'
                                customInput={<TextField label='Expired At' variant="outlined" fullWidth />}
                                />
                            </DatePickerWrapper>
                        </Grid>
                        <Grid item md={12} xs={12} >
                            <TextField defaultValue={props.selectedItem.description} id="description" label="Description" variant="outlined" multiline  maxRows={4} fullWidth {...register("description")}/>                  
                        </Grid>  

                        <Grid item md={12} xs={12} >
                            <TextField defaultValue={props.selectedItem.description} id="description" label="Description" variant="outlined" multiline  maxRows={4} fullWidth {...register("cta")}/>                  
                        </Grid>  
                        <Grid item md={12} xs={12} >
                        <Box  {...getRootProps({ className: 'dropzone' })} sx={{ p: 2, border: '1px dashed ', borderRadius: '10px', borderColor: 'grey.400' , '&:hover': { borderColor: 'grey.500' }}} >
                            <input {...getInputProps()} />
                            {files.length || props.selectedItem.attachments? (
                                (props.selectedItem.attachments && files.length == 0)?
                                <Link href='/' onClick={e => e.preventDefault()}>
                                    <img alt='item thumbnail' className='single-file-image' src={props.selectedItem.attachments} width={450} />
                                </Link>
                                : <Link href='/' onClick={e => e.preventDefault()}>{img}</Link>
                            ) : (
                                <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
                                <Img width={200} alt='Upload img' src='/images/upload.png' />
                                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
                                    <Typography variant='h5'  color='textSecondary' sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}>
                                    Click{' '}
                                    <Link href='/' onClick={e => e.preventDefault()}>
                                        browse / image
                                    </Link>{' '}
                                    to upload ADS
                                    </Typography>
                                </Box>
                                </Box>
                            )}
                            </Box>
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
                    <Button variant='contained' size="small" sx={{ mr: 2 }} type='submit'>
                        <Icon fontSize='large' icon={'solar:diskette-bold-duotone'} color={'info'} style={{ fontSize: '18px' }} />
                        {onLoading ? (<CircularProgress size={25} style={{ color: 'white' }} />) : "Submit"}
                    </Button>
                    <Button variant='outlined' size="small" color='error' onClick={props.onCloseClick}>
                        <Icon
                            fontSize='large'
                            icon={'material-symbols:cancel-outline'}
                            color={'info'}
                            style={{ fontSize: '18px' }}
                        />
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default DialogEdit