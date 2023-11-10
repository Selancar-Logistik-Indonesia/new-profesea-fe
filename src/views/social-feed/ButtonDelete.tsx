 
import { Button, Typography } from "@mui/material";
 
import { useState } from "react";
import { useSocialFeed } from "src/hooks/useSocialFeed";

type ButtonLikeParam = {
    id: number,
    liked_at?: string,
    count_likes: number,
}

const ButtonDelete = (props: { item: ButtonLikeParam,  variant?: 'no-icon' }) => {
    const { item } = props;
    const { deleteFeed } = useSocialFeed();
    const [onLoading, setOnLoading] = useState(false); 

    const handleClick = () => {
        setOnLoading(true);
        deleteFeed(item.id )
          .then(() => {
            
          })
          .finally(() => setOnLoading(false))
    }

    return (
        <Button disabled={onLoading} sx={{
            fontSize: props.variant == 'no-icon' ? 11 : '0.7rem',
            // fontWeight: likedAt ? 'bold' : 'normal',
            textTransform: 'none',
        }}
            onClick={handleClick} size='small' color='primary'
            // startIcon={props.variant == 'no-icon' ? undefined : <Icon icon={likedAt ? 'solar:like-bold-duotone' : 'solar:like-line-duotone'} />}
            variant={props.variant == 'no-icon' ? "text" : undefined}
        >
 
            Delete
        </Button>
    );
}

export default ButtonDelete;