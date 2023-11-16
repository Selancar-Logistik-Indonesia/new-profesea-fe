 
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
 
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

    const handleClick = async() => {
        setOnLoading(true);
        await deleteFeed(item.id )
        window.location.reload() 
    }

    return (
      <Button
        disabled={onLoading}
        sx={{
          fontSize: props.variant == 'no-icon' ? 11 : '0.7rem',
          // fontWeight: likedAt ? 'bold' : 'normal',
          textTransform: 'none'
        }}
        onClick={handleClick}
        size='small'
        color='primary'
        startIcon={<Icon icon='fluent:delete-48-filled' fontSize={10} />}
        variant={props.variant == 'no-icon' ? 'text' : undefined}
      >
        Delete
      </Button>
    )
}

export default ButtonDelete;