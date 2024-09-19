import { Button } from '@mui/material'
import { Icon } from '@iconify/react'

interface Props {
  replyCount: number
  onClick: () => void
  isXs?: boolean
}

function ButtonComment(props: Props) {
  return (
    <Button
      sx={{
        fontSize: '14px',
        fontWeight: 400,
        textTransform: 'none'
      }}
      color='primary'
      startIcon={props.isXs ? undefined : <Icon icon='ph:chat-circle' fontSize={16} />}
      onClick={props.onClick}
    >
      Comment
    </Button>
  )
}

export default ButtonComment
