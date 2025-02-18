import React, { useState, useEffect } from 'react'

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Typography,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Stack,
  Grid,
  Menu,
  MenuItem
} from '@mui/material'
import ConnectButton from 'src/layouts/components/ConnectButton'
import CircleIcon from '@mui/icons-material/Circle'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'

import style from '../../../styles/css/ConnectionList.module.css'

export default function SuggestionTab(props: any) {
  const [pageSuggest, setPageSuggest] = React.useState(1)
  const [suggestions, setSuggestions] = useState([])
  const [totalSuggestions, setTotalSuggestions] = useState(0)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)
  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

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
      <Typography variant='subtitle1' sx={{ fontSize: '16px', fontWeight: 'bold' }}>
        Suggestion For You
      </Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper', margin: '24px 0 0 0' }}>
        {suggestions.map((item: any, index) => (
          <Box key={index} className={style['list-box']}>
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar style={{ height: 76, width: 76 }} src={item?.photo || '/static/images/avatar/1.jpg'} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    sx={{ display: 'inline', fontSize: 16, fontWeight: 'bold' }}
                    component='span'
                    variant='body2'
                    color='text.primary'
                  >
                    <Link href={'/profile/' + item.username}>{item?.name}</Link>
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'block', fontSize: 14, mb: '6px', fontWeight: '300' }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      {item?.field_preference?.role_type?.name || 'No ranks'}
                      <CircleIcon sx={{ fontSize: 4, m: '0 5px 2px 5px', color: '#525252' }} />
                      {item?.field_preference?.job_category?.name || ''}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14, mb: '6px', fontWeight: '300' }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      {item?.address ? item?.address?.city?.city_name + ', ' + item?.address?.country?.name : ''}
                    </Typography>
                  </React.Fragment>
                }
              />
              <Box className={style['button-list-connection-suggest']}>
                <ConnectButton user={item} />
              </Box>
              <Box className={style['menu-list-connection-suggest']}>
                <IconButton
                  aria-label='more'
                  id='long-button'
                  aria-controls={openMenu ? 'long-menu' : undefined}
                  aria-expanded={openMenu ? 'true' : undefined}
                  aria-haspopup='true'
                  onClick={handleClickMenu}
                >
                  <MoreHorizIcon />
                </IconButton>
                <Menu
                  id='long-menu'
                  MenuListProps={{
                    'aria-labelledby': 'long-button'
                  }}
                  open={openMenu}
                  anchorEl={anchorEl}
                  onClose={handleCloseMenu}
                >
                  <MenuItem
                    key={'remove'}
                    onClick={() => {
                      handleCloseMenu()
                    }}
                  >
                    <ConnectButton user={item} />
                  </MenuItem>
                </Menu>
              </Box>
            </ListItem>
            <Divider variant='inset' component='hr' sx={{ ml: '10px' }} />
          </Box>
        ))}
      </List>
      <Grid container sx={{ mt: 10 }}>
        <Grid item>
          <Typography sx={{ fontSize: 14, fontWeight: '300' }}>
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
              shape='rounded'
              color='primary'
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}
