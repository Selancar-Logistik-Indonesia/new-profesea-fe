import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  createFilterOptions,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  useMediaQuery
} from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { AppConfig } from 'src/configs/api'
import JobCategory from 'src/contract/models/job_category'
import RegionTravel from 'src/contract/models/regional_travel'
import { RoleTypeAutocomplete } from 'src/contract/models/role_type'

import { IUser } from 'src/contract/models/user'
import VesselType from 'src/contract/models/vessel_type'
import { HttpClient } from 'src/services'
import { Theme, useTheme } from '@mui/material/styles'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import toast from 'react-hot-toast'
import { refreshsession } from 'src/utils/helpers'

interface IFormPreference {
  dataUser: IUser | null
}

let opp: any = []
const filter = createFilterOptions<RoleTypeAutocomplete>()

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const languages = ['Indonesian', 'English', 'Mandarin', 'Arab', 'Melayu']

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName?.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
  }
}

const FormPreference: React.FC<IFormPreference> = ({ dataUser }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  if (dataUser?.field_preference?.open_to_opp == 0) {
    opp = { id: '0', label: 'Not Available' }
  } else {
    opp = { id: '1', label: 'Open to Work' }
  }

  // combo
  const [comboOPP, getOpp] = useState<any>([])
  const [comboroleType, getComborolType] = useState<any>([])
  const [comboRegion, getComboroRegion] = useState<any>([])
  const [comboVessel, getComborVessel] = useState<any>([])

  // data user
  const [idOPP, setOpp] = useState<any>(dataUser?.field_preference?.open_to_opp)
  const [JC, setJC] = useState(dataUser?.field_preference?.category_id ? dataUser?.field_preference?.category_id : 0)
  const [availableDate, setAvailableDate] = useState<any>(dataUser?.field_preference?.available_date)
  const [JobCategory, getJobCategory] = useState<any[]>([])
  const [idcomborolType, setComboRolType] = useState<any>(dataUser?.field_preference?.role_type?.id)
  const [idcomboRegion, setComboRegion] = useState<any>(dataUser?.field_preference?.region_travel?.id)
  const [idcomboVessel, setComboVessel] = useState<any>(dataUser?.field_preference?.vessel_type?.id)
  const [spokenLangs, setSpokenLangs] = React.useState<string[]>(
    dataUser?.field_preference?.spoken_langs ? dataUser?.field_preference?.spoken_langs : []
  )

  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const comboBox = () => {
    HttpClient.get(`/job-category?search=&page=1&take=250&employee_type=${user?.employee_type}`)
      .then(response => {
        if (response.status != 200) {
          throw response.data.message ?? 'Something went wrong!'
        }
        getJobCategory(response.data.categories.data)
        const x = user?.employee_type
        let z = ''
        if (JC != 0) {
          z = '&category_id=' + JC
        }

        return HttpClient.get(
          AppConfig.baseUrl + '/public/data/role-type?page=1&take=100&search&employee_type=' + x + z
        )
      })
      .then(response => {
        const code = response.data.roleTypes.data

        getComborolType(code)
      })

    HttpClient.get(AppConfig.baseUrl + '/public/data/region-travel?page=1&take=100&search').then(response => {
      const code = response.data.regionTravels.data
      getComboroRegion(code)
    })

    const codeopp = [
      { id: '0', label: 'Not Available' },
      { id: '1', label: 'Open to Work' }
    ]
    getOpp(codeopp)

    getVesselType()
  }

  const getVesselType = () => {
    HttpClient.get(AppConfig.baseUrl + '/public/data/vessel-type?page=1&take=100&search').then(response => {
      const code = response.data.vesselTypes.data
      getComborVessel(code)
    })
  }

  const displayopp = (type: any) => {
    setOpp(type?.id)
  }

  const handleChange = (event: SelectChangeEvent<typeof spokenLangs>) => {
    const {
      target: { value }
    } = event
    setSpokenLangs(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const handleSubmitFormPreference = async () => {
    setLoadingSubmit(true)
    try {
      const data = {
        roletype_id: idcomborolType.id == 0 ? idcomborolType?.inputValue : idcomborolType?.id || idcomborolType,
        vesseltype_id: idcomboVessel,
        regiontravel_id: idcomboRegion,
        category_id: JC,
        available_date: availableDate,
        spoken_langs: spokenLangs,
        open_to_opp: +idOPP
      }

      await HttpClient.post(AppConfig.baseUrl + '/user/field-preference', data)

      toast.success('Submit Field Preference Successfully!')
      refreshsession()
    } catch (error: any) {
      console.log('field preference failed', error)
      toast.error('Submit Field Preference Failed ' + error?.response?.data.message)
    } finally {
      setLoadingSubmit(false)
    }
  }

  useEffect(() => {
    comboBox()
  }, [JC])

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <InputLabel
          required
          sx={{
            fontFamily: 'Figtree',
            fontSize: '12px',
            fontWeight: 700,
            mb: '12px',
            '& .MuiFormLabel-asterisk': {
              color: 'red'
            }
          }}
        >
          Status
        </InputLabel>
        <Autocomplete
          id='combo-box-status'
          options={!comboOPP ? [{ label: 'Loading...', id: 0 }] : comboOPP}
          defaultValue={opp}
          getOptionLabel={(option: any) => option.label}
          renderInput={params => <TextField {...params} variant='outlined' />}
          onChange={(event: any, newValue: any | null) => displayopp(newValue)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel
          required
          sx={{
            fontFamily: 'Figtree',
            fontSize: '12px',
            fontWeight: 700,
            mb: '12px',
            '& .MuiFormLabel-asterisk': {
              color: 'red'
            }
          }}
        >
          Available Date
        </InputLabel>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            format='DD/MM/YYYY'
            openTo='month'
            views={['year', 'month', 'day']}
            onChange={(date: any) => setAvailableDate(date)}
            value={availableDate ? moment(availableDate) : null}
            slotProps={{ textField: { variant: 'outlined', fullWidth: true, id: 'basic-input' } }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel
          required
          sx={{
            fontFamily: 'Figtree',
            fontSize: '12px',
            fontWeight: 700,
            mb: '12px',
            '& .MuiFormLabel-asterisk': {
              color: 'red'
            }
          }}
        >
          Job Category
        </InputLabel>
        <Autocomplete
          sx={{ marginBottom: 2 }}
          disablePortal
          id='combo-box-level'
          options={JobCategory}
          defaultValue={dataUser?.field_preference?.job_category}
          getOptionLabel={(option: JobCategory) => option.name}
          renderInput={params => <TextField {...params} variant='outlined' />}
          onChange={(event: any, newValue: JobCategory | null) => (newValue?.id ? setJC(newValue?.id) : setJC(0))}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel
          required
          sx={{
            fontFamily: 'Figtree',
            fontSize: '12px',
            fontWeight: 700,
            mb: '12px',
            '& .MuiFormLabel-asterisk': {
              color: 'red'
            }
          }}
        >
          Job Rank
        </InputLabel>
        <Autocomplete
          sx={{ display: 'block' }}
          disablePortal
          id='combo-box-job-title'
          options={comboroleType}
          defaultValue={dataUser?.field_preference?.role_type}
          renderInput={params => <TextField {...params} variant='outlined' />}
          onChange={(event: any, newValue: any) =>
            newValue ? setComboRolType(newValue) : setComboRolType(dataUser?.field_preference?.role_type?.id)
          }
          getOptionLabel={(option: RoleTypeAutocomplete) => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
              return option
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue
            }

            // Regular option
            return option.name
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params)

            const { inputValue } = params

            // Suggest the creation of a new value
            const isExisting = options.some(option => inputValue === option.name)
            if (inputValue !== '' && !isExisting) {
              filtered.push({
                inputValue: inputValue,
                id: 0,
                category_id: 0,
                name: inputValue,
                category: JC,
                user: dataUser,
                created_at: String(new Date()),
                updated_at: String(new Date())
              })
            }

            return filtered
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel
          required
          sx={{
            fontFamily: 'Figtree',
            fontSize: '12px',
            fontWeight: 700,
            mb: '12px',
            '& .MuiFormLabel-asterisk': {
              color: 'red'
            }
          }}
        >
          Region of Travel
        </InputLabel>
        <Autocomplete
          disablePortal
          id='combo-box-demo'
          options={comboRegion}
          getOptionLabel={(option: any) => option.name}
          defaultValue={dataUser?.field_preference?.region_travel}
          renderInput={params => <TextField {...params} variant='outlined' required={false} />}
          onChange={(event: any, newValue: RegionTravel | null) =>
            newValue?.id ? setComboRegion(newValue.id) : setComboRegion(dataUser?.field_preference?.region_travel?.id)
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel
          required
          sx={{
            fontFamily: 'Figtree',
            fontSize: '12px',
            fontWeight: 700,
            mb: '12px',
            '& .MuiFormLabel-asterisk': {
              color: 'red'
            }
          }}
        >
          Type of Vessel
        </InputLabel>
        <Autocomplete
          disablePortal
          id='combo-box-demo'
          options={comboVessel}
          getOptionLabel={(option: any) => option.name}
          defaultValue={dataUser?.field_preference?.vessel_type}
          renderInput={params => <TextField {...params} variant='outlined' />}
          onChange={(event: any, newValue: VesselType | null) =>
            newValue?.id ? setComboVessel(newValue.id) : setComboVessel(dataUser?.field_preference?.vessel_type?.id)
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel
          sx={{
            fontFamily: 'Figtree',
            fontSize: '12px',
            fontWeight: 700,
            mb: '12px',
            '& .MuiFormLabel-asterisk': {
              color: 'red'
            }
          }}
        >
          Language
        </InputLabel>
        <Select
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={spokenLangs}
          onChange={handleChange}
          sx={{ fontSize: '18px', height: 50.2, width: '100%' }}
          input={
            <OutlinedInput
              id='select-multiple-chip'
              label='Chip'
              defaultValue={dataUser?.field_preference?.spoken_langs}
              sx={{ fontSize: '8px' }}
            />
          }
          renderValue={selected => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, fontSize: '8px' }}>
              {selected.map(value => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {languages.map(l => (
            <MenuItem key={l} value={l} style={getStyles(l, spokenLangs, theme)}>
              {l}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button
          type='button'
          variant='contained'
          sx={{
            width: isMobile ? '140px !important' : '212px !important',
            px: '16px',
            py: '8px',
            textTransform: 'capitalize',
            fontSize: '14px',
            fontWeight: 400
          }}
          disabled={loadingSubmit}
          onClick={handleSubmitFormPreference}
        >
          {loadingSubmit ? <CircularProgress /> : ' Save Changes'}
        </Button>
      </Box>
    </Grid>
  )
}

export default FormPreference
