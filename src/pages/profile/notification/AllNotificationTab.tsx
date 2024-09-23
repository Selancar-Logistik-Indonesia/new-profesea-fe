import React, { useState } from 'react'
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import style from './../../../../styles/css/NotificationTab.module.css'

export default function AllNotificationTab() {
  const [sampleData] = useState([
    {
      name: 'Aries Dimas Yudhistira',
      title: 'First title and last Title of action',
      subtitle: '2 weeks ago'
    },
    {
      name: 'Muhammad Fadil Hakim',
      title: 'First title and last Title',
      subtitle: '3 months ago'
    }
  ])

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper', margin: '0 0 0 0' }}>
        <>
          {sampleData.map((item, index: number) => (
            <Box key={index} className={style['list-box']}>
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar style={{ height: 54, width: 54 }} src={'/static/images/avatar/1.jpg'} />
                </ListItemAvatar>
                <ListItemText
                  className={style['list-item-text']}
                  primary={
                    <React.Fragment>
                      <div className={style['title']}>
                        <b className={style['name']}>{item.name}</b> {item.title}
                      </div>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <div className={style['subtitle']}>{item.subtitle}</div>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </Box>
          ))}
        </>
      </List>
    </>
  )
}
