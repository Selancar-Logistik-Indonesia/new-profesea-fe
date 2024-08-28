import { Box, Typography } from '@mui/material'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'

const AboutMe = ({ dataUser }: { dataUser: IUser }) => {
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  if (!dataUser.about && dataUser.id !== user?.id) return null

  return (
    <Box sx={{ p: '24px', borderRadius: '16px', backgroundColor: '#FFFFFF', boxShadow: 3, overflow: 'hidden' }}>
      <Typography sx={{ mb: '24px', color: 'black', fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }}>
        {`about ${dataUser?.team_id === 3 ? 'company' : dataUser?.team_id === 4 ? 'trainer' : 'candidate'}`}
      </Typography>
      <Typography sx={{ color: '#636E72', fontSize: '16px', whiteSpace: 'pre-line' }}>
        {dataUser?.about ??
          "Looks like you haven't added your about me yet! Share a bit about your professional journey, skills, and accomplishments to help employers get to know you."}
      </Typography>
    </Box>
  )
}

export default AboutMe
