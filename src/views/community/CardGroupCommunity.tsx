import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import { Stack } from '@mui/material'
import Icon from 'src/@core/components/icon'

export interface ICardGroupProps {
  id: number
  name: string
  description: string
  banner_url?: string
  members_count?: number
  discussions_count?: number
  onViewGroup?: (id: number) => void
  onJoinGroup?: (id: number) => void
}

const CardGroupCommunity: React.FC<ICardGroupProps> = ({
  id,
  description,
  name,
  banner_url = '',
  discussions_count = 0,
  members_count = 0,
  onJoinGroup = () => {},
  onViewGroup = () => {}
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 120 }}
        image={banner_url ? banner_url : '/images/banner-community.png'}
        title='green iguana'
      />
      <CardContent sx={{ padding: '12px !important' }}>
        <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#2D3436', mb: '16px' }}>{name}</Typography>
        <Stack direction='row' spacing={3} sx={{ mb: 2, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Icon icon={'ph:user-thin'} fontSize={'12px'} />
            <Typography sx={{ fontSize: '11px', fontWeight: 400 }} color='text.secondary'>
              {members_count} members
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Icon icon={'heroicons-solid:chat'} fontSize={'12px'} />
            <Typography sx={{ fontSize: '11px', fontWeight: 400 }} color='text.secondary'>
              {discussions_count} discussions
            </Typography>
          </Box>
        </Stack>
        <Typography variant='body2' sx={{ color: '#525252' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: '12px !important' }}>
        <Button
          size='small'
          variant='outlined'
          sx={{ fontSize: '14px', textTransform: 'capitalize' }}
          onClick={() => onViewGroup(id)}
        >
          View group
        </Button>
        <Button
          size='small'
          variant='contained'
          sx={{ fontSize: '14px', textTransform: 'capitalize' }}
          onClick={() => onJoinGroup(id)}
        >
          Join group
        </Button>
      </CardActions>
    </Card>
  )
}

export default CardGroupCommunity
