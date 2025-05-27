import { useState } from 'react'
import { useSocialFeed } from 'src/hooks/useSocialFeed'
import { Button } from '@mui/material'
import { Icon } from '@iconify/react'
import moment from 'moment'

type ButtonLikeParam = {
  id: number
  liked_at?: string
  isLiked?: boolean
  count_likes: number
  set_count_likes: (value: number) => void
  setIsLiked: (value: boolean) => void
}

const ButtonLike = (props: { item: ButtonLikeParam; likeableType: string; variant?: 'no-icon'; isXs?: boolean }) => {
  const { item, likeableType, variant, isXs } = props
  const { likeUnlikeFeed } = useSocialFeed()
  const [onLoading, setOnLoading] = useState(false)
  const [likedAt, setLikedAt] = useState(item.liked_at)

  const handleClick = () => {
    setOnLoading(true)
    likeUnlikeFeed(item.id, likeableType)
      .then(() => {
        item.set_count_likes(!likedAt ? item.count_likes + 1 : item.count_likes - 1)
        setLikedAt(!likedAt ? moment().toISOString() : undefined)
        if (item.setIsLiked) {
          item.setIsLiked(!item.isLiked)
        }
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
        variant === 'no-icon' || isXs ? undefined : (
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
