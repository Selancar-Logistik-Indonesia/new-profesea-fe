import { Breadcrumbs, Grid, Link, Typography } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdNavigateNext } from 'react-icons/md'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import Training from 'src/contract/models/training'
import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'
import CandidateListTabs from 'src/views/training-management/candidate-list/CandidateListTabs'
import TrainingCard from 'src/views/training-management/candidate-list/TrainingCard'
import { v4 } from 'uuid'

const CandidateList = () => {
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const params = useSearchParams()
  const trainingId = params.get('id')

  const [training, setTraining] = useState<Training>()
  const [onLoading, setOnLoading] = useState<boolean>(false)
  const [count, setCount] = useState(v4())

  const getTraining = async () => {
    await HttpClient.get('/training/' + trainingId)
      .then(response => {
        const data = response.data.training
        setTraining(data)
      })
      .finally(() => setOnLoading(false))
  }

  useEffect(() => {
    setOnLoading(true)
    getTraining()
  }, [trainingId])

  useEffect(() => {
    getTraining()
  }, [count])

  if (!training || onLoading) return null


  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Grid item xs={12}>
        <Breadcrumbs separator={<MdNavigateNext fontSize={'17px'} color='black' />} aria-label='breadcrumb'>
          <Link key='1' href='/' sx={{ textDecoration: 'none' }}>
            <Typography
              sx={{
                color: '#32497A',
                fontSize: '14px',
                fontWeight: 400
              }}
            >
              Home
            </Typography>
          </Link>
          <Link key='2' href={user.role === 'Trainer' ? '/trainer/training-management' : '/admin/training-management'} sx={{ textDecoration: 'none' }}>
            {/* nanti ganti pake logic trainer/admin */}
            <Typography
              sx={{
                color: '#32497A',
                fontSize: '14px',
                fontWeight: 400
              }}
            >
              Training Management
            </Typography>
          </Link>
          <Typography
            key='3'
            sx={{
              color: '#949EA2',
              fontSize: '14px',
              fontWeight: 400,
              cursor: 'pointer'
            }}
          >
            {training.title}
          </Typography>
        </Breadcrumbs>
      </Grid>
      <Grid xs={12}>
        <TrainingCard training={training} />
      </Grid>
      <Grid xs={12}>
        <CandidateListTabs count={() => setCount(v4())} />
      </Grid>
    </Grid>
  )
}

CandidateList.acl = {
  action: 'read',
  subject: 'user-training-management'
}

export default CandidateList
