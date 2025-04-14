import { Box, Breadcrumbs, Link, Typography } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdNavigateNext } from 'react-icons/md'
import Training from 'src/contract/models/training'
import { HttpClient } from 'src/services'
import TrainingForm from 'src/views/training-management/TrainingForm'



const CreateTraining = () => {
    const [training, setTraining] = useState<Training>()
    const params = useSearchParams()
    const trainingId = params.get('id')

    const onLoad = async () =>{
        try {
           const res = await HttpClient.get(`/training/${trainingId}`)

           setTraining(res.data.training)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        onLoad()
    },[])

  return (
    <Box>
        {/* breadcrumbs */}
      <Box>
        <Breadcrumbs separator={<MdNavigateNext fontSize={'17px'} color='black' />} aria-label='breadcrumb'>
          <Link key='1' href='/' sx={{ textDecoration: 'none' }}>
            <Typography
              sx={{
                color: '#32497A',
                fontSize: '14px',
                fontWeight: 400
              }}
            >
              Homepage
            </Typography>
          </Link>
          <Link key='2' href='/trainer/training-management' sx={{ textDecoration: 'none' }}>
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
            Edit Training
          </Typography>
        </Breadcrumbs>
      </Box>
      {/* create training card */}
      <TrainingForm type="edit" training={training}/>
    </Box>
  )
}



CreateTraining.acl = {
  action: 'read',
  subject: 'user-training-management'
}

export default CreateTraining
