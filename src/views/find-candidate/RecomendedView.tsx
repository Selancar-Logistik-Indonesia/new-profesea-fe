import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Avatar, Paper } from '@mui/material'
import { IUser } from 'src/contract/models/user'
import { toTitleCase } from 'src/utils/helpers'

export type ParamMain = {
  name: string
  skill: string
  location: string
}

interface Props {
  listCandidate: IUser[]
}

const renderList = (listCandidate: IUser[]) => {
  if (!listCandidate || listCandidate.length == 0) {
    return <></>
  }

  return listCandidate.map((item) => {
    const userPhoto = (item.photo) ? item.photo : "/images/avatars/default-user.png";

    return (
      <Paper sx={{ marginTop: '10px' }} key={item.id}>
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
              {toTitleCase(item.name)}
            </Typography>
            <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={12}>
              {toTitleCase(item.field_preference?.role_type?.name ?? "-")}
            </Typography>
            <Box display={'flex'}>
              <Typography sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                Location :
              </Typography>
              <Typography sx={{ color: 'text.primary' }} ml="0.5rem">
                {item.address?.city?.city_name} - {item.address?.country?.name}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    )
  })
}

const RecomendedView = (props: Props) => {
  const { listCandidate } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box>
          {renderList(listCandidate)}
        </Box>
      </Grid>
    </Grid>
  )
}

export default RecomendedView;
