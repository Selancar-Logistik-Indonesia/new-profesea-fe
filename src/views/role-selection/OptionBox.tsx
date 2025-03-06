import { Icon } from '@iconify/react'
import { Box, Typography } from '@mui/material'

const OptionBox = ({
  icon,
  value,
  description,
  active
}: {
  icon: string
  value: string
  description: string
  active: boolean
}) => {
  return (
    <>
      <Box
        sx={{
          border: active ? '1px solid #0B58A6' : '1px solid #DBDBDB',
          backgroundColor: active ? '#F2F8FE' : null,
          borderRadius: '8px',
          p: '16px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          '&:hover': {
            border: active ? null : '1px solid #252525',
            backgroundColor: active ? null : '#F0F0F0'
          }
        }}
      >
        <Icon icon={icon} color={active ? '#0B58A6' : '#868686'} fontSize={22} />
        <Typography
          sx={{ color: active ? '#0B58A6' : '#666', fontSize: 16, fontWeight: 700, textTransform: 'capitalize' }}
        >
          {value}
        </Typography>
      </Box>
      {active && (
        <Typography sx={{ mt: '8px', color: '#999999', fontSize: 14, fontWeight: 400, fontStyle: 'italic' }}>
          {description}
        </Typography>
      )}
    </>
  )
}

export default OptionBox
