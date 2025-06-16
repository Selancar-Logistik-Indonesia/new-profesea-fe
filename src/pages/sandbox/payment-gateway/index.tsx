import { Box, FormControl, Grid, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { PaymentGroup, PaymentItem } from 'src/contract/models/bank'
import { HttpClient } from 'src/services'
import PaymentMethodCard from 'src/views/payment/PaymentMethodCard'

const PaymentGatewaySandbox = () => {
  const [totalPayment, setTotalPayment] = useState<number>(0)
  const [paymentMethod, getPaymentMethod] = useState<PaymentGroup[]>([])
  const router = useRouter()

  const getPaymentList = async () => {
    await HttpClient.get('/transaction/v2/payment-method').then(response => {
      const data = response.data.methods
      getPaymentMethod(data)
    })
  }

  useEffect(() => {
    getPaymentList()
  }, [])

  const handleSelectMethod = async (item: PaymentItem) => {
    if (item.type === 'VA') {
      const confirmed = window.confirm(`You selected ${item.label}. Do you want to continue?`)

      if (!confirmed) return

      HttpClient.post('/transaction/v2/create', {
        payment_type: item.type,
        bank_code: item.code,
        purchase_item: 'test',
        purchase_type: 'training',
        user_type: 'candidate',
        amount: totalPayment,
        qty: 1
      }).then(
        response => {
          const trxId = response.data.transaction.trx_id
          router.push(`payment-gateway/${item.type}/${trxId}`)
        },
        error => {
          toast.error('Payment failed: ' + error.response.data.message)
        }
      )
    }
  }

  return (
    <Stack spacing={6}>
      <Grid
        item
        container
        sx={{
          backgroundColor: '#FFF',
          borderRadius: '12px',
          border: '1px solid #F0F0F0',
          p: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography sx={{ fontSize: 20, fontWeight: 700 }}>Total Payment</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 400 }}>
            Add price for <b>sandbox</b> payment.
          </Typography>
        </Box>
        <FormControl fullWidth>
          <Typography>Price</Typography>
          <OutlinedInput
            id='total-payment'
            startAdornment={<InputAdornment position='start'>Rp.</InputAdornment>}
            type='number'
            value={totalPayment}
            onChange={e => setTotalPayment(Number(e.target.value))}
          />
        </FormControl>
      </Grid>
      <Grid
        item
        container
        sx={{
          backgroundColor: '#FFF',
          borderRadius: '12px',
          border: '1px solid #F0F0F0',
          p: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography sx={{ fontSize: 20, fontWeight: 700 }}>Select Method Payment</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 400 }}>
            Select your <b>payment</b> method, Total Payment: <b>Rp. {totalPayment}</b>
          </Typography>
        </Box>
        <PaymentMethodCard methods={paymentMethod} onSelect={code => handleSelectMethod(code)} />
      </Grid>
    </Stack>
  )
}

PaymentGatewaySandbox.acl = {
  action: 'read',
  subject: 'home'
}

export default PaymentGatewaySandbox
