import { Icon } from "@iconify/react";
import { Button, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { useSocialFeed } from "src/hooks/useSocialFeed";

type ButtonLikeParam = {
    id: number,
    liked_at?: string,
    count_likes: number,
}

const ButtonLike = (props: { item: ButtonLikeParam, likeableType: string, variant?: 'no-icon' }) => {
    const { item, likeableType } = props;
    const { likeUnlikeFeed } = useSocialFeed();
    const [onLoading, setOnLoading] = useState(false);
    const [likedAt, setLikedAt] = useState(item.liked_at);
    const [countLikes, setCountLikes] = useState(item.count_likes);

    const handleClick = () => {
        setOnLoading(true);
        likeUnlikeFeed(item.id, likeableType)
            .then(() => {
                setCountLikes(!likedAt ? (countLikes + 1) : (countLikes - 1));
                setLikedAt(!likedAt ? moment().toISOString() : undefined);
            })
            .finally(() => setOnLoading(false));
    }

    return (
        <Button disabled={onLoading} sx={{
            fontSize: props.variant == 'no-icon' ? 11 : '0.7rem',
            fontWeight: likedAt ? 'bold' : 'normal',
            textTransform: 'none',
        }}
            onClick={handleClick} size='small' color='primary'
            startIcon={props.variant == 'no-icon' ? undefined : <Icon icon={likedAt ? 'solar:like-bold-duotone' : 'solar:like-line-duotone'} />}
            variant={props.variant == 'no-icon' ? "text" : undefined}
        >
            {countLikes > 0 && (
                <Typography sx={{ fontSize: '0.7rem', fontWeight: likedAt ? 'bold' : 'normal', }} ml={-1.4} mr={1.4}>{countLikes}</Typography>
            )}
            Like
        </Button>
    );
}

export default ButtonLike;