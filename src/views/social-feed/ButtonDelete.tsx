import { Icon } from '@iconify/react'
import { Button } from '@mui/material'

import { useState } from 'react'
import { useSocialFeed } from 'src/hooks/useSocialFeed'

type ButtonLikeParam = {
  id: number
  liked_at?: string
  count_likes: number
  deleteComment?: boolean
}

const ButtonDelete = (props: { item: ButtonLikeParam; variant?: 'no-icon' }) => {
  const { item } = props
  const { deleteFeed, deleteComment } = useSocialFeed()
  const [onLoading, setOnLoading] = useState(false)

  const handleClick = async () => {
    if (item.deleteComment) {
      setOnLoading(true)
      if (deleteComment !== undefined) {
        await deleteComment(item.id)
      }

      return
    }

    setOnLoading(true)
    await deleteFeed(item.id)
  }

  return (
    <Button
      disabled={onLoading}
      sx={{
        fontSize: props.variant == 'no-icon' ? 11 : '0.7rem',
        textTransform: 'none'
      }}
      onClick={handleClick}
      size='small'
      color='primary'
      startIcon={props.variant == 'no-icon' ? undefined : <Icon icon='fluent:delete-48-filled' fontSize={10} />}
      variant={props.variant == 'no-icon' ? 'text' : undefined}
    >
      Delete
    </Button>
  )
}

export default ButtonDelete
