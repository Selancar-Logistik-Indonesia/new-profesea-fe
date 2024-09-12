import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Box,
  Button,
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
  IconButton,
  Menu,
  MenuItem,
  Stack
} from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import CircleIcon from '@mui/icons-material/Circle'

import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import DialogRemoveConnection from './DialogRemoveConnection'

import style from '../../../../styles/css/ConnectionList.module.css'

export default function ConnectionTab(props: any) {
  const [page, setPage] = React.useState(1)
  const [connections, setConnections] = useState([])
  const [totalConnection, setTotalConnection] = useState(0)
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState<IUser>()
  const [showRemoveConnectionDialog, setShowRemoveConnectionDialog] = useState(false)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)
  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleSelectedUser = (selectedUser: IUser) => {
    setSelectedUser(selectedUser)
    setShowRemoveConnectionDialog(!showRemoveConnectionDialog)
  }

  const getConnections = () => {
    HttpClient.get(AppConfig.baseUrl + '/user/connected-profile/', {
      user_id: props.iduser,
      page: page,
      take: 10,
      search: search
    }).then(response => {
      const itemData = response.data.data
      console.log(response.data)
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
      <Typography variant='subtitle1'>Connections</Typography>
      <Typography>
        you have <b>{totalConnection} Connection</b>
      </Typography>

      <TextField
        value={search}
        onChange={e => setSearch(e.target.value)}
        type='text'
        name='search'
        id='search'
        variant='outlined'
        size='small'
        placeholder='search ...'
        sx={{ float: 'right', margin: '0 20px 0 0', fontSize: 14 }}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            handleSearch()
          }
        }}
      />
      <div style={{ clear: 'both' }}></div>

      {connections.length > 0 ? (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {connections.map((item: any, index) => (
            <Box key={index} className={style['list-box']}>
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar
                    style={{ height: 64, width: 64 }}
                    src={item?.friend?.photo || '/static/images/avatar/1.jpg'}
                  />
                </ListItemAvatar>
                <ListItemText
                  className={style['list-item-text']}
                  primary={
                    <React.Fragment>
                      <Typography component='span' variant='body2' color='text.primary'>
                        <Link href={'/profile/' + item.friend.id + '/' + item.friend.username}>
                          {item?.friend?.name}
                        </Link>
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography sx={{ fontSize: 12 }} component='span' variant='body2' color='text.primary'>
                        {item?.field_preference?.role_type?.name || 'No ranks'}
                        <CircleIcon sx={{ fontSize: 7, m: '0 5px' }} />
                        {item?.field_preference?.job_category?.name || ''} <br />
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
                  <Button variant='contained' size='small' sx={{ marginRight: 2, fontSize: 14, display: 'none' }}>
                    Message
                  </Button>

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
                        handleSelectedUser(item?.friend)
                        handleCloseMenu()
                      }}
                    >
                      Remove Connection
                    </MenuItem>
                  </Menu>
                </Box>
              </ListItem>
              <Divider variant='inset' component='hr' />
            </Box>
          ))}
        </List>
      ) : (
        <>
          <div style={{ textAlign: 'center', margin: '40px 0' }}>
            <img src='/images/no-connection-request.png' />
            <p>You have no connection </p>
          </div>
        </>
      )}
      <Grid container sx={{ mt: 10 }}>
        <Grid item>
          <Typography>
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
              variant='outlined'
              shape='rounded'
            />
          </Stack>
        </Grid>
      </Grid>

      <DialogRemoveConnection
        selectedItem={selectedUser}
        visible={showRemoveConnectionDialog}
        onCloseClick={() => setShowRemoveConnectionDialog(!showRemoveConnectionDialog)}
        loadConnection={getConnections}
      />
    </>
  )
}
