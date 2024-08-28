// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import { useMediaQuery, Typography } from '@mui/material'
import { Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import CompanyProfile from 'src/layouts/components/CompanyProfile'
import { useTheme } from '@mui/material/styles'
import { IUser } from 'src/contract/models/user'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'

type FormData = {
  companyName: string
  industryType: string
  country: string
  district: string
  city: string
  postalCode: string
  email: string
  code: string
  website: string
  phone: string
  address: string
  about: string
}
const Company = () => {

  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser;
  const [selectedItem, setSelectedItem] = useState<IUser | null>(null);
  const {
  } = useForm<FormData>({
    mode: 'onBlur',
  },)



  // const [value, setValue] = React.useState(0);
  // const [color, getColor] = useState<any>('#FFFFFF')
  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  //   if (newValue == 1) {
  //     getColor('#ffeae9');
  //   } else {

  //     getColor('#FFFFFF');
  //   }
  // };
  function firstload() {
    HttpClient.get(AppConfig.baseUrl + "/user/" + user.id)
      .then((response) => {
        const user = response.data.user as IUser;
        setSelectedItem(user);
      })
  }

  useEffect(() => {
    // setOpenPreview(false)
    firstload()
  }, [])

  return (

    <Box>
      <Grid container spacing={2}>
        <Grid
          container
          item
          xs={12}
          md={12}
          sx={
            !hidden
              ? {
                p: 4,
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                alignContent: 'top',
                marginBottom: '10px'
              }
              : {}
          }
        >
          <Grid item xs={12}>
            {/* <Box sx={{
              borderBottom: 1, borderColor: 'divider', boxSizing: 'border-box',
              background: '#FFFFFF',
              border: '1px solid rgba(76, 78, 100, 0.12)',
              borderRadius: '40px'
            }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ "& button.Mui-selected": { backgroundColor: '#32487A', color: 'white', borderRadius: '4px' } }} >

                <Tab label="COMPANY BUILDER" {...a11yProps(0)} />
                <Tab label="ACCOUNT" {...a11yProps(1)} />
                <Tab label="MANAGE" {...a11yProps(2)} />
              </Tabs>
            </Box> */}
            <Grid
              container
              item
              xs={12}
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                boxSizing: 'border-box',
                border: '1px solid rgba(76, 78, 100, 0.12)',
                borderRadius: '5px',
                backgroundColor: '#FFFFFF',
                marginTop: '10px',
                direction: 'row',
                justifyContent: 'flex-start',
                alignItems: 'top',
                alignContent: 'top',
                padding: '20px'
              }}
            >

              <Grid item xs={12}>

                <Grid container item xs={12} marginBottom={'10px'}>
                  <Grid container item xs={12} justifyContent={'left'}>
                    <Typography variant="h3" color={"#32487A"} fontWeight="800" fontSize={18}> Company Builder</Typography>
                  </Grid>
                </Grid>
                {selectedItem != null && (
                  <CompanyProfile visible={true} datauser={selectedItem} address={selectedItem.address} />
                )}

              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Box>
  )
}

// Company.getLayout = (page: ReactNode) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>

// Company.guestGuard = true

Company.acl = {
  action: 'read',
  subject: 'company'
};
export default Company
