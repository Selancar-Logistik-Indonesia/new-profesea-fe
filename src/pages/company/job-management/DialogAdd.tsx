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
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import { useForm } from 'react-hook-form'
import { HttpClient } from 'src/services'
import { getCleanErrorMessage } from 'src/utils/helpers'
import { CircularProgress } from '@mui/material'
import Job from 'src/contract/models/job'
import Degree from 'src/contract/models/degree'
import JobCategory from 'src/contract/models/job_category'
import RoleLevel from 'src/contract/models/role_level'
import RoleType from 'src/contract/models/role_type'
import Countries from 'src/contract/models/country'
import City from 'src/contract/models/city'
import { DateType } from 'src/contract/models/DatepickerTypes'
import { styled } from '@mui/material/styles'
import { Autocomplete, TextareaAutosize } from '@mui/material'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 100%;
    font-family: Poppins;
    font-size: 0.770rem;
    font-weight: 200;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${grey[400]};
    }
  
    &:focus {
      border-color: ${grey[400]};
      box-shadow: 0 0 0 2px ${theme.palette.mode === 'dark' ? grey[200] : grey[500]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);

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
    const [EduId, setEduId] = useState(0);
    const [LevelId, setLevelId] = useState(0);
    const [TypeId, setTypeId] = useState(0);
    const [CatId, setCatId] = useState(0);
    const [CouId, setCouId] = useState(0);
    const [CitId, setCitId] = useState('');
    const [date, setDate] = useState<DateType>(new Date());

    const [JobCategory, getJobCategory] = useState<any[]>([]);
    const [Education, getEducation] = useState<any[]>([]);
    const [RoleType, getRoleType] = useState<any[]>([]);
    const [RoleLevel, getRoleLevel] = useState<any[]>([]);
    const [combocountry, getComboCountry] = useState<any>([])
    const [combocity, getComboCity] = useState<any[]>([])
    
    const combobox = async () => {
        HttpClient.get(`/public/data/role-level?search=&page=1&take=250`).then(response => {
            if (response.status != 200) {
                throw response.data.message ?? "Something went wrong!";
            }
            getRoleLevel(response.data.roleLevels.data);
        })
        HttpClient.get(`/public/data/role-type?search=&page=1&take=250`).then(response => {
            if (response.status != 200) {
                throw response.data.message ?? "Something went wrong!";
            }
            getRoleType(response.data.roleTypes.data);
        })
        HttpClient.get(`/job-category?search=&page=1&take=250`).then(response => {
            if (response.status != 200) {
                throw response.data.message ?? "Something went wrong!";
            }
            getJobCategory(response.data.categories.data);
        })
        HttpClient.get(`/public/data/degree`).then(response => {
            if (response.status != 200) {
                throw response.data.message ?? "Something went wrong!";
            }
            getEducation(response.data.degrees);
        })
        HttpClient.get('/public/data/country?search=').then(response => {
            if (response.status != 200) {
                throw response.data.message ?? "Something went wrong!";
            }
            getComboCountry(response.data.countries)
        })
    }

       

    useEffect(() => {
        combobox()
    }, [])

    const searchcity = async (q: any) => {
        setCouId(q)
        const resp = await HttpClient.get('/public/data/city?search=&country_id=' + q)
        if (resp.status != 200) {
          throw resp.data.message ?? 'Something went wrong!'
        }
        const code = resp.data.cities
        getComboCity(code)
      }


    const schema = yup.object().shape({
        rolelevel: yup.string().required()
    })

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<Job>({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const onSubmit = async (formData: Job) => {
        const { license, salary_start, salary_end, experience, description } = formData

        const json = {
            "rolelevel_id": LevelId,
            "roletype_id": TypeId,
            "edugrade_id": EduId,
            "category_id": CatId,
            "country_id": CouId,
            "city_id": CitId,
            "license": license,
            "salary_start": salary_start,
            "salary_end": salary_end,
            "experience": experience,
            "description": description,
            "onboard_at": date?.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }).split('/').reverse().join('-')
        }

        setOnLoading(true);

        try {
            // console.log(json);
            const resp = await HttpClient.post('/job', json);
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            props.onCloseClick();
            toast.success(` Job submited successfully!`);
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
            maxWidth='md'
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
                            Add New Job
                        </Typography>
                        <Typography variant='body2'>Add Job</Typography>
                    </Box>

                    <Grid container columnSpacing={'1'} rowSpacing={'2'} >
                        <Grid item md={6} xs={12}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-level"
                                options={RoleType}
                                {...register("role_type")}
                                getOptionLabel={(option: RoleType) => option.name}
                                renderInput={(params) => <TextField {...params} label="Job Title" />}
                                onChange={(event: any, newValue: RoleType | null) => (newValue?.id) ? setTypeId(newValue.id) : setTypeId(0)}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-level"
                                options={RoleLevel}
                                getOptionLabel={(option: RoleLevel) => option.levelName}
                                renderInput={(params) => <TextField {...params} label="Role Level" {...register("rolelevel")} error={Boolean(errors.rolelevel)} />}
                                onChange={(event: any, newValue: RoleLevel | null) => (newValue?.id) ? setLevelId(newValue.id) : setLevelId(0)}
                            />
                        </Grid>
                        <Grid item md={6} xs={12} >
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={JobCategory}
                                {...register("category")}
                                getOptionLabel={(option: JobCategory) => option.name}
                                renderInput={(params) => <TextField {...params} label="Job Category" />}
                                onChange={(event: any, newValue: JobCategory | null) => (newValue?.id) ? setCatId(newValue.id) : setCatId(0)}
                            />
                        </Grid>
                        <Grid item md={6} xs={12} >
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={Education}
                                {...register("degree")}
                                getOptionLabel={(option: Degree) => option.name}
                                renderInput={(params) => <TextField {...params} label="Education" />}
                                onChange={(event: any, newValue: Degree | null) => (newValue?.id) ? setEduId(newValue.id) : setEduId(0)}
                            />
                        </Grid>
                        
                        <Grid item md={6} xs={12}>
                            <Autocomplete
                            disablePortal
                            id='combo-box-demo'
                            options={combocountry}
                            getOptionLabel={(option: any) => option.nicename}
                            renderInput={params => <TextField {...params} label='Country' />}
                            onChange={(event: any, newValue: Countries | null) =>
                                newValue?.id ? searchcity(newValue.id) : searchcity(0)
                            }
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <Autocomplete
                            disablePortal
                            id='city'
                            options={combocity}
                            getOptionLabel={(option: City) => option.city_name}
                            renderInput={params => <TextField {...params} label='City' />}
                            onChange={(event: any, newValue: City | null) =>
                                newValue?.id ? setCitId(newValue?.id) : setCitId('')
                            }
                            />
                        </Grid>
                        <Grid item md={6} xs={12} >
                            <DatePickerWrapper>
                                <DatePicker
                                dateFormat='dd/MM/yyyy'
                                selected={date}
                                id='basic-input'
                                onChange={(date: Date) => setDate(date)}
                                placeholderText='Click to select a date'
                                customInput={<TextField label='Schedule' variant="outlined" fullWidth  {...register("onboard_at")} />}
                                />
                            </DatePickerWrapper>
                        </Grid>
                        <Grid item md={6} xs={12} >
                            <TextField id="license" label="License" variant="outlined" fullWidth {...register("license")} />
                        </Grid>
                        <Grid item md={6} xs={12} >
                            <TextField id="salary_start" label="Salary From" variant="outlined" fullWidth  {...register("salary_start")} />
                        </Grid>
                        <Grid item md={6} xs={12} >
                            <TextField id="salary_end" label="Salary To" variant="outlined" fullWidth {...register("salary_end")} />
                        </Grid>
                        <Grid item md={12} xs={12} >
                            <TextField id="experience" label="Experience" variant="outlined" fullWidth {...register("experience")} />
                        </Grid>
                        <Grid item md={12} xs={12} >
                            <StyledTextarea aria-label="empty textarea" placeholder="Job Description" minRows={'3'} title='jobdesc' sx={{ mb: 6 }} {...register("description")} />
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
