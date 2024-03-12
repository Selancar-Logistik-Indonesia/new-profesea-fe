import { Icon } from '@iconify/react'
import { Box, Card, CardHeader, IconButton, Typography } from '@mui/material'
import React, { SetStateAction } from 'react'

interface IAdvancedFilterProps {
  collapsedAdvanced: boolean
  setCollapsedAdvanced: (value: SetStateAction<boolean>) => void
}

const AdvancedFilter: React.FC<IAdvancedFilterProps> = ({ collapsedAdvanced, setCollapsedAdvanced }) => {
  return (
    <Box mb={3}>
      <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFFF' }}>
        <CardHeader
          title={
            <Typography variant='body2' style={{ fontSize: '14px', color: '#262525' }}>
              Basic Filter
            </Typography>
          }
          action={
            <IconButton
              size='small'
              aria-label='collapse'
              sx={{ color: '#262525' }}
              onClick={() => setCollapsedAdvanced(!collapsedAdvanced)}
            >
              <Icon fontSize={20} icon={!collapsedAdvanced ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
            </IconButton>
          }
        />
      </Card>
    </Box>
  )
}

export default AdvancedFilter
