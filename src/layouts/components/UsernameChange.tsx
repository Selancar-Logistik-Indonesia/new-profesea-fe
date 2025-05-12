import { Input } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import toast from 'react-hot-toast'
import { getCleanErrorMessage } from 'src/utils/helpers'
import { useAuth } from 'src/hooks/useAuth'
import dynamic from 'next/dynamic'

const ModalUnlockPlus = dynamic(() => import('src/@core/components/subscription/ModalUnlockPlus'), { ssr: false })

const UsernameChange = (props: { userId: number; username: string }) => {
  const { user, abilities } = useAuth()
  console.log(abilities)
  const { userId, username } = props
  const [editable, setEditable] = useState(false)
  const [myUsername, setMyUsername] = useState(username)
  const [isSubs, setIsSubs] = useState<boolean>(false)
  const [changeCounter, setChangeCounter] = useState<number>(0)

  const handleChangeUsername = async () => {
    try {
      const response = await HttpClient.patch(AppConfig.baseUrl + '/user/update-username', {
        id: userId,
        username: myUsername
      })

      if (response.status == 200) {
        toast.success('Username update success')
        setMyUsername(myUsername)
        setTimeout(() => {
          location.href = (user?.team_id == 2 ? '/profile/' : '/company/') + myUsername
        }, 2000)
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

  const getChangeCounter = () => {
    const changeAbilities = abilities?.items.find(f => f.code === 'CURL')
    setChangeCounter(changeAbilities?.used as number)
  }

  useEffect(() => {
    setIsSubs(abilities?.plan_type !== 'basic')
    getChangeCounter()
  }, [user, abilities])

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

            {!isSubs && changeCounter > 0 ? (
              <ModalUnlockPlus text='Unlock to Edit' />
            ) : (
              <>
                <a
                  style={{ display: 'block' }}
                  href={'#'}
                  onClick={() => {
                    setEditable(!editable)
                  }}
                >
                  Edit
                </a>
              </>
            )}
          </div>

          <Typography sx={{ fontSize: 16, lineHeight: '20px' }}>
            {' '}
            {!isSubs && changeCounter > 0
              ? 'You’ve already customized your company URL once. Unlock plus to change your profile URL !'
              : 'Your custom URL is set to your username! Edit anytime'}{' '}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default UsernameChange
