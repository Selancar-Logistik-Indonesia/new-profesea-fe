import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import ListThread from './ListThread'

const Community = () => {
  const [listThread, setlistThread] = useState<any>([])

  const firstload = () => {
    HttpClient.get(AppConfig.baseUrl + '/thread?page=1&take=10&search=').then(response => {
      const code = response.data.threads.data

      setlistThread(code)
    })
  }
  useEffect(() => {
    firstload()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item lg={12} md={9} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ListThread paramcomment={listThread}></ListThread>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}


Community.acl = {
  action: 'read',
  subject: 'home'
};
export default Community
