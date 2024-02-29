import { Ref, useState, forwardRef, ReactElement, useEffect } from 'react'
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
import { CircularProgress, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import Training from 'src/contract/models/training'
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


type EditProps = {
    selectedItem: Training;
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
    const [onLoading, setOnLoading] = useState(false);
    const [CatId, setCatId] = useState(props.selectedItem?.category_id);
    const [date, setDate] = useState<DateType>(new Date(props.selectedItem?.schedule))
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
    
    const [TrainingCategory, getTrainingCategory] =useState<any[]>([]);
    const combobox = async () =>{

        const res = await HttpClient.get(`/training-category?search=&page=1&take=250`);
        if (res.status != 200) {
            throw res.data.message ?? "Something went wrong!";
        }
        getTrainingCategory(res.data.trainingCategories.data);
    }

    useEffect(() => {   
    combobox()
    },[]) 
    
    
    const schema = yup.object().shape({
        short_description: yup.string().required(),
        price: yup.string().required()
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
        const { title, short_description,price} = formData
        
        const json = {
            "category_id": CatId,
            "title": title,
            "schedule": date?.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }).split('/').reverse().join('-')+" "
            +date?.toTimeString().split(' ')[0],
            "thumbnail" : files[0],
            "instant" : 0,
            "short_description": short_description,
            "price":price
        }

        setOnLoading(true);
        try {

            // console.log(json);
            const resp = await HttpClient.postFile(`/training/${props.selectedItem.id}`, json);
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            props.onCloseClick();
            toast.success(`${props.selectedItem?.title} updated successfully!`);
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
                            Edit Training
                        </Typography>
                        <Typography variant='body2'>Fulfill your Training Info here</Typography>
                    </Box>
                    <Grid container columnSpacing={'1'} rowSpacing={'4'} >
                        <Grid item md={12} xs={12} > 
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                value={props.selectedItem?.category}
                                options={TrainingCategory}  
                                {...register("category")}
                                getOptionLabel={(option:TrainingCategory) => option.category}
                                renderInput={(params) => <TextField {...params} label="Training Category" />}
                                onChange={(event: any, newValue: TrainingCategory | null)=> (newValue?.id) ? setCatId(newValue.id) : setCatId(0)}
                            />
                        </Grid>
                        <Grid item md={12} xs={12} >
                            <TextField defaultValue={props.selectedItem?.title} id="title" label="Title" variant="outlined" fullWidth  {...register("title")}/>
                        </Grid>
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
                                customInput={<TextField label='Schedule' variant="outlined" fullWidth  {...register("schedule")} />}
                                />
                            </DatePickerWrapper>
                        </Grid>
                        <Grid item md={12} xs={12} >
                            <TextField defaultValue={props.selectedItem?.short_description} id="short_description" label="Description" variant="outlined" multiline  maxRows={4} fullWidth {...register("short_description")} error={Boolean(errors.short_description)}/>                  
                        </Grid>  
                         <Grid item md={12} xs={12}  >
                            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">Rp.</InputAdornment>}
                                label="Price"
                                {...register("price")}
                            />
                        </Grid>  
                        <Grid item md={12} xs={12} >
                        <Box  {...getRootProps({ className: 'dropzone' })} sx={{ p: 2, border: '1px dashed ', borderRadius: '10px', borderColor: 'grey.400' , '&:hover': { borderColor: 'grey.500' }}} >
                            <input {...getInputProps()} />
                            {files.length || props.selectedItem?.thumbnail? (
                                (props.selectedItem.thumbnail && files.length == 0)?
                                <Link href='/' onClick={e => e.preventDefault()}>
                                    <img alt='thumbnail' className='single-file-image' src={props.selectedItem?.thumbnail} width={450} />
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