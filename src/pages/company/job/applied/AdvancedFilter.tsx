import { Icon } from '@iconify/react'
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Collapse,
  FormControlLabel,
  Grid,
  IconButton,
  Popover,
  TextField,
  Typography
} from '@mui/material'
import React, { SetStateAction, useEffect, useState } from 'react'
import Licensi from 'src/contract/models/licensi'
import { HttpClient } from 'src/services'

interface IAdvancedFilterProps {
  collapsedAdvanced: boolean
  isVisaUSA: boolean
  isVisaSchengen: boolean
  showadvance: boolean
  setCollapsedAdvanced: (value: SetStateAction<boolean>) => void
  setLicenseCOC: (value: SetStateAction<any>) => void
  setLicenseCOP: (value: SetStateAction<any>) => void
  setLanguage: (value: SetStateAction<any>) => void
  setCitizenship: (value: SetStateAction<any>) => void
  setIsVisaUSA: (value: SetStateAction<any>) => void
  setIsVisaSchengen: (value: SetStateAction<any>) => void
}

const LANGUAGE_OPTIONS = [
  {
    label: 'Indonesian',
    value: 'indonesia'
  },
  {
    label: 'English',
    value: 'english'
  },
  {
    label: 'Mandarin',
    value: 'mandarin'
  },
  {
    label: 'Arab',
    value: 'arab'
  },
  {
    label: 'Melayu',
    value: 'melayu'
  }
]

const AdvancedFilter: React.FC<IAdvancedFilterProps> = ({
  collapsedAdvanced,
  isVisaUSA,
  isVisaSchengen,
  showadvance,
  setCollapsedAdvanced,
  setLicenseCOC,
  setLicenseCOP,
  setLanguage,
  setCitizenship,
  setIsVisaUSA,
  setIsVisaSchengen
}) => {
  const popoverContent = 'need premium access'
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const [licensesDataCOC, setLicensesDataCOC] = useState<Licensi[]>([])
  const [licensesDataCOP, setLicensesDataCOP] = useState<Licensi[]>([])
  const [countryOptions, setCountryOptions] = useState<any>([])

  const combobox = async () => {
    const resp2 = await HttpClient.get(`/licensi/all`)
    if (resp2.status != 200) {
      throw resp2.data.message ?? 'Something went wrong!'
    }
    setLicensesDataCOC(resp2.data.licensiescoc)
    setLicensesDataCOP(resp2.data.licensiescop || [])

    HttpClient.get('/public/data/country?search=').then(response => {
      if (response.status != 200) {
        throw response.data.message ?? 'Something went wrong!'
      }

      setCountryOptions(response.data.countries)
    })
  }

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  useEffect(() => {
    combobox()
  }, [])

  return (
    <Box mb={3}>
      <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFFF' }}>
        <CardHeader
          title={
            <Typography variant='body2' style={{ fontSize: '14px', color: '#262525' }}>
              Advance Filter
            </Typography>
          }
          action={
            <IconButton
              size='small'
              aria-label='collapse'
              sx={{ color: '#262525' }}
              onClick={() => setCollapsedAdvanced(!collapsedAdvanced)}
            >
              <Icon fontSize={20} icon={!collapsedAdvanced ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
            </IconButton>
          }
        />
        <Collapse in={collapsedAdvanced}>
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div>
                <Autocomplete
                  multiple
                  options={licensesDataCOC}
                  id='license'
                  filterSelectedOptions
                  getOptionLabel={option => option.title || ''}
                  fullWidth
                  onChange={(e, newValue: any) => (newValue ? setLicenseCOC(newValue) : setLicenseCOC([]))}
                  renderInput={params => <TextField {...params} fullWidth label='Certificate of Competency' />}
                  disabled={!showadvance}
                  aria-owns={open ? 'mouse-over-popover-1' : undefined}
                  aria-haspopup='true'
                  onMouseEnter={!showadvance ? handlePopoverOpen : undefined}
                  onMouseLeave={!showadvance ? handlePopoverClose : undefined}
                />
                <Popover
                  id='mouse-over-popover-1'
                  sx={{
                    pointerEvents: 'none'
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 1 }}>{popoverContent}</Typography>
                </Popover>
              </div>
              <div>
                <Autocomplete
                  multiple
                  options={licensesDataCOP}
                  id='licensecop'
                  filterSelectedOptions
                  getOptionLabel={option => option.title || ''}
                  fullWidth
                  onChange={(e, newValue: any) => (newValue ? setLicenseCOP(newValue) : setLicenseCOP([]))}
                  renderInput={params => <TextField {...params} fullWidth label='Certificate of Proficiency' />}
                  disabled={!showadvance}
                  aria-owns={open ? 'mouse-over-popover-2' : undefined}
                  aria-haspopup='true'
                  onMouseEnter={!showadvance ? handlePopoverOpen : undefined}
                  onMouseLeave={!showadvance ? handlePopoverClose : undefined}
                />
                <Popover
                  id='mouse-over-popover-2'
                  sx={{
                    pointerEvents: 'none'
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 1 }}>{popoverContent}</Typography>
                </Popover>
              </div>
              <div>
                <Autocomplete
                  multiple
                  options={LANGUAGE_OPTIONS}
                  id='combo-box-language'
                  filterSelectedOptions
                  getOptionLabel={option => option.label || ''}
                  fullWidth
                  onChange={(e, newValue: any) => (newValue ? setLanguage(newValue) : setLanguage(null))}
                  renderInput={params => <TextField {...params} fullWidth label='Language' />}
                  disabled={!showadvance}
                  aria-owns={open ? 'mouse-over-popover-3' : undefined}
                  aria-haspopup='true'
                  onMouseEnter={!showadvance ? handlePopoverOpen : undefined}
                  onMouseLeave={!showadvance ? handlePopoverClose : undefined}
                />
                <Popover
                  id='mouse-over-popover-3'
                  sx={{
                    pointerEvents: 'none'
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 1 }}>{popoverContent}</Typography>
                </Popover>
              </div>
              <div>
                <Autocomplete
                  disablePortal
                  id='combo-box-citizenship'
                  options={countryOptions}
                  getOptionLabel={(option: any) => option.nicename}
                  renderInput={params => <TextField {...params} label='Citizenship' />}
                  onChange={(event: any, newValue: any | null) =>
                    newValue ? setCitizenship(newValue) : setCitizenship(null)
                  }
                  disabled={!showadvance}
                  aria-owns={open ? 'mouse-over-popover-4' : undefined}
                  aria-haspopup='true'
                  onMouseEnter={!showadvance ? handlePopoverOpen : undefined}
                  onMouseLeave={!showadvance ? handlePopoverClose : undefined}
                />
                <Popover
                  id='mouse-over-popover-4'
                  sx={{
                    pointerEvents: 'none'
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 1 }}>{popoverContent}</Typography>
                </Popover>
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isVisaUSA}
                      onChange={event => setIsVisaUSA(event.target.checked)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label='Visa USA'
                  sx={{ width: '150px' }}
                  disabled={!showadvance}
                  aria-owns={open ? 'mouse-over-popover-5' : undefined}
                  aria-haspopup='true'
                  onMouseEnter={!showadvance ? handlePopoverOpen : undefined}
                  onMouseLeave={!showadvance ? handlePopoverClose : undefined}
                />
                <Popover
                  id='mouse-over-popover-5'
                  sx={{
                    pointerEvents: 'none'
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 1 }}>{popoverContent}</Typography>
                </Popover>
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isVisaSchengen}
                      onChange={event => setIsVisaSchengen(event.target.checked)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label='Visa Schengen'
                  sx={{ width: '150px' }}
                  disabled={!showadvance}
                  aria-owns={open ? 'mouse-over-popover-6' : undefined}
                  aria-haspopup='true'
                  onMouseEnter={!showadvance ? handlePopoverOpen : undefined}
                  onMouseLeave={!showadvance ? handlePopoverClose : undefined}
                />
                <Popover
                  id='mouse-over-popover-6'
                  sx={{
                    pointerEvents: 'none'
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 1 }}>{popoverContent}</Typography>
                </Popover>
              </div>
            </Box>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  )
}

export default AdvancedFilter
