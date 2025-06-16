import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { HttpClient } from 'src/services'
import { Box, Typography, Paper, List, ListItem, ListItemText, CircularProgress, Stack } from '@mui/material'
import moment from 'moment'

interface VATransaction {
  trx_id: string
  status: string
  amount: number
  payment_method: string
  expiration_date: string
  va: {
    bank_code: string
    account_number: string
    expires_at: string
  }
}

const PaymentDetailPage = () => {
  const router = useRouter()
  const { trxId } = router.query

  const [data, setData] = useState<VATransaction | null>(null)
  const [timeParts, setTimeParts] = useState<{ h: string; m: string; s: string }>({ h: '00', m: '00', s: '00' })

  useEffect(() => {
    if (trxId) {
      HttpClient.get(`/transaction/v2/${trxId}`).then(res => {
        setData(res.data.transaction)
      })
    }
  }, [trxId])

  useEffect(() => {
    if (!data?.expiration_date) return

    const interval = setInterval(() => {
      const now = moment()
      const expiry = moment.utc(data.expiration_date).local()
      const diff = expiry.diff(now)

      if (diff <= 0) {
        clearInterval(interval)
        setTimeParts({ h: '00', m: '00', s: '00' })
      } else {
        const dur = moment.duration(diff)
        setTimeParts({
          h: String(dur.hours()).padStart(2, '0'),
          m: String(dur.minutes()).padStart(2, '0'),
          s: String(dur.seconds()).padStart(2, '0')
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [data])

  if (!data) {
    return (
      <Box display='flex' justifyContent='center' mt={10}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box p={3}>
      <Typography variant='h6' fontWeight={600} gutterBottom>
        Waiting for Payment
      </Typography>
      <Typography variant='body2' color='textSecondary' gutterBottom>
        Status: <strong>{data.status}</strong>
      </Typography>
      <Typography variant='body1' gutterBottom>
        Finish the payment before:
      </Typography>
      <Stack direction='row' spacing={2} mb={2}>
        {[timeParts.h, timeParts.m, timeParts.s].map((val, i) => (
          <Box
            key={i}
            sx={{
              px: 2,
              py: 1,
              bgcolor: '#1c1c1e',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: 1,
              fontSize: '1.25rem',
              minWidth: 48,
              textAlign: 'center'
            }}
          >
            {val}
          </Box>
        ))}
      </Stack>
      <Typography variant='body1' gutterBottom>
        Total Amount
      </Typography>
      <Typography variant='h5' fontWeight={700} color='primary' gutterBottom>
        IDR {data.amount.toLocaleString('id-ID')}
      </Typography>
      <Paper elevation={3} sx={{ p: '8px 12px', mb: 3 }}>
        <Typography variant='subtitle1' gutterBottom>
          Bank <strong>{data.va.bank_code}</strong>
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          VA Number: <strong>{data.va.account_number}</strong>
        </Typography>
      </Paper>
      <List>
        <Typography variant='h6' gutterBottom>
          How to Pay
        </Typography>
        <ListItem>
          <ListItemText primary='1. Open your mobile banking app' />
        </ListItem>
        <ListItem>
          <ListItemText primary='2. Select Virtual Account menu' />
        </ListItem>
        <ListItem>
          <ListItemText primary={`3. Choose bank ${data.va.bank_code}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`4. Enter the VA number: ${data.va.account_number}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary='5. Confirm the payment' />
        </ListItem>
      </List>
    </Box>
  )
}

PaymentDetailPage.acl = {
  action: 'read',
  subject: 'home'
}

export default PaymentDetailPage
