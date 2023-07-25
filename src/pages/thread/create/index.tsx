// ** React Imports
import React , { useEffect, useState } from 'react'

// ** MUI Components
import Box  from '@mui/material/Box'  
import {  Autocomplete, Button,    TextField    } from '@mui/material'

// import {  useTheme } from '@mui/material/styles'
// ** Third Party Imports
import EditorControlled from './EditorControlled'

// ** Component Import
 import {   Grid } from '@mui/material'  
 import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'   
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Forum from 'src/contract/models/forum'
 
const Thread = () => {  
  // const theme = useTheme()  
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser 
  const [forumCode, getForumCode] = useState<[]>([])
  const [sforumCode, setForumCode] = useState(0)
const schema = yup.object().shape({
  title: yup.string().min(1).required(),
  forum: yup.string().min(1).required()
})
 const {
  //  register,
  //  formState: { errors },
  //  handleSubmit
 } = useForm<FormData>({
   mode: 'onBlur',
   resolver: yupResolver(schema)
 })  
 const combobox = () => {
   HttpClient.get(AppConfig.baseUrl + '/forum?page=1&take=10&search=').then(response => {
     const code = response.data.forums.data
     getForumCode(code)
   })
 }
useEffect(() => {
  combobox()
}, [])
const save = ( ) => {
  // HttpClient.post(AppConfig.baseUrl + '/auth/register', json).then(
  //   ({ data }) => {
  //     console.log('here 1', data)
  //     toast.success(data.name + ' Successfully submited!')
  //    },
  //   error => {
  //     console.log('here 1', error)
  //     toast.error('Registrastion Failed ' + error.response.data.message)
  //   }
  // )
  console.log(sforumCode,user)
}


  return (
    <Box>
      <Grid container spacing={2}>
        <Grid xs={10} container>
          <Grid
            item
            container
            xs={12}
            sx={{
              boxSizing: 'border-box',
              background: '#FFFFFF',
              border: '1px solid rgba(76, 78, 100, 0.12)',
              borderRadius: '20px',
              p: 4,
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'left',
              wrap: 'nowrap'
            }}
          >
            <Grid item container xs={12} columnSpacing={'1'} rowSpacing={'0,5'} sx={{ mb: 2 }}>
              <Grid xs={12} md={6}>
                <TextField
                  id='companyName'
                  // defaultValue={props.datauser.name}
                  label='Company Name'
                  variant='outlined'
                  fullWidth
                  sx={{ mb: 1 }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <Autocomplete
                  disablePortal
                  id='code'
                  options={forumCode}
                  renderInput={params => <TextField {...params} label='Forum' />}
                  getOptionLabel={(option: any) => option.name}
                  onChange={(event: any, newValue: Forum | null) =>
                    newValue?.id ? setForumCode(newValue.id) : setForumCode(0)
                  }
                />
              </Grid>
            </Grid>
            <Grid xs={12}>
              <EditorWrapper>
                <EditorControlled  />
                <Button onClick={save}>Save</Button>
              </EditorWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={2} container></Grid>
      </Grid>
    </Box>
  )
}
 

Thread.acl = {
  action: 'read',
  subject: 'home'
};
export default Thread
