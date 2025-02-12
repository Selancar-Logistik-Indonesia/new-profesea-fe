import { Icon } from '@iconify/react'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import Link from 'next/link'

interface StatusCardProps {
  label: string
  total: number
  backgroundColor: string
  icon: string
  iconColor: string
}

const StatusCard = (props: StatusCardProps) => {
  const { label, total, backgroundColor, icon, iconColor } = props

  return (
    <Grid item sx={{ flexBasis: '25%', p: '16px 20px' }} flexDirection='column'>
      <Box
        sx={{
          backgroundColor: backgroundColor,
          borderRadius: '4px',
          p: '6px',
          height: '28px',
          aspectRatio: 1 / 1
        }}
      >
        <Icon icon={icon} color={iconColor} fontSize={16} />
      </Box>
      <Typography sx={{ fontSize: 20, fontWeight: 700 }}>{total}</Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 400 }}>{label}</Typography>
    </Grid>
  )
}

export default StatusCard
