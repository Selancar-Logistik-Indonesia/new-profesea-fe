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
import { Autocomplete } from '@mui/material'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// import { yupResolver } from '@hookform/resolvers/yup'

// import * as yup from 'yup'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html';

import EditorArea from 'src/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import VesselType from 'src/contract/models/vessel_type'

const licenseData = [
  {
    title: 'Ahli Nautika Tingkat Dasar (ANTD), Teknika',
    doctype: 'COC1'
  },
  {
    title: 'Ahli Nautika Tingkat V (ANT V), Teknika',
    doctype: 'COC2'
  },
  {
    title: 'Ahli Nautika Tingkat IV (ANT IV), Teknika',
    doctype: 'COC3'
  },
  {
    title: 'Ahli Nautika Tingkat III (ANT III), Teknika',
    doctype: 'COC4'
  },
  {
    title: 'Ahli Nautika Tingkat II (ANT II), Teknika',
    doctype: 'COC5'
  },
  {
    title: 'Ahli Nautika Tingkat I (ANT I), Teknika',
    doctype: 'COC6'
  },
  {
    title: 'Ahli Teknika Tingkat Dasar (ATTD), Nautika',
    doctype: 'COC7'
  },
  {
    title: 'Ahli Teknika Tingkat V (ATT V), Nautika',
    doctype: 'COC8'
  },
  {
    title: 'Ahli Teknika Tingkat IV (ATT IV), Nautika',
    doctype: 'COC9'
  },
  {
    title: 'Ahli Teknika Tingkat III (ATT III), Nautika',
    doctype: 'COC10'
  },
  {
    title: 'Ahli Teknika Tingkat II (ATT II), Nautika',
    doctype: 'COC11'
  },
  {
    title: 'Ahli Teknika Tingkat I (ATT I), Nautika',
    doctype: 'COC12'
  }
]

const SailRegion = [
  { id : 'ncv', name : 'Near Coastal Voyage (NCV)'},
  { id : 'iv', name : 'International Voyage'},
]

const employmenttype = [{ name: 'Unpaid' }, { name: 'Contract' },
  {  name: 'Part-Time' },
  {  name: 'Full-Time' },
  {  name: 'Freelance' },]
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
    const [VesselId, setVesselId] = useState(0);
    const [CatId, setCatId] = useState(0);
    const [CouId, setCouId] = useState(100);
    const [CitId, setCitId] = useState('');
    const [Sail, setSail] = useState('');
    const [Employmenttype, setEmploymenttype] = useState('')

    const [license, setLicense] = useState<any[]>([]);
    const [date, setDate] = useState<DateType>(new Date());

    const [JobCategory, getJobCategory] = useState<any[]>([]);
    const [Education, getEducation] = useState<any[]>([]);
    const [RoleType, getRoleType] = useState<any[]>([]);
    const [RoleLevel, getRoleLevel] = useState<any[]>([]);
    const [combocountry, getComboCountry] = useState<any>([])
    const [combocity, getComboCity] = useState<any[]>([])
    const [VesselType, getVesselType] = useState<any[]>([]);

    const [desc, setDesc] = useState(EditorState.createEmpty())
    
    const [disabled, setDisabled] = useState(true)  
    
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
        HttpClient.get('/public/data/vessel-type?page=1&take=250&search=').then(response => {
          if (response.status != 200) {
              throw response.data.message ?? "Something went wrong!";
          }
          getVesselType(response.data.vesselTypes.data)
      })
       const resp = await HttpClient.get('/public/data/city?search=&country_id=' + 100)
       if (resp.status != 200) {
         throw resp.data.message ?? 'Something went wrong!'
       }
       const code = resp.data.cities
       getComboCity(code)
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


    // const schema = yup.object().shape({
    //     rolelevel: yup.string().required()
    // })

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<Job>({
        mode: 'onBlur',
        // resolver: yupResolver(schema)
    })

    const onSubmit = async (formData: Job) => {
        const { salary_start, salary_end, experience } = formData
        let type: any = ''
        if (disabled == true) {
          type = TypeId
        }
        const json = { 
            "rolelevel_id": LevelId == 0 ? null: LevelId,
            "roletype_id": type,
            "edugrade_id": EduId == 0 ? null:EduId,
            "category_id": CatId  == 0 ? null: CatId,
            "country_id": CouId  == 0 ? null : CouId,
            "city_id": CitId,
            "license": license,
            "salary_start": salary_start,
            "salary_end": salary_end,
            "experience": experience,
            "sailing_region": Sail,
            "employment_type": Employmenttype,
            "vesseltype_id": VesselId,
            "description": draftToHtml(convertToRaw(desc?.getCurrentContent())),
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
      const handlecategory = (q: any) => {
         if (q !== '') {
            HttpClient.get(`/public/data/role-type?search=&page=1&take=250&category_id=` + q.id).then(response => {
              if (response.status != 200) {
                throw response.data.message ?? 'Something went wrong!'
              }
              getRoleType(response.data.roleTypes.data)
            })
         }
        
        if (q !== '') {
          setCatId(q.id)
          if (q.employee_type != 'onship') {
            setDisabled(true)
            searchcity(100)
          } else {
            setDisabled(false)
            setTypeId(0)
          }
        } else {
          setCatId(0)
        }
      }
    

    return (
      <Dialog fullWidth open={props.visible} maxWidth='md' scroll='body' TransitionComponent={Transition}>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
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
              <Typography variant='body2' color={'#32487A'} fontWeight='600' fontSize={18}>
                Add New Job
              </Typography>
              <Typography variant='body2'>Fulfill your Job Info here</Typography>
            </Box>

            <Grid container columnSpacing={'1'} rowSpacing={'2'}>
              <Grid item md={4} xs={12} sx={{ mb: 1 }}>
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  options={JobCategory}
                  {...register('category')}
                  getOptionLabel={(option: JobCategory) => option.name}
                  renderInput={params => <TextField {...params} label='Job Category' />}
                  // onChange={(event: any, newValue: JobCategory | null) =>
                  //   newValue?.id ? setCatId(newValue.id) : setCatId(0)
                  // }
                  onChange={(event: any, newValue: JobCategory | null) =>
                    newValue ? handlecategory(newValue) : handlecategory('')
                  }
                />
              </Grid>

              <>
                <Grid item md={4} xs={12} sx={{ mb: 1 }}>
                  <Autocomplete
                    disablePortal
                    id='combo-box-level'
                    options={RoleType}
                    {...register('role_type')}
                    getOptionLabel={(option: RoleType) => option.name}
                    renderInput={params => <TextField {...params} label='Job Title' />}
                    onChange={(event: any, newValue: RoleType | null) =>
                      newValue?.id ? setTypeId(newValue.id) : setTypeId(0)
                    }
                  />
                </Grid>
              </>
              {disabled == true && (
                <>
                  <Grid item md={4} xs={12} sx={{ mb: 1 }}>
                    <Autocomplete
                      disablePortal
                      id='combo-box-level'
                      options={RoleLevel}
                      getOptionLabel={(option: RoleLevel) => option.levelName}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='Role Level'
                          {...register('rolelevel')}
                          error={Boolean(errors.rolelevel)}
                        />
                      )}
                      onChange={(event: any, newValue: RoleLevel | null) =>
                        newValue?.id ? setLevelId(newValue.id) : setLevelId(0)
                      }
                    />
                  </Grid>
                </>
              )}

              {disabled == true && (
                <>
                  <Grid item md={3} xs={12} sx={{ mb: 1 }}>
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
                </>
              )}
              {disabled == false && (
                <>
                  <Grid item md={4} xs={12} sx={{ mb: 1 }}>
                    <Autocomplete
                      disablePortal
                      id='combo-box-demo'
                      options={SailRegion}
                      getOptionLabel={(option: any) => option.name}
                      renderInput={params => <TextField {...params} label='Sail Region' />}
                      onChange={(event: any, newValue: any | null) =>
                        newValue?.id ? setSail(newValue.id) : setSail('')
                      }
                    />
                  </Grid>
                </>
              )}
              {disabled == false && (
                <>
                  <Grid item md={3} xs={12} sx={{ mb: 1 }}>
                    <Autocomplete
                      disablePortal
                      id='city'
                      options={combocity}
                      getOptionLabel={(option: City) => option.city_name}
                      renderInput={params => <TextField {...params} label='Interview Location ' />}
                      onChange={(event: any, newValue: City | null) =>
                        newValue?.id ? setCitId(newValue?.id) : setCitId('')
                      }
                    />
                  </Grid>
                </>
              )}
              {disabled == true && (
                <>
                  <Grid item md={3} xs={12} sx={{ mb: 1 }}>
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
                </>
              )}

              {disabled == false && (
                <>
                  <Grid item md={3} xs={12} sx={{ mb: 1 }}>
                    <Autocomplete
                      disablePortal
                      id='combo-box-demo'
                      options={VesselType}
                      getOptionLabel={(option: VesselType) => option.name}
                      renderInput={params => <TextField {...params} label='Vessel Type' />}
                      onChange={(event: any, newValue: VesselType | null) =>
                        newValue?.id ? setVesselId(newValue.id) : setVesselId(0)
                      }
                    />
                  </Grid>
                  <Grid item md={3} xs={12} sx={{ mb: 1 }}>
                    <DatePickerWrapper>
                      <DatePicker
                        minDate={new Date()}
                        dateFormat='dd/MM/yyyy'
                        selected={date}
                        id='basic-input'
                        onChange={(date: Date) => setDate(date)}
                        placeholderText='Click to select a date'
                        customInput={
                          <TextField label='Date On Board' variant='outlined' fullWidth {...register('onboard_at')} />
                        }
                      />
                    </DatePickerWrapper>
                  </Grid>
                </>
              )}
              {disabled == true && (
                <>
                  <Grid item md={6} xs={12} sx={{ mb: 1 }}>
                    <Autocomplete
                      disablePortal
                      id='combo-box-demo'
                      options={Education}
                      {...register('degree')}
                      getOptionLabel={(option: Degree) => option.name}
                      renderInput={params => <TextField {...params} label='Education' />}
                      onChange={(event: any, newValue: Degree | null) =>
                        newValue?.id ? setEduId(newValue.id) : setEduId(0)
                      }
                    />
                  </Grid>
                </>
              )}

              {disabled == true && (
                <>
                  <Grid item md={6} xs={12} sx={{ mb: 1 }}>
                    <TextField
                      id='experience'
                      label='Experience'
                      variant='outlined'
                      fullWidth
                      {...register('experience')}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} sx={{ mb: 1 }}>
                    <Autocomplete
                      disablePortal
                      id='combo-box-demo'
                      options={employmenttype}
                      getOptionLabel={(option: any) => option.name}
                      renderInput={params => <TextField {...params} label='Employment Type' />}
                      onChange={(event: any, newValue: any | null) =>
                        newValue?.id ? setEmploymenttype(newValue.id) : setEmploymenttype('')
                      }
                    />
                  </Grid>
                </>
              )}
              {disabled == false && (
                <>
                  <Grid item md={3} xs={12} sx={{ mb: 1 }}>
                    <TextField
                      id='experience'
                      label='Experience'
                      variant='outlined'
                      fullWidth
                      {...register('experience')}
                    />
                  </Grid>
                </>
              )}
              {disabled == false && (
                <>
                  <Grid item md={12} xs={12} sx={{ mb: 1 }}>
                    <Autocomplete
                      multiple
                      options={licenseData}
                      id='license'
                      value={license}
                      filterSelectedOptions
                      getOptionLabel={option => option.title || ''}
                      fullWidth
                      onChange={(e, newValue: any) => (newValue ? setLicense(newValue) : setLicense([]))}
                      renderInput={params => <TextField {...params} fullWidth label='License' />}
                    />
                  </Grid>
                </>
              )}

              <Grid item md={6} xs={12} sx={{ mb: 1 }}>
                <TextField
                  defaultValue={0}
                  id='salary_start'
                  label='Salary Range From'
                  variant='outlined'
                  fullWidth
                  {...register('salary_start')}
                />
              </Grid>
              <Grid item md={6} xs={12} sx={{ mb: 1 }}>
                <TextField
                  defaultValue={0}
                  id='salary_end'
                  label='Salary To'
                  variant='outlined'
                  fullWidth
                  {...register('salary_end')}
                />
              </Grid>

              <Grid item md={12} xs={12} sx={{ mb: 1 }}>
                <EditorWrapper>
                  <EditorArea
                    editorState={desc}
                    onEditorStateChange={data => setDesc(data)}
                    toolbar={{
                      options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true }
                    }}
                    placeholder='Description'
                  />
                </EditorWrapper>
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
