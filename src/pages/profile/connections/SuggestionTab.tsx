import React, { useState, useEffect } from 'react'

import {
  Avatar,
  Box,
  Divider,
  Typography,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Stack,
  Grid
} from '@mui/material'
import ConnectButton from 'src/layouts/components/ConnectButton'
import CircleIcon from '@mui/icons-material/Circle'

import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'

import style from '../../../../styles/css/ConnectionList.module.css'

export default function SuggestionTab(props: any) {
  const [pageSuggest, setPageSuggest] = React.useState(1)
  const [suggestions, setSuggestions] = useState([])
  const [totalSuggestions, setTotalSuggestions] = useState(0)

  const getUserSuggestions = () => {
    HttpClient.get(AppConfig.baseUrl + '/user/suggested-friend/', {
      // user_id=' + iduser + '&page=1&take=10'
      user_id: props.iduser,
      page: pageSuggest,
      take: 10
    }).then(response => {
      const itemData = response.data.data
      console.log(response)
      setSuggestions(itemData)
      setTotalSuggestions(response.data.total)
    })
  }

  useEffect(() => {
    getUserSuggestions()
  }, [])

  useEffect(() => {
    getUserSuggestions()
  }, [pageSuggest])

  return (
    <>
      <Typography variant='subtitle1'>Suggestion For You</Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper', margin: '20px 0 0 0' }}>
        {suggestions.map((item: any, index) => (
          <Box key={index} className={style['list-box']}>
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar style={{ height: 64, width: 64 }} src={item?.photo || '/static/images/avatar/1.jpg'} />
              </ListItemAvatar>
              <ListItemText
                className={style['list-item-text']}
                primary={
                  <Typography
                    sx={{ display: 'inline', fontSize: 16, fontWeight: 'bold' }}
                    component='span'
                    variant='body2'
                    color='text.primary'
                  >
                    <Link href={'/profile/' + item.id + '/' + item.username}>{item?.name}</Link>
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'block', fontSize: 12 }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      {item?.field_preference?.role_type?.name || 'No ranks'}
                      <CircleIcon sx={{ fontSize: 7, m: '0 5px' }} />
                      {item?.field_preference?.job_category?.name || ''}
                    </Typography>
                    <Typography
                      sx={{ display: 'block', fontSize: 12 }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      {item?.address ? item?.address?.city?.city_name + ', ' + item?.address?.country?.name : ''}
                    </Typography>
                  </React.Fragment>
                }
              />
              <Box className={style['button-list-connection']}>
                <ConnectButton user={item} />
              </Box>
            </ListItem>
            <Divider variant='inset' component='hr' />
          </Box>
        ))}
      </List>
      <Grid container sx={{ mt: 10 }}>
        <Grid item>
          <Typography>
            Showing {suggestions.length} out of {totalSuggestions}
          </Typography>
        </Grid>
        <Grid item sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <Stack direction='row' justifyContent='center' alignItems='center' spacing={0}>
            <Pagination
              count={Math.ceil(totalSuggestions / 10)}
              onChange={(e: React.ChangeEvent<unknown>, value: number) => {
                setPageSuggest(value)
              }}
              variant='outlined'
              shape='rounded'
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}
