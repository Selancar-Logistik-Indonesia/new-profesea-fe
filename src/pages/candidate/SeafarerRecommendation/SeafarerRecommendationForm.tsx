import { useState } from 'react'
import {
  Button,
  Box,
  Grid,
  DialogTitle,
  Typography,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material'
import { Icon } from '@iconify/react'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const ProficiencySchema = Yup.object().shape({
  company: Yup.string().required(),
  email: Yup.string().email().required()
})

const SeafarerProficiencyForm = (props: any) => {
  const { user_id } = props

  const [modalFormOpen, setModalFormOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      user_id: user_id,
      company: '',
      email: '',
      position: '',
      phone_number: ''
    },
    enableReinitialize: true,
    validationSchema: ProficiencySchema,
    onSubmit: values => {
      createRecommendation(values)
    }
  })

  const createRecommendation = (values: any) => {
    setLoading(true)
    HttpClient.post(AppConfig.baseUrl + '/seafarer-recommendations/', {
      user_id: values.user_id,
      company: values.company,
      email: values.email,
      position: values.position,
      phone_number: values.phone_number
    })
      .then(() => {
        toast.success('create recommendation success')
        setModalFormOpen(false)
        setLoading(false)
      })
      .catch(err => {
        toast.error(JSON.stringify(err.message))
        setLoading(false)
      })
  }

  return (
    <Grid item container md={12}>
      <Grid container item xs={12} md={12} justifyContent={'left'}>
        <Grid item md={6}>
          <Typography variant='body2' sx={{ color: '#32487A', fontSize: '18px', fontWeight: '600' }}>
            Recommendation
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Grid container md={12} justifyContent={'right'}>
            <Button
              variant='contained'
              style={{ marginBottom: 10 }}
              size='small'
              onClick={() => setModalFormOpen(true)}
            >
              <Icon
                fontSize='small'
                icon={'solar:add-circle-bold-duotone'}
                color={'success'}
                style={{ fontSize: '18px' }}
              />
              <div> Add Recommendation </div>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={12} md={6} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <Dialog open={modalFormOpen}>
          <form onSubmit={formik.handleSubmit} method='post'>
            <DialogTitle>
              <IconButton
                size='small'
                sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
                onClick={() => setModalFormOpen(false)}
              >
                <Icon width='24' height='24' icon='mdi:close' />
              </IconButton>
              <Box sx={{ mb: 2, textAlign: 'center' }}>
                <Typography variant='body2' color={'#32487A'} fontWeight='600' fontSize={18}>
                  Previous Company
                </Typography>
                <Typography variant='body2'>For Getting references</Typography>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container md={12} xs={12}>
                <Grid item container md={12} xs={12} style={{ marginBottom: 10 }}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      id='company'
                      name='company'
                      label='Company'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      variant='standard'
                    />
                    {formik.errors.company && (
                      <span style={{ color: 'red', textAlign: 'left' }}>{JSON.stringify(formik.errors.company)}</span>
                    )}
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      id='position'
                      name='position'
                      label='Name/Position'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      variant='standard'
                    />
                  </Grid>
                </Grid>
                <Grid item container md={12} xs={12}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      id='email'
                      name='email'
                      label='Email'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      variant='standard'
                    />
                    {formik.errors.email && (
                      <span style={{ color: 'red', textAlign: 'left' }}>{JSON.stringify(formik.errors.email)}</span>
                    )}
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      id='phone_number'
                      name='phone_number'
                      label='Phone'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      variant='standard'
                    />
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions style={{ textAlign: 'center' }}>
              <Button disabled={loading} type='submit' variant='contained' style={{ margin: '10px 0' }} size='small'>
                <Icon
                  fontSize='small'
                  icon={'solar:add-circle-bold-duotone'}
                  color={'success'}
                  style={{ fontSize: '18px' }}
                />
                <div> Save</div>
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default SeafarerProficiencyForm
