import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Box,
  Divider,
  TextField,
  Typography,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Grid,
  InputAdornment,
  Stack
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'

import ButtonFollowCompany from 'src/layouts/components/ButtonFollowCompany'

export default function CompanyListTab(props: any) {
  const [page, setPage] = React.useState(1)
  const [connections, setConnections] = useState([])
  const [totalConnection, setTotalConnection] = useState(0)
  const [search, setSearch] = useState('')

  const getConnections = () => {
    HttpClient.get(AppConfig.baseUrl + '/user/followed-companies/', {
      user_id: props.iduser,
      page: page,
      take: 10,
      search: search
    }).then(response => {
      const itemData = response.data.data

      setConnections(itemData)
      setTotalConnection(response.data.total)
    })
  }

  const handleSearch = () => {
    getConnections()
  }

  useEffect(() => {
    getConnections()
  }, [])

  useEffect(() => {
    getConnections()
  }, [page])

  return (
    <>
      <Grid container>
        <Grid item md={7} xs={12}>
          <Typography variant='subtitle1' sx={{ fontSize: '16px', fontWeight: 'bold' }}>
            Company you follows
          </Typography>
          <Typography>
            you followed &nbsp;
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#32487A' }}>{totalConnection} Companies</span>
          </Typography>
        </Grid>
        <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }} md={5} xs={12}>
          <TextField
            value={search}
            onChange={e => setSearch(e.target.value)}
            type='text'
            name='search'
            id='search'
            variant='outlined'
            size='small'
            placeholder='search ...'
            sx={{ float: 'right', fontSize: 14, mt: 2 }}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                handleSearch()
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='start' onClick={() => handleSearch()} sx={{ cursor: 'pointer' }}>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>

      <div style={{ clear: 'both' }}></div>

      {connections.length > 0 ? (
        <List sx={{ width: '100%', bgcolor: 'background.paper', margin: '24px 0 0 0' }}>
          {connections.map((item: any, index) => (
            <Box key={index} sx={{ m: '0 -16px 16px -16px' }}>
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar style={{ height: 76, width: 76 }} src={item?.user?.photo || '/static/images/avatar/1.jpg'} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        component='span'
                        variant='body2'
                        color='text.primary'
                        sx={{ display: 'inline', fontSize: 16, fontWeight: 'bold' }}
                      >
                        <Link href={'/profile/' + item.user.id + '/' + item.user.username}>{item?.user?.name}</Link>
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ fontSize: 14, mb: '6px', fontWeight: '300' }}
                        component='span'
                        variant='body2'
                        color='text.primary'
                      >
                        {item?.user?.industry?.name || 'No ranks'}
                      </Typography>
                      <br />
                      <Typography
                        sx={{ fontSize: 14, mb: '6px', fontWeight: '300' }}
                        component='span'
                        variant='body2'
                        color='text.primary'
                      >
                        {item?.user?.address
                          ? item?.user?.address?.city?.city_name + ', ' + item?.user?.address?.country?.name
                          : ''}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <Box>
                  <ButtonFollowCompany
                    friend_id={Number(item?.friend_id)}
                    user_id={Number(item?.user_id)}
                    getConnections={getConnections}
                  />
                </Box>
              </ListItem>
              <Divider variant='inset' component='hr' sx={{ ml: '10px' }} />
            </Box>
          ))}
        </List>
      ) : (
        <>
          <div style={{ textAlign: 'center', margin: '40px 0' }}>
            <img src='/images/no-connection-request.png' />
            <p style={{ fontSize: 14, fontWeight: 300, color: '#868686' }}>You have no connection </p>
          </div>
        </>
      )}
      <Grid container sx={{ mt: 10 }}>
        <Grid item>
          <Typography sx={{ fontSize: 14, fontWeight: '300' }}>
            Showing {connections.length} out of {totalConnection}
          </Typography>
        </Grid>
        <Grid item sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <Stack direction='row' justifyContent='center' alignItems='center' spacing={0}>
            <Pagination
              count={Math.ceil(totalConnection / 10)}
              onChange={(e: React.ChangeEvent<unknown>, value: number) => {
                setPage(value)
              }}
              shape='rounded'
              color='primary'
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}
