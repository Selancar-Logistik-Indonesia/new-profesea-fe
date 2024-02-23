import { Box, Card, CardContent, Typography } from '@mui/material'

export default function TableCard(props: any) {
  const { title } = props

  return (
    <Card>
      <CardContent sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
        <Box sx={{ mb: 7 }}>
          <Typography variant='body2' sx={{ mb: 4, color: '#262525', textTransform: 'uppercase', fontWeight: 600 }}>
            {title}
          </Typography>
          {props.children}
        </Box>
      </CardContent>
    </Card>
  )
}
