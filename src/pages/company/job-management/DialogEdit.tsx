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
import VesselType from 'src/contract/models/vessel_type'
import { DateType } from 'src/contract/models/DatepickerTypes'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { Autocomplete } from '@mui/material'
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html';

import EditorArea from 'src/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Licensi from 'src/contract/models/licensi'
import DialogAddRole from './DialogAddRole'
import { v4 } from 'uuid'

// const licenseData = [
//   { title: 'Certificate of Competency', docType: 'COC' },
//   { title: 'Certificate of Profeciency', docType: 'COP' },
//   { title: 'Certificate of Recognition', docType: 'COR' },
//   { title: 'Certificate of Endorsement', docType: 'COE' },
//   { title: 'MCU Certificates', docType: 'MCU' }
// ]

const SailRegion = [
  { id : 'ncv', name : 'Near Coastal Voyage (NCV)'},
  { id : 'iv', name : 'International Voyage'},
]
const employmenttype = [
  { name: 'Unpaid' },
  { name: 'Contract' },
  { name: 'Full-Time' }
]
const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})


type EditProps = {
  selectedItem: Job;
  visible: boolean;
  onCloseClick: VoidFunction;
  onStateChange: VoidFunction;
};



const DialogEdit = (props: EditProps) => {
  const [hookSignature, setHookSignature] = useState(v4())
  const [onLoading, setOnLoading] = useState(false);
  const [Edu, setEdu] = useState(props.selectedItem?.degree);
  const [Level, setLevel] = useState(props.selectedItem?.rolelevel);
  const [Type, setType] = useState<any>(props.selectedItem?.role_type);
  const [Cat, setCat] = useState(props.selectedItem?.category);
  const [Cou, setCou] = useState(props.selectedItem?.country); 
  const [Cit, setCit] = useState<any>(props.selectedItem?.city);
  const [Vessel, setVessel] = useState(props.selectedItem?.vessel_type); 
  const [Sail, setSail] = useState(props.selectedItem?.sailing_region == 'ncv' ? 
   { id : 'ncv', name : 'Near Coastal Voyage (NCV)'}:props.selectedItem?.sailing_region == 'iv'
   ?{ id : 'iv', name : 'International Voyage'} :
    null);
  const [Employmenttype, setEmploymenttype] = useState<any>({name:props.selectedItem?.employment_type})
  const [license, setLicense] = useState<any>(props.selectedItem?.license);
  const onboard = (props.selectedItem?.onboard_at) ? new Date(props.selectedItem?.onboard_at) : new Date();
  const [date, setDate] = useState<DateType>(onboard);
  const [JobCategory, getJobCategory] = useState<any[]>([]);
  const [Education, getEducation] = useState<any[]>([]);
  const [RoleLevel, getRoleLevel] = useState<any[]>([]);
  const [RoleType, getRoleType] = useState<any[]>([]);
  const [combocountry, getComboCountry] = useState<any>([])
  const [combocity, getComboCity] = useState<any[]>([])
  const [VesselType, getVesselType] = useState<any[]>([]);
  
  const [openAddModal, setOpenAddModal] = useState(false);

  const contenDesc = convertFromHTML(props.selectedItem.description).contentBlocks
  const contentState = ContentState.createFromBlockArray(contenDesc)
  const editorState = EditorState.createWithContent(contentState)
  
  const [licenseData, getlicenseData] = useState<Licensi[]>([])
  const [disabled, setDisabled] = useState(true)  
  // console.log(editorState);

  const [desc, setDesc] = useState(editorState)
  const combobox = async () => {
    const resp2 = await HttpClient.get(`/licensi/all`)
    if (resp2.status != 200) {
      throw resp2.data.message ?? 'Something went wrong!'
    }
    debugger;
    getlicenseData(resp2.data.licensiescoc)
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

     if (props.selectedItem.sailing_region == null) {
       setDisabled(true) 
     } else {
       setDisabled(false)
       
          searchcity({ id: 100 })
        
     }
  }

  useEffect(() => {
    combobox()
  }, [hookSignature])


  const {
    register,
    handleSubmit,
  } = useForm<Job>({
    mode: 'onBlur'
  })

  const searchcity = async (q: any) => {
    setCou(q)
    const resp = await HttpClient.get('/public/data/city?search=&country_id=' + q.id)
    if (resp.status != 200) {
      throw resp.data.message ?? 'Something went wrong!'
    }
    const code = resp.data.cities
    getComboCity(code)
  }

 


  const onSubmit = async (formData: Job) => {
    const { salary_start, salary_end, experience } = formData
    let sailfix = Sail
    if(disabled == true){
      sailfix = null
    }
    const json = {
      rolelevel_id: Level == null ? null : Level.id,
      roletype_id: Type == null ? null : Type.id,
      edugrade_id: Edu == null ? null : Edu.id,
      category_id: Cat == null ? null : Cat.id,
      country_id: Cou == null ? null : Cou.id,
      city_id: Cit == null ? null : Cit.id,
      license: license,
      sailing_region: sailfix == null ? null : Sail,
      vesseltype_id: Vessel == null ? null : Vessel.id,
      salary_start: salary_start,
      salary_end: salary_end,
      experience: experience,
      employment_type: Employmenttype,
      description: draftToHtml(convertToRaw(desc?.getCurrentContent())),
      onboard_at: date
        ?.toLocaleDateString('en-GB', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
        .split('/')
        .reverse()
        .join('-')
    }

    setOnLoading(true);
    try {
      const resp = await HttpClient.patch(`/job/${props.selectedItem.id}`, json);
      if (resp.status != 200) {
        throw resp.data.message ?? "Something went wrong!";
      }

      props.onCloseClick();
      toast.success(`Updated successfully!`);
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
        setCat(q)
        if (q.employee_type != 'onship') {
          setDisabled(true)
          searchcity({id:100})
        } else {
          setDisabled(false)
          setType(null)
        }
      } else {
        setCat(q)
      }
    }
  // console.log(props)

  return (
    <Dialog
      fullWidth
      open={props.visible}
      maxWidth='md'
      scroll='body'
      onClose={props.onCloseClick}
      TransitionComponent={Transition}
    >
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
            onClick={props.onCloseClick}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant='body2' color={'#32487A'} fontWeight='600' fontSize={18}>
              Edit Job
            </Typography>
            <Typography variant='body2'>Fulfill your Job Info here</Typography>
          </Box>

          <Grid container columnSpacing={'1'} rowSpacing={'4'}>
            <Grid item md={4} xs={12}>
              <Autocomplete
                disablePortal
                id='combo-box-category'
                value={Cat}
                options={JobCategory}
                {...register('category')}
                getOptionLabel={(option: JobCategory) => option.name}
                renderInput={params => <TextField {...params} label='Job Category' />}
                // onChange={(event: any, newValue: JobCategory | null) =>
                //   newValue ? setCat(newValue) : setCat(props.selectedItem.category)
                // }
                onChange={(event: any, newValue: JobCategory | null) =>
                  newValue ? handlecategory(newValue) : handlecategory('')
                }
              />
            </Grid>
            <Grid item md={3.4} xs={10}>
              <Autocomplete
                disablePortal
                id='combo-box-type'
                value={Type}
                options={RoleType}
                {...register('role_type')}
                getOptionLabel={(option: RoleType) => option.name}
                renderInput={params => <TextField {...params} label='Job Title' />}
                onChange={(event: any, newValue: RoleType | null) =>
                  newValue ? setType(newValue) : setType(props.selectedItem.role_type)
                }
              />
            </Grid>
             <Grid item md={0.6} xs={2} sx={{ mt: 2   }}>
                <IconButton sx={{ padding: 0 }} component="label" onClick={() => setOpenAddModal(!openAddModal)}>
                  <Icon icon='mdi:add-circle' fontSize={32} color='#546e7a' />
                </IconButton>    
              </Grid>
                <DialogAddRole visible={openAddModal}
                onStateChange={() => setHookSignature(v4())}
                onCloseClick={() => setOpenAddModal(!openAddModal)} />
             
            {disabled == true && (
              <>
                <Grid item md={4} xs={12}>
                  <Autocomplete
                    disablePortal
                    id='combo-box-level'
                    value={Level}
                    options={RoleLevel}
                    getOptionLabel={(option: RoleLevel) => option.levelName}
                    renderInput={params => <TextField {...params} label='Role Level' />}
                    onChange={(event: any, newValue: RoleLevel | null) =>
                      newValue ? setLevel(newValue) : setLevel(props.selectedItem.rolelevel)
                    }
                  />
                </Grid>
              </>
            )}

            {disabled == true && (
              <>
                <Grid item md={3} xs={12}>
                  <Autocomplete
                    disablePortal
                    id='combo-box-country'
                    options={combocountry}
                    value={Cou}
                    getOptionLabel={(option: any) => option.nicename}
                    renderInput={params => <TextField {...params} label='Country' />}
                    onChange={(event: any, newValue: Countries | null) =>
                      newValue ? searchcity(newValue) : searchcity(props.selectedItem.country)
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
                    value={Sail}
                    getOptionLabel={(option: any) => option.name}
                    renderInput={params => <TextField {...params} label='Sail Region' />}
                    onChange={(event: any, newValue: any | null) => (newValue?.id ? setSail(newValue.id) : setSail(null))}
                  />
                </Grid>
              </>
            )}

            {disabled == false && (
              <Grid item md={3} xs={12}>
                <Autocomplete
                  disablePortal
                  id='combo-box-city'
                  options={combocity}
                  value={Cit}
                  getOptionLabel={(option: City) => option.city_name}
                  renderInput={params => <TextField {...params} label='Interview Location' />}
                  onChange={(event: any, newValue: City | null) =>
                    newValue ? setCit(newValue) : setCit(props.selectedItem.city)
                  }
                />
              </Grid>
            )}
            {disabled == true && (
              <Grid item md={3} xs={12}>
                <Autocomplete
                  disablePortal
                  id='combo-box-city'
                  options={combocity}
                  value={Cit}
                  getOptionLabel={(option: City) => option.city_name}
                  renderInput={params => <TextField {...params} label='City' />}
                  onChange={(event: any, newValue: City | null) =>
                    newValue ? setCit(newValue) : setCit(props.selectedItem.city)
                  }
                />
              </Grid>
            )}
            {disabled == false && (
              <>
                <Grid item md={3} xs={12} sx={{ mb: 1 }}>
                  <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={VesselType}
                    value={Vessel}
                    getOptionLabel={(option: VesselType) => option.name}
                    renderInput={params => <TextField {...params} label='Vessel Type' />}
                    onChange={(event: any, newValue: VesselType | null) =>
                      newValue?.id ? setVessel(newValue) : setVessel(props.selectedItem.vessel_type)
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
                <Grid item md={6} xs={12}>
                  <Autocomplete
                    disablePortal
                    id='combo-box-degree'
                    value={Edu}
                    options={Education}
                    {...register('degree')}
                    getOptionLabel={(option: Degree) => option.name}
                    renderInput={params => <TextField {...params} label='Education' />}
                    onChange={(event: any, newValue: Degree | null) =>
                      newValue ? setEdu(newValue) : setEdu(props.selectedItem.degree)
                    }
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    defaultValue={props.selectedItem.experience}
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
                    value={Employmenttype}
                    options={employmenttype}
                    getOptionLabel={(option: any) => option.name}
                    renderInput={params => <TextField {...params} label='Employment Type' />}
                    onChange={(event: any, newValue: any | null) =>
                      newValue?.name ? setEmploymenttype(newValue.name) : setEmploymenttype({ name: '' })
                    }
                  />
                </Grid>
              </>
            )}
            {disabled == false && (
              <>
                <Grid item md={3} xs={12}>
                  <TextField
                    defaultValue={props.selectedItem.experience}
                    id='experience'
                    label='Experience'
                    variant='outlined'
                    fullWidth
                    {...register('experience')}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
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

            <Grid item md={6} xs={12}>
              <TextField
                defaultValue={props.selectedItem.salary_start}
                id='salary_start'
                label='Salary From'
                variant='outlined'
                fullWidth
                {...register('salary_start')}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                defaultValue={props.selectedItem.salary_end}
                id='salary_end'
                label='Salary To'
                variant='outlined'
                fullWidth
                {...register('salary_end')}
              />
            </Grid>
            <Grid item md={12} xs={12}>
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
            <Icon
              fontSize='large'
              icon={'solar:diskette-bold-duotone'}
              color={'info'}
              style={{ fontSize: '14px', margin: 3 }}
            />
            {onLoading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Submit'}
          </Button>
          <Button variant='outlined' size='small' color='error' onClick={props.onCloseClick}>
            <Icon
              fontSize='large'
              icon={'material-symbols:cancel-outline'}
              color={'info'}
              style={{ fontSize: '14px', margin: 3 }}
            />
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DialogEdit