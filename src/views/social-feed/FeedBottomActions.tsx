import { Box } from "@mui/material"
import ButtonComment from "./ButtonComment"
import ButtonLike from "./ButtonLike"
import ISocialFeed from "src/contract/models/social_feed"
import ButtonRepost from "./ButtonRepost"
import ButtonShare from "./ButtonShare"
import { getUrl } from "src/utils/helpers"
import { IUser } from "src/contract/models/user"
import secureLocalStorage from "react-secure-storage"
import localStorageKeys from "src/configs/localstorage_keys"
import ButtonDelete from "./ButtonDelete"
import ButtonUpdate from "./ButtonUpdate"

type Props = {
  item: ISocialFeed
  openComment: boolean
  openUpdate: boolean
  user?: IUser
  setOpenComment: (i: boolean) => void
  setOpenUpdate: (i: boolean) => void
}

const FeedBottomActions = (props: Props) => {
    const { item, openComment, setOpenComment, openUpdate, setOpenUpdate } = props
    const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

    return (
      <Box sx={{ mt: 4 }}>
        {user.id.toString() == item.user_id.toString() && (
          <>
            <ButtonDelete item={{ id: item.id, count_likes: item.count_likes, liked_at: item.liked_at }} />
            <ButtonUpdate
              item={{ id: item.id, count_likes: item.count_likes, liked_at: item.liked_at }}
              onClick={() => setOpenUpdate(!openUpdate)}
            />
          </>
        )}
        <ButtonRepost post={item} />
        <ButtonShare feedPage={getUrl(`/feed/${item.id}`)} />
        <ButtonLike
          item={{ id: item.id, count_likes: item.count_likes, liked_at: item.liked_at }}
          likeableType='feed'
        />
        <ButtonComment replyCount={item.count_comments} onClick={() => setOpenComment(!openComment)} />
      </Box>
    )
}

export default FeedBottomActions;