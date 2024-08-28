import { useEffect, useState } from 'react'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'

import { HttpClient } from 'src/services'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function NewsListCard() {
  const [dataSheet, setDataSheet] = useState<[]>([])
  const { t } = useTranslation()

  const getListNews = async () => {
    try {
      // const resp = await HttpClient.get(`/news?page=${1}&take=25&type=${forumCode}`)
      const resp = await HttpClient.get(`/news?page=1&take=2&type=News`)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      const rows = resp.data.news.data
      setDataSheet(rows)
    } catch (error) {
      let errorMessage = 'Something went wrong!'

      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message ?? errorMessage
      }

      if (typeof error == 'string') {
        errorMessage = error
      }

      toast.error(`Opps ${errorMessage}`)
    }
  }

  useEffect(() => {
    getListNews().then(() => {})
  }, [])

  const Item = (props: any) => {
    return (
      <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
        <CardContent>
          <Typography fontSize={15} style={{ color: '#000' }} fontWeight='800' textAlign='center'>
            {t('landing_event_title')}
          </Typography>
          {/* <Link style={{ textDecoration: 'none' }} href={'/news/' + props.item.slug}> */}
          <Link style={{ textDecoration: 'none' }} href={'/news/' + props.item.slug}>
            <CardMedia
              component='img'
              alt={'alt'}
              sx={{ objectFit: 'cover', marginBottom: '5', width: '100%' }}
              image={props.item.imgnews}
            />
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
      <CardContent>
        <Box sx={{ mb: 4 }}>
          <Typography variant='body2' sx={{ mb: 2, color: '#262525', textTransform: 'uppercase', fontWeight: 600 }}>
            Latest Article
          </Typography>
        </Box>

        {dataSheet.length > 0 ? (
          dataSheet.map((item: any, i: number) => <Item key={i} item={item}></Item>)
        ) : (
          <Box sx={{ mb: 4 }}>
            <Typography variant='body2' sx={{ mb: 2, color: '#262525', fontWeight: 600 }}>
              No article
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
