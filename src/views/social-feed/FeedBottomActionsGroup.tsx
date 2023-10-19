import { Box } from "@mui/material"
import ButtonComment from "./ButtonComment"
 import ISocialFeed from "src/contract/models/social_feed"
import ButtonShare from "./ButtonShare"
import { getUrl } from "src/utils/helpers"
import ButtonLikeGroup from "./ButtonLikeGroup"

type Props = {
    item: ISocialFeed,
    openComment: boolean,
    setOpenComment: (i: boolean) => void
}

const FeedBottomActionsGroup = (props: Props) => {
    const { item, openComment, setOpenComment } = props;

    return (
        <Box sx={{ mt: 4 }}>
            {/* <ButtonRepost post={item} /> */}
            <ButtonShare feedPage={getUrl(`/feed/${item.id}`)} />
            <ButtonLikeGroup item={{ id: item.id, count_likes: item.count_likes, liked_at: item.liked_at }} likeableType="feed" />
            <ButtonComment replyCount={item.count_comments} onClick={() => setOpenComment(!openComment)} />
        </Box>
    )
}

export default FeedBottomActionsGroup;