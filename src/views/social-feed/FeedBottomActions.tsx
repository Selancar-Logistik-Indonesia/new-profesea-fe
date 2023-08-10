import { Box, Button } from "@mui/material"
import Icon from "src/@core/components/icon"
import ButtonComment from "./ButtonComment"
import ButtonLike from "./ButtonLike"
import ISocialFeed from "src/contract/models/social_feed"
import ButtonRepost from "./ButtonRepost"

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
            <Button
                sx={{ fontSize: '0.7rem', textTransform: 'none' }}
                size='small'
                color='primary'
                startIcon={<Icon icon='solar:share-linear' fontSize={10} />}
            >
                Share
            </Button>
            <ButtonLike item={{ id: item.id, count_likes: item.count_likes, liked_at: item.liked_at }} likeableType="feed" />
            <ButtonComment replyCount={item.count_comments} onClick={() => setOpenComment(!openComment)} />
        </Box>
    )
}

export default FeedBottomActions;