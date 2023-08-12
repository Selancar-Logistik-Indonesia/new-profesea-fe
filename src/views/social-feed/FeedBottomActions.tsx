import { Box } from "@mui/material"
import ButtonComment from "./ButtonComment"
import ButtonLike from "./ButtonLike"
import ISocialFeed from "src/contract/models/social_feed"
import ButtonRepost from "./ButtonRepost"
import ButtonShare from "./ButtonShare"
import { getUrl } from "src/utils/helpers"

type Props = {
    item: ISocialFeed,
    openComment: boolean,
    setOpenComment: (i: boolean) => void
}

const FeedBottomActions = (props: Props) => {
    const { item, openComment, setOpenComment } = props;

    return (
        <Box sx={{ mt: 4 }}>
            <ButtonRepost post={item} />
            <ButtonShare feedPage={getUrl(`/feed/${item.id}`)} />
            <ButtonLike item={{ id: item.id, count_likes: item.count_likes, liked_at: item.liked_at }} likeableType="feed" />
            <ButtonComment replyCount={item.count_comments} onClick={() => setOpenComment(!openComment)} />
        </Box>
    )
}

export default FeedBottomActions;