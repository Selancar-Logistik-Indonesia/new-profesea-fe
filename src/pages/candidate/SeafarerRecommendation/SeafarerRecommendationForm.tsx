import { forwardRef, ReactElement, Ref, useState } from 'react'
import {
  Button,
  Box,
  Grid,
  Typography,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  useMediaQuery,
  InputLabel,
  FadeProps,
  Fade,
  SwipeableDrawer
} from '@mui/material'
import { Icon } from '@iconify/react'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ISeafarerRecommendationForm } from 'src/contract/types/seafarer_recommendation_type'
import { useTheme } from '@mui/material/styles'

const ProficiencySchema = Yup.object().shape({
  company: Yup.string().required('Company is required'),
  email: Yup.string().email().required('Email is required')
})

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const SeafarerProficiencyForm = (props: ISeafarerRecommendationForm) => {
  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const { user_id, handleModalForm, showModal, type, loadRecommendation, seafarerRecommendation } = props
  const [loading, setLoading] = useState(false)
  const id = seafarerRecommendation?.id

  const formik = useFormik({
    initialValues: {
      user_id: user_id,
      company: type == 'edit' ? seafarerRecommendation?.company : '',
      email: type == 'edit' ? seafarerRecommendation?.email : '',
      position: type == 'edit' ? seafarerRecommendation?.position : '',
      phone_number: type == 'edit' ? seafarerRecommendation?.phone_number : ''
    },
    enableReinitialize: true,
    validationSchema: ProficiencySchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values)
      resetForm()
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
        handleModalForm(type, undefined)
        setLoading(false)
        loadRecommendation()
      })
      .catch(err => {
        toast.error(JSON.stringify(err.message))
        setLoading(false)
      })
  }

  const updateRecommendation = (id: number | undefined, values: any) => {
    setLoading(true)
    HttpClient.patch(AppConfig.baseUrl + '/seafarer-recommendations/' + id, {
      user_id: values.user_id,
      company: values.company,
      email: values.email,
      position: values.position,
      phone_number: values.phone_number
    })
      .then(() => {
        toast.success('update recommendation success')
        handleModalForm(type, undefined)
        setLoading(false)
        loadRecommendation()
      })
      .catch(err => {
        toast.error(JSON.stringify(err.message))
        setLoading(false)
      })
  }

  const handleSubmit = (values: any) => {
    if (type == 'edit') {
      updateRecommendation(id, values)
    } else {
      createRecommendation(values)
    }
  }

  const renderForm = () => {
    return (
      <form
        onSubmit={formik.handleSubmit}
        onReset={() => {
          formik.resetForm()
        }}
        method='post'
      >
        <DialogContent>
          {!isMobile && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography color={'#32487A'} fontWeight='700' fontSize={18}>
                  {type == 'create' ? 'Add Reference Verification' : 'Edit Reference Verification'}
                </Typography>
              </Box>
              <IconButton
                size='small'
                onClick={() => {
                  props.handleModalForm(type, undefined)
                }}
              >
                <Icon icon='mdi:close' fontSize={'16px'} />
              </IconButton>
            </Box>
          )}
          <Grid container spacing={6} py={'24px'}>
            <Grid item xs={12} md={6}>
              <InputLabel
                required
                sx={{
                  fontFamily: 'Figtree',
                  fontSize: '12px',
                  fontWeight: 700,
                  mb: '12px',
                  '& .MuiFormLabel-asterisk': {
                    color: 'red'
                  }
                }}
              >
                Company
              </InputLabel>
              <TextField
                error={formik.errors.company ? true : false}
                fullWidth
                id='company'
                name='company'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.company}
                defaultValue={type == 'edit' ? seafarerRecommendation?.company : ''}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel
                sx={{
                  fontFamily: 'Figtree',
                  fontSize: '12px',
                  fontWeight: 700,
                  mb: '12px',
                  '& .MuiFormLabel-asterisk': {
                    color: 'red'
                  }
                }}
              >
                Name / Position
              </InputLabel>
              <TextField
                fullWidth
                id='position'
                name='position'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.position}
                defaultValue={type == 'edit' ? seafarerRecommendation?.position : ''}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel
                required
                sx={{
                  fontFamily: 'Figtree',
                  fontSize: '12px',
                  fontWeight: 700,
                  mb: '12px',
                  '& .MuiFormLabel-asterisk': {
                    color: 'red'
                  }
                }}
              >
                Email
              </InputLabel>
              <TextField
                error={formik.errors.email ? true : false}
                fullWidth
                id='email'
                name='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                defaultValue={type == 'edit' ? seafarerRecommendation?.email : ''}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel
                sx={{
                  fontFamily: 'Figtree',
                  fontSize: '12px',
                  fontWeight: 700,
                  mb: '12px',
                  '& .MuiFormLabel-asterisk': {
                    color: 'red'
                  }
                }}
              >
                Phone
              </InputLabel>
              <TextField
                fullWidth
                id='phone_number'
                name='phone_number'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone_number}
                defaultValue={type == 'edit' ? seafarerRecommendation?.phone_number : ''}
                variant='outlined'
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ textAlign: 'center' }}>
          <Button disabled={loading} type='submit' variant='contained' style={{ textTransform: 'capitalize' }}>
            <div> {type == 'edit' ? 'Save Changes' : 'Save'}</div>
          </Button>
        </DialogActions>
      </form>
    )
  }

  if (isMobile) {
    return (
      <>
        <SwipeableDrawer
          anchor='bottom'
          open={showModal}
          onClose={() => {
            props.handleModalForm(type, undefined)
          }}
          onOpen={() => {
            props.handleModalForm(type, undefined)
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ padding: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography fontSize={16} fontWeight={700} color={'#32497A'}>
                {type == 'create' ? 'Add Reference Verification' : 'Edit Reference Verification'}
              </Typography>
              <IconButton
                size='small'
                sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
                onClick={() => {
                  props.handleModalForm(type, undefined)
                }}
              >
                <Icon icon='mdi:close' />
              </IconButton>
            </Box>
            <Box sx={{ px: '16px', py: '24px', marginBottom: '60px' }}>{renderForm()}</Box>
          </Box>
        </SwipeableDrawer>
      </>
    )
  }

  return (
    <Dialog fullWidth open={showModal} maxWidth='md' scroll='body' TransitionComponent={Transition}>
      {renderForm()}
    </Dialog>
  )
}

export default SeafarerProficiencyForm
