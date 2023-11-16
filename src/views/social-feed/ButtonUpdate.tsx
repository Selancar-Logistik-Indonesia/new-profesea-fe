 
import { Button } from "@mui/material";
import { Icon } from '@iconify/react'
 
type ButtonLikeParam = {
  id: number
  liked_at?: string
  count_likes: number
}

  

const ButtonUpdate = (props: { item: ButtonLikeParam; variant?: 'no-icon'; onClick: () => void }) => {

    return (
      <Button
        sx={{ fontSize: '0.7rem', textTransform: 'none' }}
        size='small'
        color='primary'
        startIcon={<Icon icon='typcn:edit' fontSize={10} />}
        onClick={props.onClick}
      >
        Update
      </Button>
    )
}

export default ButtonUpdate;