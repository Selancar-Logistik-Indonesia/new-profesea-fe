import { Input } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'

const UsernameChange = (props:{
    userId:number
    username:string
}) => {

    const { userId, username } = props
    const [editable, setEditable] = useState(false)
    const [myUsername, setMyUsername] = useState(username)

  useEffect(() => {
    
  }, [editable])

  return (
    <Box
      sx={{
        borderRadius : '16px',
        backgroundColor: '#FFFFFF',
        boxShadow:  3,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ p: '24px' }}>
        <Typography
          sx={{
            mb: '12px',
            color: 'black',
            fontSize:20,
            fontWeight: 'bold',
            textTransform: 'capitalize'
          }}
        >
          Custom Url 
        </Typography>
        <Box>
            <Typography sx={{
                fontSize:18,
               
                color:"grey",
                breakWord:'break-all'
            }}>https://profesea.id/profile/</Typography>
            <div hidden>{userId}</div>
            <div style={{fontSize:18, margin:'0 0 10px 0'}}>
                {editable ? <Input 
                    style={{ fontSize:18, margin:'0 10px 0 0'}}
                    type='text' 
                    name='username' 
                    value={myUsername}
                    placeholder='Please enter a username'
                    onChange={(e) => setMyUsername(e.target.value)}
                /> : <u style={{ margin:'0 10px 0 0'}}>{username}</u> }
                <a href={'#'} onClick={() => {
                    setEditable(!editable)
                }}>Edit <Icon></Icon></a>
            </div>
            
            <Typography sx={{ fontSize:18, lineHeight:'20px' }}> Your custom URL is set to your username! Edit anytime </Typography>
        </Box>
      </Box>
      
    </Box>
  )
}

export default UsernameChange
