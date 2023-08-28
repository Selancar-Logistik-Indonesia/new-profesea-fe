// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

interface Props {
  data: any
}

const CardTotal = ({ data }: Props) => {
  // ** Vars
  const { title, src, stats } = data

  return (
    <Card sx={{ overflow: 'visible', position: 'relative' }}>
      <CardContent sx={{ pb: '0 !important' }}>
        <Grid container>
          <Grid item xs={6}>
            <Typography sx={{ mb: 1.5, fontWeight: 500, whiteSpace: 'nowrap' }} fontSize={14}>{title}</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography variant='h3' sx={{ mr: 1.5 }}>
                {stats}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <img src={src} alt={title} height={120} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardTotal
