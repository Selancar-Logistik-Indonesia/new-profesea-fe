import { Input } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import toast from 'react-hot-toast'
import { getCleanErrorMessage } from 'src/utils/helpers'

const UsernameChange = (props: { userId: number; username: string }) => {
  const { userId, username } = props
  const [editable, setEditable] = useState(false)
  const [myUsername, setMyUsername] = useState(username)

  const handleChangeUsername = async () => {
    try {
      const response = await HttpClient.patch(AppConfig.baseUrl + '/user/update-username', {
        id: userId,
        username: myUsername
      })

      if (response.status == 200) {
        toast.success('Username update success')
        setMyUsername(myUsername)
        location.href = '/profile/' + myUsername
      } else {
        toast.error(response.data.message)
        setMyUsername(username)
      }
    } catch (err) {
      toast.error(getCleanErrorMessage(err))
      setMyUsername(username)
      console.log(err)
    }
  }

  useEffect(() => {
    if (myUsername != username && editable == false) {
      handleChangeUsername()
    }
  }, [editable])

  return (
    <Box
      sx={{
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        boxShadow: 3,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ p: '24px' }}>
        <Typography
          sx={{
            mb: '12px',
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            textTransform: 'capitalize'
          }}
        >
          Custom Url
        </Typography>
        <Box>
          <Typography
            sx={{
              fontSize: 18,

              color: 'grey',
              breakWord: 'break-all'
            }}
          >
            https://profesea.id/profile/
          </Typography>
          <div hidden>{userId}</div>
          <div style={{ fontSize: 18, margin: '0 0 10px 0' }}>
            {editable ? (
              <Input
                style={{ fontSize: 18, margin: '0 10px 0 0' }}
                type='text'
                name='username'
                value={myUsername}
                placeholder='Please enter a username'
                onChange={e => setMyUsername(e.target.value)}
              />
            ) : (
              <u style={{ margin: '0 10px 0 0' }}>{username}</u>
            )}
            <a
              href={'#'}
              onClick={() => {
                setEditable(!editable)
              }}
            >
              Edit
            </a>
          </div>

          <Typography sx={{ fontSize: 18, lineHeight: '20px' }}>
            {' '}
            Your custom URL is set to your username! Edit anytime{' '}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default UsernameChange
