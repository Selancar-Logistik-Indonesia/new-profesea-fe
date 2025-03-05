import { Icon } from '@iconify/react'
import { Box, Typography } from '@mui/material'

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
    <Box sx={{ width: '178px', p: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Box
        sx={{
          width: 'fit-content',
          backgroundColor: backgroundColor,
          borderRadius: '4px',
          p: '6px',
          height: '28px',
          aspectRatio: 1 / 1
        }}
      >
        <Icon icon={icon} color={iconColor} fontSize={16} />
      </Box>
      <Box flexDirection='column'>
        <Typography sx={{ fontSize: 20, fontWeight: 700 }}>{total}</Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 400 }}>{label}</Typography>
      </Box>
    </Box>
  )
}

export default StatusCard
