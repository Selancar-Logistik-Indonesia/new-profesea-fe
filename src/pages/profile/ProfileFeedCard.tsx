import { useEffect, useState } from 'react'
import { Avatar, Box, Card, CardMedia, CardContent, Divider, Grid, Paper, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import moment from 'moment'
import ISocialFeed from 'src/contract/models/social_feed'
import FetchFeedPayload from 'src/contract/params/fetch_feed_payload'
import { AppConfig } from 'src/configs/api'
import { HttpClient } from 'src/services'
import { getUserAvatar, toTitleCase } from 'src/utils/helpers'
import { IUser } from 'src/contract/models/user'

interface IProfileFeedCard {
  selectedUser: IUser | null
}

export default function ProfileFeedCard(props: IProfileFeedCard) {
  const { selectedUser } = props

  const [feeds, setFeeds] = useState<ISocialFeed[]>([])
  const [onLoading, setOnLoading] = useState(false)

  const fetchFeeds = async (payload: FetchFeedPayload) => {
    let sPage = 1
    if (payload.mPage) {
      sPage = payload.mPage
    }

    // only trigger in page 1
    if (sPage == 1) setOnLoading(true)

    try {
      const url = '/social-feed/feed/'
      const response = await HttpClient.get(url, {
        ...payload,
        page: sPage
      })

      if (response.status == 200) {
        const { feeds } = response.data as { feeds: { data: ISocialFeed[]; next_page_url?: string; total: number } }
        if (feeds.data.length && feeds.data.length > 0) {
          if (sPage == 1) {
            setFeeds(feeds.data)
          } else {
            setFeeds((old: any) => {
              const newItems = old
              feeds.data.forEach(e => newItems.push(e))

              return newItems
            })
          }
        }
      }
    } catch (error) {
      console.error(error)
    }

    setOnLoading(false)
  }

  useEffect(() => {
    fetchFeeds({ mPage: 1, take: 2, user_id: selectedUser?.id })
  }, [selectedUser])

  return (
    <Grid container marginTop={'10px'}>
      <Grid item xs={12}>
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
          <CardContent>
            <Box sx={{ mb: 7 }}>
              <Typography variant='body2' sx={{ mb: 4, color: '#262525', textTransform: 'uppercase', fontWeight: 600 }}>
                Activity
              </Typography>
              {onLoading ? <Typography style={{ textAlign: 'center' }}> Loading .... </Typography> : ''}
              {feeds.length > 0 &&
                feeds.map((item, index) => (
                  <Paper
                    key={index}
                    sx={{
                      marginTop: '10px',

                      border: 0,
                      boxShadow: 0,
                      color: 'common.white',
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    <Box>
                      <Box
                        component={Link}
                        style={{ textDecoration: 'none' }}
                        href={`/profile/${item.user.username}`}
                        sx={{ display: 'flex', '& svg': { color: 'text.secondary' }, height: 60 }}
                      >
                        <Box>
                          <Avatar
                            sx={{ width: 50, height: 50, mr: 3, mb: 3 }}
                            src={getUserAvatar(item.user)}
                            alt='profile-picture'
                          />
                        </Box>
                        <Box sx={{ mb: 8, display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                          <Typography
                            variant='body2'
                            sx={{ color: '#0a66c2', fontWeight: 600, fontSize: '14px', textTransform: 'uppercase' }}
                          >
                            {toTitleCase(item.user.name)}
                          </Typography>
                          <Box
                            sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }}
                            mb={2}
                          >
                            <Icon color={'#26252542'} icon='mingcute:time-fill' fontSize={'18px'} /> &nbsp;
                            <Typography sx={{ color: '#262525', fontWeight: 600, fontSize: '12px' }}>
                              {moment(item.created_at).fromNow()}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Box
                        component={Link}
                        href={`/feed/${item.id}`}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          marginLeft: '10px',
                          p: 2,
                          border: '1px solid #e4e4e4'
                        }}
                      >
                        <Grid gap={1} container md={12} xs={12}>
                          {item.content_type == 'videos' && (
                            <Grid item md={1} height={100} width={100} sx={{ marginRight: 20 }}>
                              <CardMedia
                                sx={{ width: '100%', height: 100, my: 2 }}
                                component='video'
                                controls
                                src={`${AppConfig.baseUrl}/public/data/streaming?video=${item.attachments![0]}`}
                              />
                            </Grid>
                          )}
                          {item.content_type == 'images' && (
                            <Grid item md={1} height={100} width={200}>
                              <img
                                src={item.attachments![0]}
                                alt={item.content}
                                loading='lazy'
                                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                              />
                            </Grid>
                          )}
                          <Grid item md={10}>
                            <Typography
                              variant='body2'
                              sx={{ color: '#262525', fontSize: '14px', fontWeight: 400, mx: 3 }}
                            >
                              {item.content}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Paper>
                ))}
            </Box>
          </CardContent>
          <Divider />
          <CardContent>
            <Link href='#'>
              <Typography
                variant='body2'
                sx={{
                  color: '#0a66c2',
                  fontWeight: 600,
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  textAlign: 'center'
                }}
              >
                See More
              </Typography>
            </Link>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
