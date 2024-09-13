import { useState } from 'react'
import { useSocialFeed } from 'src/hooks/useSocialFeed'
import { Button } from '@mui/material'
import { Icon } from '@iconify/react'
import moment from 'moment'

type ButtonLikeParam = {
  id: number
  liked_at?: string
  count_likes: number
}

const ButtonLike = (props: { item: ButtonLikeParam; likeableType: string; variant?: 'no-icon' }) => {
  const { item, likeableType, variant } = props
  const { likeUnlikeFeed } = useSocialFeed()
  const [onLoading, setOnLoading] = useState(false)
  const [likedAt, setLikedAt] = useState(item.liked_at)
  const [countLikes, setCountLikes] = useState(item.count_likes)

  const handleClick = () => {
    setOnLoading(true)
    likeUnlikeFeed(item.id, likeableType)
      .then(() => {
        setCountLikes(!likedAt ? countLikes + 1 : countLikes - 1)
        setLikedAt(!likedAt ? moment().toISOString() : undefined)
      })
      .finally(() => setOnLoading(false))
  }

  return (
    <Button
      disabled={onLoading}
      sx={{
        color: variant ? '#949EA2' : 'primary',
        fontSize: variant ? '12px' : '14px',
        fontWeight: variant ? 700 : 400,
        textTransform: 'none'
      }}
      onClick={handleClick}
      startIcon={
        variant === 'no-icon' ? undefined : (
          <Icon icon={!likedAt ? 'ph:thumbs-up' : 'ph:thumbs-up-fill'} fontSize={16} />
        )
      }
      variant={variant ? 'text' : undefined}
      size={variant ? 'small' : undefined}
    >
      Like
    </Button>
  )
}

export default ButtonLike
