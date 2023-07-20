import { Icon } from "@iconify/react";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import ISocialFeed from "src/contract/models/social_feed";
import { useSocialFeed } from "src/hooks/useSocialFeed";

const ButtonLike = (props: { item: ISocialFeed }) => {
    const { item } = props;
    const { likeUnlikeFeed } = useSocialFeed();
    const [onLoading, setOnLoading] = useState(false);

    const handleClick = () => {
        setOnLoading(true);
        likeUnlikeFeed(item.id)
            .finally(() => setOnLoading(false));
    }

    return (
        <Button disabled={onLoading} sx={{ fontWeight: item.liked_at ? 'bold' : 'normal', textTransform: 'none' }} onClick={handleClick} size='small' color='primary' startIcon={<Icon icon={item.liked_at ? 'mdi:like' : 'mdi:like-outline'} fontSize={10} />}>
            {item.count_likes > 0 && (
                <Typography sx={{ fontWeight: item.liked_at ? 'bold' : 'normal', }} ml={-1.4} mr={1.4} fontSize={12}>{item.count_likes}</Typography>
            )}
            Like
        </Button>
    );
}

export default ButtonLike;