import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Avatar, Paper } from '@mui/material'
import Job from 'src/contract/models/job'

export type ParamMain = {
  name: string
  skill: string
  location: string
}

interface Props {
  listJob: Job[]
}

const renderList = (listJob: Job[]) => {
  if (!listJob || listJob.length == 0) {
    return <></>
  }

  console.log(listJob);

  return listJob.map((item) => {
    const userPhoto = (item?.company?.photo) ? item?.company?.photo : "/images/avatars/default-user.png";
    
    return (
      <Paper sx={{ marginTop: '10px' }} key={item?.id}>
        <Box
          height={95}
          sx={{
            display: 'flex',
            alignContent: 'center',
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={3} ml={2} mr={3}>
            <Avatar src={userPhoto} alt='profile-picture' sx={{ width: 60, height: 60 }} />
          </Box>
          <Box sx={{ padding: '5', display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }} marginTop={3}>
            <Typography sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }} fontSize={16}>
              {item?.rolelevel?.levelName}
            </Typography>
            <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={12}>
              {item?.company?.name ?? "-"}
            </Typography>
            <Box display={'flex'}>
              <Typography sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                Location :
              </Typography>
              <Typography sx={{ color: 'text.primary' }} ml="0.5rem">
                {item?.degree?.name} - {item?.degree?.name}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    )
  })
}

const RecomendedView = (props: Props) => {
  const { listJob } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box>
          {renderList(listJob)}
        </Box>
      </Grid>
    </Grid>
  )
}

export default RecomendedView;
