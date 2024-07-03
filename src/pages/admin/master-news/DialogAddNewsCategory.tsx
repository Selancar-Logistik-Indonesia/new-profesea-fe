import React, { ReactElement, Ref, forwardRef, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  Fade,
  FadeProps,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import { Icon } from '@iconify/react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { HttpClient } from 'src/services'
import toast from 'react-hot-toast'
import { getCleanErrorMessage } from 'src/utils/helpers'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type DialogProps = {
  visible: boolean
  onCloseClick: VoidFunction
  onStateChange: VoidFunction
}

const validationSchema = yup.object().shape({
  categoryName: yup.string().required()
})

const DialogAddNewsCategory = (props: DialogProps) => {
  const [onLoading, setOnLoading] = useState(false)
  const { register, handleSubmit } = useForm<{
    categoryName: string
  }>({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async (formData: { categoryName: string }) => {
    setOnLoading(true)
    const { categoryName } = formData

    try {
      const response = await HttpClient.post('/news-category', { name: categoryName })
      if (response.status != 201) {
        throw response.data.message ?? 'Something went wrong!'
      }

      props.onCloseClick()
      toast.success('News category created!')
    } catch (error) {
      toast.error(`Opps ${getCleanErrorMessage(error)}`)
    }

    setOnLoading(false)
    props.onStateChange()
  }

  return (
    <Dialog fullWidth open={props.visible} maxWidth='md' scroll='body' TransitionComponent={Transition}>
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
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
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            onClick={props.onCloseClick}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant='body2' color={'#32487A'} fontWeight='600' fontSize={18}>
              Add News Category
            </Typography>
          </Box>

          <Grid container columnSpacing={'1'} rowSpacing={'1'}>
            <Grid item md={12} xs={12}>
              <TextField
                id='categoryName'
                label='Category Name'
                variant='outlined'
                fullWidth
                {...register('categoryName')}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' size='small' sx={{ mr: 2 }} type='submit'>
            <Icon fontSize='large' icon={'solar:diskette-bold-duotone'} color={'info'} style={{ fontSize: '18px' }} />
            {onLoading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Submit'}
          </Button>
          <Button variant='outlined' size='small' color='error' onClick={props.onCloseClick}>
            <Icon
              fontSize='large'
              icon={'material-symbols:cancel-outline'}
              color={'info'}
              style={{ fontSize: '18px' }}
            />
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DialogAddNewsCategory
