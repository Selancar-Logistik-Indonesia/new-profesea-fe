import { Box } from '@mui/material'
import { IUser } from 'src/contract/models/user'
// import BlockButton from "src/layouts/components/BlockButton"
import ConnectButton from 'src/layouts/components/ConnectButton'
import MessageButton from 'src/layouts/components/MessageButton'

type Props = {
  enabled: boolean
  user: IUser
}

const ProfileActionArea = (props: Props) => {
  const { enabled } = props

  if (!enabled) {
    return <></>
  }

  return (
    <Box sx={{ justifyContent: 'right', display: 'flex', gap: '12px' }}>
      <MessageButton user={props.user} />
      <ConnectButton user={props.user} />
      {/* <BlockButton user={props.user} /> */}
    </Box>
  )
}

export default ProfileActionArea
