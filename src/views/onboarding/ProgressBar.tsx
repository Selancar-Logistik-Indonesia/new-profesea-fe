import { Box, Grid, Typography } from '@mui/material'

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  return (
    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '5px', flexGrow: 1 }}>
        {Array.from({ length: total }, (_, index) => (
          <Box
            key={index}
            sx={{
              borderRadius: '8px',
              width: `calc(100% / ${total})`,
              height: '4px',
              backgroundColor: index < current ? '#0B58A6' : '#DBDBDB'
            }}
          />
        ))}
      </Box>
      <Typography sx={{ color: '#999999', fontSize: 14, fontWeight: 400 }}>
        {current}/{total}
      </Typography>
    </Grid>
  )
}

export default ProgressBar
