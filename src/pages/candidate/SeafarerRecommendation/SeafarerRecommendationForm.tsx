import { Button, Box, Grid, DialogTitle, Typography, TextField, Card, CardContent } from '@mui/material'
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
    HttpClient.post(AppConfig.baseUrl + '/seafarer-recommendation/', {
      user_id: values.user_id,
      company: values.company,
      email: values.email,
      position: values.position,
      phone_number: values.phone_number
    })
      .then(() => {
        toast.success('create recommendation success')
      })
      .catch(err => {
        toast.error(JSON.stringify(err.message))
      })
  }

  return (
    <Grid md={12}>
      <Grid xs={12} md={12} justifyContent={'left'}>
        <Typography variant='body2' sx={{ color: '#32487A', fontSize: '18px', fontWeight: '600' }}>
          Recommendation
        </Typography>
      </Grid>
      <Grid container xs={12} md={6} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <Card>
          <form onSubmit={formik.handleSubmit} method='post'>
            <DialogTitle>
              <Box sx={{ mb: 2, textAlign: 'center' }}>
                <Typography variant='body2' color={'#32487A'} fontWeight='600' fontSize={18}>
                  Previous Company
                </Typography>
                <Typography variant='body2'>For Getting references</Typography>
              </Box>
            </DialogTitle>
            <CardContent>
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
            </CardContent>
            <CardContent style={{ textAlign: 'center' }}>
              <Button type='submit' variant='contained' style={{ margin: '10px 0' }} size='small'>
                <Icon
                  fontSize='small'
                  icon={'solar:add-circle-bold-duotone'}
                  color={'success'}
                  style={{ fontSize: '18px' }}
                />
                <div> Save</div>
              </Button>
            </CardContent>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SeafarerProficiencyForm
