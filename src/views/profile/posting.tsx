import { Icon } from '@iconify/react'
import { Box, Button, Divider, Grid, Link, Typography, useMediaQuery, useTheme } from '@mui/material'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import { AppConfig } from 'src/configs/api'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'
import { formatIDR, timeCreated, toLinkCase } from 'src/utils/helpers'
import PostingSlider from './postingSlider'

const Posting = ({ dataUser, status }: { dataUser: IUser; status: boolean }) => {
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.down('md'))
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const [posting, getPosting] = useState([])

  useEffect(() => {
    if (dataUser.role == 'Company') {
      HttpClient.get(AppConfig.baseUrl + '/public/data/job?search=&page=1&take=3&username=' + dataUser.username).then(
        response => {
          const item = response.data.jobs.data
          getPosting(item)
        }
      )
    } else if (dataUser.role == 'Trainer') {
      HttpClient.get(
        AppConfig.baseUrl + '/public/data/training?search=&page=1&take=3&username=' + dataUser.username
      ).then(response => {
        const item = response.data.trainings.data
        getPosting(item)
      })
    }
  }, [dataUser])

  const isStatusLink = (link: string) => {
    if (!status) {
      return `/login/?returnUrl=` + link
    }

    return link
  }

  const showMoreLink = () => {
    const companyParam = encodeURIComponent(toLinkCase(dataUser.username) ?? '')

    if (dataUser.team_id === 3) {
      if (!user) return isStatusLink('/find-job')
      if (user.team_id === dataUser.team_id) return isStatusLink('/company/job-management')

      return isStatusLink(`/candidate/find-job?company=${companyParam}`)
    } else {
      if (!user) return isStatusLink('/trainings')
      if (user.team_id === dataUser.team_id) return isStatusLink('/trainer/training')

      return isStatusLink(`/candidate/trainings?trainer=${companyParam}`)
    }
  }

  return (
    <Box sx={{ borderRadius: '16px', backgroundColor: '#FFFFFF', boxShadow: 3, overflow: 'hidden' }}>
      <Box sx={{ p: '24px' }}>
        <Typography sx={{ mb: '12px', color: 'black', fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }}>
          {`recently posted ${dataUser?.team_id === 3 ? 'jobs' : dataUser?.team_id === 4 ? 'trainings' : ''}`}
        </Typography>
        {dataUser.team_id === 3 && (xs || posting.length < 2) ? (
          posting.map((arr: any, index) => {
            const companyNameUrl = arr.company.name.toLowerCase().split(' ').join('-')
            const jobTitleUrl = arr.job_title ? arr.job_title?.toLowerCase().split(' ').join('-') : ''
            const link =
              user && user.team_id !== 3 && user.team_id !== 4
                ? `/candidate/job/${companyNameUrl}/${arr?.id}/${jobTitleUrl}`
                : `/job/${companyNameUrl}/${arr?.id}/${jobTitleUrl}`

            return (
              <Link href={isStatusLink(link)} key={index}>
                <Grid
                  container
                  sx={{
                    display: 'flex',
                    gap: '16px'
                  }}
                >
                  <Box
                    component='img'
                    src={arr.company.photo ? arr.company.photo : '/images/avatars/default-user.png'}
                    sx={{
                      borderRadius: '50%',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      height: 42,
                      aspectRatio: 1
                    }}
                  />
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {arr.category.employee_type === 'onship' ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <Typography sx={{ color: 'primary.main', fontSize: 16, fontWeight: 'bold' }}>
                          {`${arr.category?.name ?? ''} `}
                          {arr.job_title ?? ''}
                        </Typography>
                        <Box
                          sx={{ p: '8px', border: '1px solid #32497A', borderRadius: '4px', maxWidth: 'fit-content' }}
                        >
                          <Typography sx={{ color: 'primary.main', fontSize: 12 }}>
                            {arr.vessel_type.name ?? '-'}
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: 14, color: '#949EA2' }}>
                          Onboarding on{' '}
                          <span style={{ color: '#32497A', fontWeight: 'bold' }}>
                            {format(new Date(arr.onboard_at), 'dd MMMM yyyy') ?? '-'}
                          </span>
                        </Typography>
                        <Typography sx={{ color: '#636E72', fontSize: 14 }}>{arr.company.name}</Typography>
                        <Typography sx={{ color: '#949EA2', fontSize: 12 }}>
                          {arr.created_at ? timeCreated(arr.created_at) : '-'}
                        </Typography>
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <Typography sx={{ color: 'primary.main', fontSize: 16, fontWeight: 'bold' }}>
                          {`${arr.category.name ?? ''}, `}
                          {arr.rolelevel.levelName ?? ''}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>{arr.city.city_name ?? '-'}</Typography>
                        <Typography sx={{ color: '#636E72', fontSize: 14 }}>{arr.company.name}</Typography>
                        <Box></Box>
                        <Typography sx={{ color: '#949EA2', fontSize: 12 }}>
                          {arr.created_at ? timeCreated(arr.created_at) : '-'}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>
                {index !== posting.length - 1 && <Divider sx={{ my: '16px' }} />}
              </Link>
            )
          })
        ) : dataUser.team_id === 4 && (xs || posting.length < 2) ? (
          posting.map((arr: any, index) => {
            const trainerNameUrl = arr.trainer.name.toLowerCase().split(' ').join('-')
            const trainingTitleUrl = arr.title ? arr.title?.toLowerCase().split(' ').join('-') : ''
            const link =
              user && user.team_id !== 3 && user.team_id !== 4
                ? `/candidate/trainings/${trainerNameUrl}/${arr.id}/${trainingTitleUrl}`
                : `/trainings/${trainerNameUrl}/${arr.id}/${trainingTitleUrl}`

            return (
              <Link href={link} key={index}>
                <Grid
                  container
                  sx={{
                    display: 'flex',
                    gap: '16px'
                  }}
                >
                  <Box
                    component='img'
                    src={arr.thumbnail ? arr.thumbnail : '/images/icon-trainer.png'}
                    sx={{
                      backgroundRepeat: 'no-repeat',
                      borderRadius: '8px',
                      backgroundSize: 'cover',
                      width: '100px',
                      maxHeight: '100px'
                    }}
                  />
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <Typography sx={{ color: 'primary.main', fontSize: 16, fontWeight: 'bold' }}>
                        {arr.title}
                      </Typography>
                      <Typography sx={{ color: 'primary.main', fontSize: 14 }}>{arr.category.category}</Typography>
                      <Typography sx={{ fontSize: 14, color: '#949EA2' }}>
                        {arr.discounted_price ? formatIDR(arr.discounted_price, true) : formatIDR(arr.price, true)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                {index !== posting.length - 1 && <Divider sx={{ my: '16px' }} />}
              </Link>
            )
          })
        ) : (
          <PostingSlider items={posting} teamId={dataUser.team_id} status={status} />
        )}
      </Box>
      <Divider sx={{ mx: '24px' }} />
      <Button
        endIcon={<Icon icon='mingcute:right-fill' style={{ fontSize: 18 }} />}
        href={showMoreLink()}
        sx={{
          py: '18px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textTransform: 'none',
          color: 'primary.main',
          fontSize: 14,
          fontWeight: 'bold',
          borderRadius: '0 !important'
        }}
      >
        {`Show more ${dataUser.team_id === 3 ? 'jobs' : 'trainings'}`}
      </Button>
    </Box>
  )
}

export default Posting
