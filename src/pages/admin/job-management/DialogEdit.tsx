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
import { CircularProgress, Autocomplete } from '@mui/material'
import Job from 'src/contract/models/job'
import Company from 'src/contract/models/company'
import Degree from 'src/contract/models/degree'
import JobCategory from 'src/contract/models/job_category'
import RoleLevel from 'src/contract/models/role_level'
import RoleType from 'src/contract/models/role_type'
import Countries from 'src/contract/models/country'
import City from 'src/contract/models/city'
import { DateType } from 'src/contract/models/DatepickerTypes'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html';

import EditorArea from 'src/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const licenseData = [
    { title: 'Certificate of Competency', docType: 'COC' },
    { title: 'Certificate of Profeciency', docType: 'COP' },
    { title: 'Certificate of Recognition', docType: 'COR' },
    { title: 'Certificate of Endorsement', docType: 'COE' },
    { title: 'MCU Certificates', docType: 'MCU' }
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
    const [onLoading, setOnLoading] = useState(false);
    const [User, setUser] = useState(props.selectedItem?.company);
    const [Edu, setEdu] = useState(props.selectedItem?.degree);
    const [Level, setLevel] = useState(props.selectedItem?.rolelevel);
    const [Type, setType] = useState(props.selectedItem?.role_type);
    const [Cat, setCat] = useState(props.selectedItem?.category);
    const [Cou, setCou] = useState(props.selectedItem?.country);
    const [Cit, setCit] = useState<any>(props.selectedItem?.city);
    const [license, setLicense] = useState<any>(props.selectedItem?.license);
    const onboard = (props.selectedItem?.onboard_at) ? new Date(props.selectedItem?.onboard_at) : new Date();
    const [date, setDate] = useState<DateType>(onboard);

    const [JobCategory, getJobCategory] = useState<any[]>([]);
    const [Education, getEducation] = useState<any[]>([]);
    const [RoleLevel, getRoleLevel] = useState<any[]>([]);
    const [RoleType, getRoleType] = useState<any[]>([]);
    const [Company, getCompany] = useState<any[]>([]);
    const [combocountry, getComboCountry] = useState<any>([])
    const [combocity, getComboCity] = useState<any[]>([])

    const contenDesc = convertFromHTML(props.selectedItem?.description).contentBlocks
    const contentState = ContentState.createFromBlockArray(contenDesc)
    const editorState = EditorState.createWithContent(contentState)
    const [desc, setDesc] = useState(editorState)
    
    const [disabled, setDisabled] = useState(true)  

    const combobox = async () => {

        HttpClient.get(`/user-management?page=1&take=250&team_id=3`).then(response => {
            if (response.status != 200) {
                throw response.data.message ?? "Something went wrong!";
            }
            getCompany(response.data.users.data);
        })

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

    const {
        register,
        handleSubmit,
    } = useForm<Job>({
        mode: 'onBlur'
    })

    const searchcity = async (q: Countries) => {
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
        let type:any =''
        if(disabled == true){
            type = Type.id
        }
        const json = {
            "rolelevel_id": Level.id,
            "roletype_id": type,
            "user_id": User.id,
            "edugrade_id": Edu.id,
            "category_id": Cat.id,
            "country_id": Cou.id,
            "city_id": Cit.id,
            "license": license,
            "salary_start": salary_start,
            "salary_end": salary_end,
            "experience": experience,
            "description": draftToHtml(convertToRaw(desc?.getCurrentContent())),
            "onboard_at": date?.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }).split('/').reverse().join('-')
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

    // console.log(props)
    const handlecategory = (q: any) => {
        if (q !== '') {
            setCat(q)
          if (q.employee_type == 'onship') {
          
            setDisabled(true)
          } else {
            setDisabled(false) 
          }
        }  
          
    }
            
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
            <Grid container columnSpacing={'1'} rowSpacing={'2'}>
              <Grid item md={12} xs={12}>
                <Autocomplete
                  disablePortal
                  id='combo-box-company'
                  value={User}
                  options={Company}
                  {...register('company')}
                  getOptionLabel={(option: Company) => option.name}
                  renderInput={params => <TextField {...params} label='Company' />}
                  onChange={(event: any, newValue: Company | null) =>
                    newValue ? setUser(newValue) : setUser(props.selectedItem.company)
                  }
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  value={Cat}
                  options={JobCategory}
                  {...register('category')}
                  getOptionLabel={(option: JobCategory) => option.name}
                  renderInput={params => <TextField {...params} label='Job Category' />}
                  //   onChange={(event: any, newValue: JobCategory | null) =>
                  //     newValue?.id ? setCat(newValue) : setCat(props.selectedItem.category)
                  //   }
                  onChange={(event: any, newValue: JobCategory | null) =>
                    newValue ? handlecategory(newValue) : handlecategory('')
                  }
                />
              </Grid>
              {disabled == true && (
                <>
                  <Grid item md={4} xs={12}>
                    <Autocomplete
                      disablePortal
                      id='combo-box-type'
                      value={Type || null}
                      options={RoleType}
                      {...register('role_type')}
                      getOptionLabel={(option: RoleType) => option.name}
                      renderInput={params => <TextField {...params} label='Job Title' />}
                      onChange={(event: any, newValue: RoleType | null) =>
                        newValue ? setType(newValue) : setType(props.selectedItem.role_type)
                      }
                    />
                  </Grid>
                </>
              )}

              <Grid item md={4} xs={12}>
                <Autocomplete
                  disablePortal
                  id='combo-box-level'
                  value={Level}
                  options={RoleLevel}
                  getOptionLabel={(option: RoleLevel) => option?.levelName}
                  renderInput={params => <TextField {...params} label='Role Level' />}
                  onChange={(event: any, newValue: RoleLevel | null) =>
                    newValue ? setLevel(newValue) : setLevel(props.selectedItem.rolelevel)
                  }
                />
              </Grid>

              <Grid item md={4} xs={12}>
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  options={combocountry}
                  value={Cou}
                  getOptionLabel={(option: any) => option?.nicename}
                  renderInput={params => <TextField {...params} label='Country' />}
                  onChange={(event: any, newValue: Countries | null) =>
                    newValue?.id ? searchcity(newValue) : searchcity(props.selectedItem.country)
                  }
                />
              </Grid>

              <Grid item md={4} xs={12}>
                <Autocomplete
                  disablePortal
                  id='city'
                  options={combocity}
                  value={Cit}
                  getOptionLabel={(option: City) => option.city_name}
                  renderInput={params => <TextField {...params} label='City' />}
                  onChange={(event: any, newValue: City | null) =>
                    newValue?.id ? setCit(newValue) : setCit(props.selectedItem.city)
                  }
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <DatePickerWrapper>
                  <DatePicker
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
              <Grid item md={4} xs={12}>
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  value={Edu}
                  options={Education}
                  {...register('degree')}
                  getOptionLabel={(option: Degree) => option.name}
                  renderInput={params => <TextField {...params} label='Education' />}
                  onChange={(event: any, newValue: Degree | null) =>
                    newValue?.id ? setEdu(newValue) : setEdu(props.selectedItem.degree)
                  }
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  defaultValue={props.selectedItem.salary_start}
                  id='salary_start'
                  label='Salary From'
                  variant='outlined'
                  fullWidth
                  {...register('salary_start')}
                />
              </Grid>
              <Grid item md={4} xs={12}>
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
              <Grid item md={12} xs={12}>
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
                <EditorWrapper>
                  <EditorArea
                    placeholder='Description'
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

export default DialogEdit