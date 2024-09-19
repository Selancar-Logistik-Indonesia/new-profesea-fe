import { Box, useMediaQuery, useTheme } from '@mui/material'
import ButtonComment from './ButtonComment'
import ButtonLike from './ButtonLike'
import ISocialFeed from 'src/contract/models/social_feed'
import ButtonRepost from './ButtonRepost'
import ButtonShare from './ButtonShare'
import { getUrl } from 'src/utils/helpers'
import { IUser } from 'src/contract/models/user'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import ButtonDelete from './ButtonDelete'
// import ButtonUpdate from './ButtonUpdate'

type Props = {
  item: ISocialFeed
  openComment: boolean
  openUpdate: boolean
  user?: IUser
  setOpenComment: (i: boolean) => void
  setOpenUpdate: (i: boolean) => void
}

const FeedBottomActions = (props: Props) => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('md'))
  const { item, openComment, setOpenComment } = props
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  if (user.team_id == 1) {
    return (
      <Box sx={{ mt: 4 }}>
        <ButtonDelete item={{ id: item.id, count_likes: item.count_likes, liked_at: item.liked_at }} />
        <ButtonComment replyCount={item.count_comments} onClick={() => setOpenComment(!openComment)} />
      </Box>
    )
  }

  return (
    <Box sx={{ pt: '12px', display: 'flex', justifyContent: 'space-between' }}>
      <ButtonLike
        item={{ id: item.id, count_likes: item.count_likes, liked_at: item.liked_at }}
        likeableType='feed'
        isXs={isXs}
      />
      <ButtonComment replyCount={item.count_comments} onClick={() => setOpenComment(!openComment)} isXs={isXs} />
      <ButtonRepost post={item} isXs={isXs} />
      <ButtonShare feedPage={getUrl(`/feed/${item.id}`)} isXs={isXs} />
    </Box>
  )
}

export default FeedBottomActions
