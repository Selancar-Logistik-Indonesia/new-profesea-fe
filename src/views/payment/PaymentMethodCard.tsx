import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { PaymentGroup, PaymentItem } from 'src/contract/models/bank'

interface PaymentMethodsProps {
  methods: PaymentGroup[]
  onSelect: (value: PaymentItem) => void
}

const PaymentMethodCard: React.FC<PaymentMethodsProps> = ({ methods, onSelect }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {methods.map((group, idx) => (
        <Box key={idx}>
          <Typography variant='h6' gutterBottom>
            {group.group}
          </Typography>
          <Grid container spacing={4}>
            {group.items.map((item, i) => (
              <Grid item xs={12} md={6} key={i}>
                <Box
                  onClick={() => onSelect(item)}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: '8px 12px',
                    borderRadius: 2,
                    border: '1px solid #e0e0e0',
                    backgroundColor: '#fff',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      border: '1px solid #1976d2',
                      backgroundColor: '#e3f2fd',
                      boxShadow: 2
                    }
                  }}
                >
                  <Box
                    component='img'
                    src={
                      Array.isArray(item.logo)
                        ? item.logo[0]?.image || '/images/no-image.jpg'
                        : item.logo || '/images/no-image.jpg'
                    }
                    alt={item.label}
                    sx={{ width: '48px', height: '48px', objectFit: 'contain' }}
                  />
                  <Typography variant='body2' align='left'>
                    {item.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  )
}

export default PaymentMethodCard
