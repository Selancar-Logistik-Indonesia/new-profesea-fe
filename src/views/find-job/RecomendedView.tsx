import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import { Avatar, Paper } from '@mui/material'
import Job from 'src/contract/models/job'
import Link from 'next/link'

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
      <Grid item xs={12} md={4} key={item?.id} >
        <Paper sx={{ marginTop: '10px' }} >
        <Link style={{ textDecoration: 'none' }} href={'/candidate/job/?id='+item?.id} >
            <Box
              height={65}
              sx={{
                display: 'flex',
                alignContent: 'center',
                '& svg': { color: 'text.secondary' }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={2} ml={2} mr={3}>
                <Avatar src={userPhoto} alt='profile-picture' sx={{ width: 50, height: 50 }} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }} marginTop={2}>
                <Typography sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }} fontSize={14} >
                  {item?.role_type?.name}
                </Typography>
                <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={12}>
                  {item?.company?.name ?? "-"}
                </Typography>
              </Box>
            </Box>
          </Link>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }} ml={2} mr={3} mt={2}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} >
              <Icon icon='mdi:account-tie'/>
              <Typography sx={{ color: 'text.primary' }} ml="0.5rem" mt="0.2rem">
                {item?.rolelevel?.levelName}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} >
              <Icon icon='mdi:currency-usd' />
              <Typography sx={{ color: 'text.primary' }} ml="0.5rem" mt="0.2rem">
                Up to Rp. {item?.salary_end}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={2} >
              <Icon icon='mdi:school'/>
              <Typography sx={{ color: 'text.primary' }} ml="0.5rem" mt="0.2rem">
                {item?.degree?.name}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
    )
  })
}

const RecomendedView = (props: Props) => {
  const { listJob } = props

  return (
    <Grid container spacing={2}>
      {renderList(listJob)}
    </Grid>
  )
}

export default RecomendedView;
