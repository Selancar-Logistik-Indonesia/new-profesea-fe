import { Box, Grid, Typography } from '@mui/material'
import { IUser } from 'src/contract/models/user'

const AboutMe = ({ dataUser }: { dataUser: IUser }) => {
  return (
    <Box sx={{ p: '24px', borderRadius: '4px', backgroundColor: '#FFFFFF' }}>
      <Typography sx={{ mb: '24px', color: 'black', fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }}>
        {`about ${dataUser?.team_id === 3 ? 'company' : dataUser?.team_id === 4 ? 'trainer' : 'candidate'}`}
      </Typography>
      <Typography sx={{ color: '#262525', fontSize: '16px', whiteSpace: 'pre-line' }}>{dataUser?.about}</Typography>
    </Box>
  )
}

export default AboutMe
