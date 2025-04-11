import { Box, Breadcrumbs, Link, Typography } from '@mui/material'
import { MdNavigateNext } from 'react-icons/md'
import TrainingForm from 'src/views/training-management/TrainingForm'



const CreateTraining = () => {
    

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
            Add New Training
          </Typography>
        </Breadcrumbs>
      </Box>
      {/* create training card */}
      <TrainingForm type="create"/>
    </Box>
  )
}



CreateTraining.acl = {
  action: 'read',
  subject: 'user-training-management'
}

export default CreateTraining
