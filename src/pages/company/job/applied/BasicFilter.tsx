import { Icon } from '@iconify/react'
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Typography,
  Collapse,
  CardContent,
  Autocomplete,
  TextField
} from '@mui/material'
import React, { SetStateAction, useEffect, useState } from 'react'
import Degree from 'src/contract/models/degree'
import { HttpClient } from 'src/services'

interface IBasicFilterProps {
  collapsed: boolean
  setCollapsed: (value: SetStateAction<boolean>) => void
  jobCategory?: string
  setExperience: (value: SetStateAction<any>) => void
  getStatus: (value: SetStateAction<any>) => void
  setStatusOnBoard: (value: SetStateAction<any>) => void
  setEducation: (value: SetStateAction<any>) => void
}

const EXPERIENCE_OPTIONS_YEARS = [
  {
    label: '1 Year',
    value: 'one-year'
  },
  {
    label: '2 Year',
    value: 'two-year'
  },
  {
    label: '3 Year',
    value: 'three-year'
  },
  {
    label: '4 Year',
    value: 'four-year'
  },
  {
    label: '> 5 Year',
    value: 'more-then-five-year'
  }
]

const EXPERIENCE_OPTIONS_CONTRACT = [
  {
    label: '1 Contract',
    value: 'one-contract'
  },
  {
    label: '2 Contract',
    value: 'two-contract'
  },
  {
    label: '3 Contract',
    value: 'three-contract'
  },
  {
    label: '4 Contract',
    value: 'four-contract'
  },
  {
    label: '> 5 Contract',
    value: 'more-then-five-contract'
  }
]

const status: any[] = [
  { id: 'AP', title: 'Approved' },
  { id: 'RJ', title: 'Rejected' },
  { id: 'WR', title: 'Waiting Review' }
]

const STATUS_ONBOARD = [
  {
    label: 'Not Available',
    value: false
  },
  {
    label: 'Open to Work',
    value: true
  }
]

const BasicFilter: React.FC<IBasicFilterProps> = ({
  collapsed,
  setCollapsed,
  jobCategory,
  setExperience,
  getStatus,
  setStatusOnBoard,
  setEducation
}) => {
  const experienceOptions = jobCategory == 'onship' ? EXPERIENCE_OPTIONS_CONTRACT : EXPERIENCE_OPTIONS_YEARS
  const [educationOptions, setEducatioOptions] = useState<any[]>([])

  const combobox = async () => {
    HttpClient.get(`/public/data/degree`).then(response => {
      if (response.status != 200) {
        throw response.data.message ?? 'Something went wrong!'
      }
      setEducatioOptions(response.data.degrees)
    })
  }

  useEffect(() => {
    combobox()
  }, [])

  return (
    <Box mb={3}>
      <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFFF' }}>
        <CardHeader
          title={
            <Typography variant='body2' style={{ fontSize: '14px', color: '#262525' }}>
              Basic Filter
            </Typography>
          }
          action={
            <IconButton
              size='small'
              aria-label='collapse'
              sx={{ color: '#262525' }}
              onClick={() => setCollapsed(!collapsed)}
            >
              <Icon fontSize={20} icon={!collapsed ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
            </IconButton>
          }
        />
        <Collapse in={collapsed}>
          <CardContent>
            <Autocomplete
              disablePortal
              id='combo-box-experience'
              options={experienceOptions}
              getOptionLabel={option => option.label}
              renderInput={params => <TextField {...params} label='Experience (years / contract)' />}
              onChange={(event, newValue) => (newValue ? setExperience(newValue?.value) : setExperience(''))}
              sx={{ marginBottom: 2 }}
            />
            <Autocomplete
              disablePortal
              id='combo-box-status'
              options={status}
              getOptionLabel={(option: any) => option.title}
              renderInput={params => <TextField {...params} label='Application Status' />}
              onChange={(event: any, newValue: any | null) => (newValue?.id ? getStatus(newValue.id) : getStatus(''))}
              sx={{ marginBottom: 2 }}
            />
            {jobCategory == 'onship' && (
              <Autocomplete
                disablePortal
                id='combo-box-status-onboard'
                options={STATUS_ONBOARD}
                getOptionLabel={option => option.label}
                renderInput={params => <TextField {...params} label='Status On Board' />}
                onChange={(event: any, newValue: any | null) =>
                  newValue ? setStatusOnBoard(newValue.value) : setStatusOnBoard('')
                }
                sx={{ marginBottom: 2 }}
              />
            )}
            {jobCategory == 'offship' && (
              <Autocomplete
                disablePortal
                id='combo-box-education'
                options={educationOptions}
                getOptionLabel={(option: Degree) => option.name}
                renderInput={params => <TextField {...params} label='Education' />}
                onChange={(event: any, newValue: any | null) =>
                  newValue ? setEducation(newValue?.id) : setEducation('')
                }
                sx={{ marginBottom: 2 }}
              />
            )}
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  )
}

export default BasicFilter
