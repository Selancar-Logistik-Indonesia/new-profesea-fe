import { Icon } from '@iconify/react'
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Radio,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IBank } from 'src/contract/models/bank'
import Training from 'src/contract/models/training'
import { HttpClient } from 'src/services'
import { formatIDR } from 'src/utils/helpers'

type Props = {
  openDialog: boolean
  training: Training
  onClose: () => void
}

const PaymentDialog = (props: Props) => {
  const [onLoading, setOnLoading] = useState<string[]>(['widget'])
  const [banks, setBanks] = useState<IBank[]>([])
  const [selectedBank, setSelectedBank] = useState('')
  const router = useRouter()

  const getListBanks = async () => {
    setOnLoading(['widget'])
    const response = await HttpClient.get('/transaction/virtual-account/bank')
    if (response.status != 200) {
      alert(response.data?.message ?? 'Internal server error!')

      return
    }

    setOnLoading([])
    setBanks(response.data.banks)
  }

  const checkoutHander = async () => {
    if (!selectedBank) {
      toast.error('Bank is not selected', { position: 'bottom-right' })

      return
    }

    setOnLoading(['checkout'])
    const response = await HttpClient.post('/transaction/create', {
      payment_type: 'VA',
      bank_code: selectedBank,
      trxable_ids: [props.training.id],
      trxable_type: 'training'
    })

    if (response.status != 200) {
      alert(response.data?.message ?? 'Internal server error!')

      return
    }

    setOnLoading([])
    router.push(`/transaction/detail/${response.data.transaction.trx_id}`)
  }

  useEffect(() => {
    getListBanks()
  }, [])

  return (
    <Dialog open={props.openDialog} onClose={() => props.onClose()}>
      <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography variant='h6' style={{ fontSize: '18px', fontWeight: '600', color: '#32487A' }}>
          Transaction
        </Typography>
        <IconButton onClick={() => props.onClose()}>
          <Icon icon='mdi:close' />
        </IconButton>
      </DialogActions>
      <DialogContent>
        <List>
          <Card>
            <ListItem>
              <ListItemAvatar>
                <Box component='img' src={props.training.thumbnail} width={100} />
              </ListItemAvatar>
              <ListItemText>
                <Box>
                  <Typography variant='body1' style={{ fontSize: '18px', fontWeight: '600', color: '#32487A' }}>
                    {props.training.title}
                  </Typography>
                  <Typography variant='caption'>{formatIDR(props.training.price)}</Typography>
                </Box>
              </ListItemText>
            </ListItem>

            <Box mx={10} my={5}>
              <Typography variant='caption'>Jumlah yang harus dibayar:</Typography>
              <Typography variant='body1' fontSize={24}>
                {formatIDR(props.training.price)}
              </Typography>
            </Box>
          </Card>
        </List>

        {onLoading.includes('widget') && banks.length == 0 && <CircularProgress />}

        {!onLoading.includes('widget') && banks.length > 0 && (
          <>
            <Typography
              variant='body1'
              mt={10}
              mb={3}
              style={{ fontSize: '18px', fontWeight: '600', color: '#32487A' }}
            >
              Pilih Bank
            </Typography>
            <Divider />
            <List>
              {banks.map(e => (
                <ListItem
                  key={e.code}
                  sx={{ cursor: 'pointer', backgroundColor: selectedBank == e.code ? '#bbdefb' : undefined }}
                  onClick={() => setSelectedBank(e.code)}
                >
                  <ListItemAvatar>
                    <Box
                      sx={{
                        backgroundImage: `url(${e.logo})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        height: 40,
                        width: 100
                      }}
                    />
                  </ListItemAvatar>
                  <Typography variant='body1'>{e.name}</Typography>

                  <ListItemSecondaryAction onClick={() => setSelectedBank(e.code)}>
                    <Radio checked={selectedBank == e.code} />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>

            <Button
              onClick={checkoutHander}
              disabled={onLoading.includes('checkout')}
              sx={{ width: '100%', mt: 10 }}
              variant='contained'
            >
              {onLoading.includes('checkout') ? <CircularProgress /> : 'Continue'}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default PaymentDialog
