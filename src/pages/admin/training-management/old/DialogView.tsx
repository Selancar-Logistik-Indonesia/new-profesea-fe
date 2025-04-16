import { Ref, useState, forwardRef, ReactElement } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import Icon from 'src/@core/components/icon'
import Training from 'src/contract/models/training'
import { DateType } from 'src/contract/models/DatepickerTypes'
import DatePicker from 'react-datepicker'

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type ViewProps = {
  selectedItem: Training
  visible: boolean
  onCloseClick: VoidFunction
  onStateChange: VoidFunction
}

const DialogView = (props: ViewProps) => {
  const [date, setDate] = useState<DateType>(new Date(props.selectedItem.schedule))

  return (
    <Dialog
      fullWidth
      open={props.visible}
      maxWidth='sm'
      scroll='body'
      onClose={props.onCloseClick}
      TransitionComponent={Transition}
    >
      <form noValidate>
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={props.onCloseClick}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant='body2' color={'#32487A'} fontWeight='600' fontSize={18}>
              Detail {props.selectedItem.title}
            </Typography>
          </Box>
          <Grid container columnSpacing={'1'} rowSpacing={'2'}>
            <Grid item md={6} xs={12}>
              <TextField defaultValue={props.selectedItem.trainer.name} fullWidth disabled />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField defaultValue={props.selectedItem.category?.category} fullWidth disabled />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField defaultValue={props.selectedItem.title} fullWidth disabled />
            </Grid>
            <Grid item md={12} xs={12}>
              <DatePickerWrapper>
                <DatePicker
                  disabled
                  dateFormat='dd/MM/yyyy hh:mm aa'
                  selected={date}
                  id='basic-input'
                  onChange={(date: Date) => setDate(date)}
                  placeholderText='Click to select a date'
                  customInput={<TextField fullWidth />}
                />
              </DatePickerWrapper>
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                defaultValue={props.selectedItem.short_description}
                variant='outlined'
                multiline
                maxRows={4}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Box
                sx={{
                  p: 2,
                  border: '1px dashed ',
                  borderRadius: '10px',
                  borderColor: 'grey.400',
                  '&:hover': { borderColor: 'grey.500' }
                }}
              >
                <img alt='thumbnail' className='single-file-image' src={props.selectedItem.thumbnail} width={450} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default DialogView
