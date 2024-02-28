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
      const resp = await HttpClient.get(`/news?page=${1}&take=2&type=News`)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      const rows = resp.data.news.data
      const items = rows
      setDataSheet(items)
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
      <Card
        sx={{
          color: 'common.white',
          backgroundColor: '#FFFFFF',
          marginRight: 3,
          height: 200,
          marginBottom: 5,
          marginTop: 5
        }}
      >
        <CardContent>
          <Typography fontSize={15} style={{ color: '#000' }} fontWeight='800' textAlign='center'>
            {t('landing_event_title')}
          </Typography>
          {/* <Link style={{ textDecoration: 'none' }} href={'/news/' + props.item.slug}> */}
          <Link style={{ textDecoration: 'none' }} href={'/news/' + props.item.title}>
            <CardMedia
              component='img'
              alt={'alt'}
              sx={{ objectFit: 'contain', marginBottom: '5', height: { md: '450px', xs: '150px' } }}
              image={props.item.imgnews}
            />
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
        <Box sx={{ mb: 7 }}>
          <Typography variant='body2' sx={{ mb: 4, color: '#262525', textTransform: 'uppercase', fontWeight: 600 }}>
            Latest Article
          </Typography>
        </Box>

        {dataSheet.map((item: any, i: number) => (
          <Item key={i} item={item}></Item>
        ))}
      </CardContent>
    </Card>
  )
}
