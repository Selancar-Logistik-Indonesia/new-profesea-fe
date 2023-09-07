import { Ref, forwardRef, ReactElement, useState, useEffect } from 'react'
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
import Training from 'src/contract/models/training'
// import Trainer from 'src/contract/models/company'
import TrainingCategory from 'src/contract/models/training_category'
import { DateType } from 'src/contract/models/DatepickerTypes'
import { Autocomplete } from '@mui/material'
import DatePicker from 'react-datepicker'

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useDropzone } from 'react-dropzone'
import { yupResolver } from '@hookform/resolvers/yup'


import Link from 'next/link'
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

const DialogAdd = (props: DialogProps) => {
    const [onLoading, setOnLoading] = useState(false);
    // const [UserId, setUserId] = useState(0);
    const [CatId, setCatId] = useState(0);
    const [date, setDate] = useState<DateType>(new Date())
    const [files, setFiles] = useState<File[]>([])

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

    const [TrainingCategory, getTrainingCategory] = useState<any[]>([]);
    // const [Trainer, getTrainer] =useState<any[]>([]);
    const combobox = async () => {

        // const resp = await HttpClient.get(`/user-management?page=1&take=250&team_id=4`);
        // if (resp.status != 200) {
        //     throw resp.data.message ?? "Something went wrong!";
        // }
        // getTrainer(resp.data.users.data);

        const res = await HttpClient.get(`/training-category?search=&page=1&take=250`);
        if (res.status != 200) {
            throw res.data.message ?? "Something went wrong!";
        }
        getTrainingCategory(res.data.trainingCategories.data);
    }

    useEffect(() => {
        combobox()
    }, [])


    const schema = yup.object().shape({
        title: yup.string().required()
    })

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<Training>({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const onSubmit = async (formData: Training) => {
        const { title, short_description } = formData

        const json = {
            "user_id": 1,
            "category_id": CatId,
            "thumbnail": files[0],
            "title": title,
            "schedule": date?.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }).split('/').reverse().join('-'),
            "instant": 1,
            "short_description": short_description
        }

        setOnLoading(true);

        try {
            console.log(json);
            const resp = await HttpClient.postFile('/training', json);
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            props.onCloseClick();
            toast.success(` Training submited successfully!`);
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
                        <Typography variant="body2" color={"#32487A"} fontWeight="600" fontSize={18}>
                            Add New Instant Training
                        </Typography>
                        <Typography variant='body2'>Fulfill your Instant Training Info here</Typography>
                    </Box>

                    <Grid container columnSpacing={'1'} rowSpacing={'4'} >
                        {/* <Grid item md={6} xs={12} > 
                            <Autocomplete
                                disablePortal
                                id="combo-box-Trainer"
                                options={Trainer}  
                                getOptionLabel={(option:Trainer) => option.name}
                                renderInput={(params) => <TextField {...params} label="Trainer" error={Boolean(errors.user_id)} {...register("user_id")}/>}
                                onChange={(event: any, newValue: Trainer | null)=> (newValue?.id) ? setUserId(newValue.id) : setUserId(0)}
                            />
                        </Grid> */}
                        <Grid item md={12} xs={12} >
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={TrainingCategory}
                                {...register("category")}
                                getOptionLabel={(option: TrainingCategory) => option.category}
                                renderInput={(params) => <TextField {...params} label="Training Category" />}
                                onChange={(event: any, newValue: TrainingCategory | null) => (newValue?.id) ? setCatId(newValue.id) : setCatId(0)}
                            />
                        </Grid>
                        <Grid item md={12} xs={12} >
                            <TextField id="title" label="Title" variant="outlined" fullWidth error={Boolean(errors.title)}  {...register("title")} />
                        </Grid>
                        <Grid item md={12} xs={12} >
                            <DatePickerWrapper>
                                <DatePicker
                                    dateFormat='dd/MM/yyyy'
                                    selected={date}
                                    id='basic-input'
                                    onChange={(date: Date) => setDate(date)}
                                    placeholderText='Click to select a date'
                                    customInput={<TextField label='Expired Date' variant="outlined" fullWidth  {...register("schedule")} />}
                                />
                            </DatePickerWrapper>
                        </Grid>
                        <Grid item md={12} xs={12} >
                            <TextField id="short_description" label="Description" variant="outlined" multiline maxRows={4} fullWidth {...register("short_description")} />
                        </Grid>
                        <Grid item md={12} xs={12} >
                            <Box  {...getRootProps({ className: 'dropzone' })} sx={{ p: 2, border: '1px dashed' }}>
                                <input {...getInputProps()} />
                                {files.length ? (
                                    img
                                ) : (
                                    <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
                                        <Img width={200} alt='Upload img' src='/images/upload.png' />
                                        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
                                            <Typography variant='h5' color='textSecondary' sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}>
                                                Click{' '}
                                                <Link href='/' onClick={e => e.preventDefault()}>
                                                    browse / image
                                                </Link>{' '}
                                                to upload Thumbnail
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
                    <Button variant='contained' size='small' sx={{ mr: 2 }} type='submit'>
                        <Icon fontSize='large' icon={'solar:diskette-bold-duotone'} color={'info'} style={{ fontSize: '18px' }} />
                        {onLoading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Submit'}
                    </Button>
                    <Button variant='outlined' size='small' color='error' onClick={props.onCloseClick}>
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

export default DialogAdd
