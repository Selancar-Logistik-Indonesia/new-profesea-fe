import { yupResolver } from '@hookform/resolvers/yup'
import { Icon } from '@iconify/react'
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Link,
  MenuItem,
  TextField,
  Typography
} from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import EditorArea from 'src/@core/components/react-draft-wysiwyg'
import Training from 'src/contract/models/training'
import TrainingCategory from 'src/contract/models/training_category'
import { FormDataTraining } from 'src/contract/types/create_training_type'
import { HttpClient } from 'src/services'
import * as yup from 'yup'
import { useDropzone } from 'react-dropzone'
import styles from '../../../styles/scss/Dropzone.module.scss'
import draftToHtml from 'draftjs-to-html'
import { IUser } from 'src/contract/models/user'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'

type schemeItemProps = {
  icon: string
  name: string
  details: string
  value: string
}

const schemeItems: schemeItemProps[] = [
  {
    icon: 'material-symbols:rocket',
    name: 'Instant Access',
    details: 'Participant can start anytime without waiting for a schedule or quota.',
    value: 'instant_access'
  },
  {
    icon: 'mdi:users',
    name: 'Quota-Based',
    details: 'Training begins once the required number of participants is met.',
    value: 'quota_based'
  },
  {
    icon: 'solar:calendar-bold',
    name: 'Fixed Date',
    details: 'Runs on a set schedule with a fixed start and end date.',
    value: 'fixed_date'
  }
]

const currency = [
  { id: 'IDR', label: 'IDR' },
  { id: 'USD', label: 'USD' }
]

const schema = yup.object().shape({
  // jobCategory: yup.number().required()
})

//Dropdown Settings
const acceptFile = {
  'image/*': ['.png', '.jpg', '.webp', '.jpeg']
}

const TrainingForm = ({
  pageView = 'trainer',
  type,
  training
}: {
  pageView?: string
  type?: 'create' | 'edit'
  training?: Training
}) => {
  const {
    control,
    setValue,
    // watch,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataTraining>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      trainingCategory: training?.category_id
    }
  })

  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  //   form items
  const [selectedScheme, setSelectedScheme] = useState<string>('')
  const [categories, setCategories] = useState<TrainingCategory[] | null>(null)
  const [trainerData, setTrainerData] = useState<IUser[] | null>()
  const [trainingDescription, setTrainingDescription] = useState(EditorState.createEmpty())
  const [trainingRequirement, setTrainingRequirement] = useState(EditorState.createEmpty())
  const [isActive, setIsActive] = useState<boolean | undefined>(true)
  const [attachment, setAttachment] = useState<any>()
  const [attachmentUrl, setAttachmentUrl] = useState<any>()

  //page setings
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile: any = e.target.files
    onDrop(selectedFile)
  }

  const populateData = () => {

    HttpClient.get('/training-category', {
      take: 10,
      page: 1
    }).then(async res => {
      const data = await res.data.trainingCategories.data
      setCategories(data)
    })

    if (type === 'edit' && training) {
      setIsActive(training.is_active)
      setValue('trainingTitle', training.title)
      setValue('trainingCategory', training.category_id)
      setValue('price', training.price)
      setValue('currency', training.currency)
      setValue('discounted', training.discounted_price)
      setValue('participants', training.participants)
      setValue('startDate', training.start_date as string)
      setValue('endDate', training.end_date as string)
      setAttachmentUrl(training.thumbnail)
      setSelectedScheme(training.booking_scheme)
      if (pageView === 'admin') {
        setValue('trainerId', training.user_id)
      }
      if (training.short_description) {
        const contentBlock = convertFromHTML(training.short_description).contentBlocks
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock)
          const editorState = EditorState.createWithContent(contentState)
          setTrainingDescription(editorState)
        }
      }
      if (training.requirements) {
        const contentBlock = convertFromHTML(training.requirements).contentBlocks
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock)
          const editorState = EditorState.createWithContent(contentState)
          setTrainingRequirement(editorState)
        }
      }
    }
  }

  const firstLoad = () => {
    HttpClient.get('/training/trainer', { page: 1, take: 1000 }).then(
      async response => {
        const trainers = await response.data.training.data
        setTrainerData(trainers)
      },
      error => {
        toast.error('Failed to get trainer data: ' + error.response.data.message)
      }
    )

    HttpClient.get('/training-category', {
      take: 10,
      page: 1
    }).then(async res => {
      const data = await res.data.trainingCategories.data
      setCategories(data)
    })
  }

  const loadAndPopulate = async () => {
    await firstLoad()
    
    populateData()
  }

  useEffect(() => {
    loadAndPopulate()
  }, [training])

  const onSubmit = (data: FormDataTraining) => {
    const {
      trainingTitle,
      trainingCategory,
      price,
      currency,
      discounted,
      startDate,
      endDate,
      participants,
      trainerId
    } = data

    const description = trainingDescription.getCurrentContent()
    const requirement = trainingRequirement.getCurrentContent()

    const date_start = startDate
      ? new Date(startDate)
          ?.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
          .split('/')
          .reverse()
          .join('-')
      : undefined

    const date_end = endDate
      ? new Date(endDate)
          ?.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
          .split('/')
          .reverse()
          .join('-')
      : undefined

    const json = {
      booking_scheme: selectedScheme,
      title: trainingTitle,
      category_id: trainingCategory,
      short_description: description.hasText() ? draftToHtml(convertToRaw(description)) : '<p></p>',
      requirements: requirement.hasText() ? draftToHtml(convertToRaw(requirement)) : '<p></p>',
      price: price,
      currency: currency,
      discounted_price: discounted,
      participants: selectedScheme === 'quota_based' ? participants : 0,
      start_date: selectedScheme === 'fixed_date' ? date_start : null,
      end_date: selectedScheme === 'fixed_date' ? date_end : null,
      is_active: isActive ? '1' : '0',
      user_id: pageView === 'trainer' ? user.id : trainerId,
      schedule: '2025-09-06'
    }

    const formData = new FormData()

    Object.entries(json).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value as any)
      }
    })

    if (attachment) formData.append('thumbnail', attachment)

    setLoading(true)

    if (type === 'edit' && training) {
      HttpClient.post(`/training/${training.id}`, formData)
        .then(
          () => {
            toast.success(`${training.title} edited successfully!`)
            if (pageView === 'trainer') router.push('/trainer/training-management')
            else router.push('/admin/training-management')
          },
          error => {
            toast.error('Failed to save training: ' + error.response?.data?.message)
            console.log(error)
          }
        )
        .finally(() => setLoading(false))
    } else {
      HttpClient.post('/training', formData)
        .then(
          () => {
            toast.success(`${trainingTitle} submited successfully!`)
            if (pageView === 'trainer') router.push('/trainer/training-management')
            else router.push('/admin/training-management')
          },
          error => {
            toast.error('Failed to save training: ' + error?.response?.data?.message)
            console.log(error)
          }
        )
        .finally(() => setLoading(false))
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // setIsError(false)

      // if (acceptedFiles.length > 1) {
      //   setIsError(true)
      //   setErrorType('fileCountExceedsLimit')
      //   setIsErrorModalOpen(true)

      //   return
      // }

      // const maxSize = 3 * 1024 * 1024
      // if (acceptedFiles[0].size > maxSize) {
      //   setIsError(true)
      //   setErrorType('fileSizeExceedsLimit')
      //   setIsErrorModalOpen(true)

      //   return
      // }

      // if (acceptedFiles[0].type !== 'application/pdf' && acceptedFiles[0].type !== 'image/png') {
      //   setIsError(true)
      //   setErrorType('fileFormatError')
      //   setIsErrorModalOpen(true)

      //   return
      // }
      const fileUrl = URL.createObjectURL(acceptedFiles[0])
      setAttachment(acceptedFiles[0])
      setAttachmentUrl(fileUrl)
      // setIsErrorModalOpen(false)
    },
    [attachment]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      ...acceptFile
    }
  })

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          padding: '48px 0px',
          borderRadius: '12px',
          mt: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 8
        }}
      >
        {/* training scheme */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#32497A' }}>
            Choose Training Booking Scheme
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', aligItems: 'center', gap: 6, padding: '0px 1.9rem' }}>
            {schemeItems.map((item, i) => {
              return (
                <SchemaCard key={i} item={item} selectedScheme={selectedScheme} setSelectedScheme={setSelectedScheme} />
              )
            })}
          </Box>
        </Box>
        {/* training details */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '0px 1.9rem' }}>
          {pageView === 'admin' && (
            <Box>
              <FormControl fullWidth error={!!errors.trainerId}>
                <Typography sx={{ mb: '8px', color: '#1F1F1F', fontSize: 16, fontWeight: 700 }}>
                  Company Name
                </Typography>
                <Controller
                  name='trainerId'
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      autoHighlight
                      options={trainerData || []}
                      getOptionLabel={option => option.name || ''}
                      value={trainerData?.find(data => data.id == field.value) || null}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={field => (
                        <TextField
                          {...field}
                          size='small'
                          placeholder={'Company Name'}
                          error={!!errors.trainerId}
                          helperText={errors.trainerId?.message}
                        />
                      )}
                      renderOption={(props, option) => (
                        <MenuItem {...props} key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      )}
                      noOptionsText='Hasil pencaian tidak ditemukan. Coba gunakan kata kunci lain atau periksa kembali pencarian Anda'
                    />
                  )}
                />
              </FormControl>
            </Box>
          )}
          <Grid container spacing={4}>
            <Grid item xs={selectedScheme === 'quota_based' ? 10 : 12}>
              <FormControl fullWidth error={!!errors.trainingTitle}>
                <Typography sx={{ mb: '8px', color: '#1F1F1F', fontSize: 16, fontWeight: 700 }}>Title</Typography>
                <Controller
                  name='trainingTitle'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size='small'
                      placeholder='Input your training title'
                      error={!!errors.trainingTitle}
                      helperText={errors.trainingTitle?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            {selectedScheme === 'quota_based' && (
              <Grid item xs={2}>
                <FormControl fullWidth error={!!errors.participants}>
                  <Typography sx={{ mb: '10px', color: '#1F1F1F', fontSize: 14, fontWeight: 700 }}>
                    Number of participants
                  </Typography>
                  <Controller
                    name='participants'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type='number'
                        inputProps={{ min: 0 }}
                        value={field.value || ''}
                        fullWidth
                        size='small'
                        placeholder='0'
                        error={!!errors.participants}
                        helperText={errors.participants?.message}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            )}
          </Grid>
          <Box>
            <FormControl fullWidth error={!!errors.trainingCategory}>
              <Typography sx={{ mb: '8px', color: '#1F1F1F', fontSize: 16, fontWeight: 700 }}>
                Training Category
              </Typography>
              <Controller
                name='trainingCategory'
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    autoHighlight
                    options={categories || []}
                    getOptionLabel={option => option.category || ''}
                    value={categories?.find(data => field.value === data.id) || null}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={field => (
                      <TextField
                        {...field}
                        size='small'
                        placeholder= {'Training Category'}
                        error={!!errors.trainingCategory}
                        helperText={errors.trainingCategory?.message}
                      />
                    )}
                    renderOption={(props, option) => (
                      <MenuItem {...props} key={option.id} value={option.id}>
                        {option.category}
                      </MenuItem>
                    )}
                    noOptionsText='Hasil pencaian tidak ditemukan. Coba gunakan kata kunci lain atau periksa kembali pencarian Anda'
                  />
                )}
              />
            </FormControl>
          </Box>
          {selectedScheme === 'fixed_date' && (
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <FormControl fullWidth error={!!errors.startDate}>
                  <Typography sx={{ mb: '8px', color: '#1F1F1F', fontSize: 16, fontWeight: 700 }}>
                    Start Date
                  </Typography>
                  <Controller
                    name='startDate'
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          {...field}
                          format='DD/MM/YYYY'
                          openTo='year'
                          views={['year', 'month', 'day']}
                          minDate={moment(new Date())}
                          value={field.value ? moment(field.value) : null}
                          slotProps={{
                            textField: {
                              size: 'small',
                              error: !!errors.startDate,
                              helperText: errors.startDate?.message
                            }
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth error={!!errors.endDate}>
                  <Typography sx={{ mb: '8px', color: '#1F1F1F', fontSize: 16, fontWeight: 700 }}>End Date</Typography>
                  <Controller
                    name='endDate'
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          {...field}
                          format='DD/MM/YYYY'
                          openTo='year'
                          views={['year', 'month', 'day']}
                          minDate={moment(new Date())}
                          value={field.value ? moment(field.value) : null}
                          slotProps={{
                            textField: {
                              size: 'small',
                              error: !!errors.endDate,
                              helperText: errors.endDate?.message
                            }
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Typography sx={{ color: '#1F1F1F', fontSize: 16, fontWeight: 700 }}>Description</Typography>
            <EditorWrapper>
              <EditorArea
                editorState={trainingDescription}
                onEditorStateChange={data => setTrainingDescription(data)}
                toolbar={{
                  options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true }
                }}
                placeholder='Provide a brief overview of what participants will learn.'
              />
            </EditorWrapper>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Typography sx={{ color: '#1F1F1F', fontSize: 16, fontWeight: 700 }}>Requirements</Typography>
            <EditorWrapper>
              <EditorArea
                editorState={trainingRequirement}
                onEditorStateChange={data => setTrainingRequirement(data)}
                toolbar={{
                  options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true }
                }}
                placeholder='List any prerequisites or qualifications needed to join.'
              />
            </EditorWrapper>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={2}>
              <FormControl fullWidth error={!!errors.currency}>
                <Typography sx={{ mb: '8px', color: '#1F1F1F', fontSize: 16, fontWeight: 700 }}>Currency</Typography>
                <Controller
                  name='currency'
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      autoHighlight
                      options={currency || []}
                      getOptionLabel={option => option.label || ''}
                      value={currency?.find(data => data.id === field.value) || null}
                      onChange={(_, newValue) => {
                        field.onChange(newValue?.id || '')
                      }}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={field => (
                        <TextField
                          {...field}
                          size='small'
                          placeholder='Currency'
                          error={!!errors.currency}
                          helperText={errors.currency?.message}
                        />
                      )}
                      renderOption={(props, option) => (
                        <MenuItem {...props} key={option.id} value={option.id}>
                          {option.label}
                        </MenuItem>
                      )}
                      noOptionsText='Hasil pencaian tidak ditemukan. Coba gunakan kata kunci lain atau periksa kembali pencarian Anda'
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <FormControl fullWidth error={!!errors.price}>
                <Typography sx={{ mb: '8px', color: '#1F1F1F', fontSize: 16, fontWeight: 700 }}>Price</Typography>
                <Controller
                  name='price'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      value={field.value || ''}
                      size='small'
                      placeholder='Set the standard price for enrollment.'
                      type='number'
                      inputProps={{ min: 0 }}
                      error={!!errors.price}
                      helperText={errors.price?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={5} sx={{ mb: 5 }}>
              <FormControl fullWidth error={!!errors.price}>
                <Typography sx={{ mb: '8px', color: '#1F1F1F', fontSize: 16, fontWeight: 700 }}>Discounted</Typography>
                <Controller
                  name='discounted'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      value={field.value || ''}
                      size='small'
                      placeholder='Offer a special price or promotional discount (optional).'
                      type='number'
                      inputProps={{ min: 0 }}
                      error={!!errors.discounted}
                      helperText={errors.discounted?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
          {attachment || attachmentUrl ? (
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center' }}>
              <Box component='img' src={attachmentUrl} sx={{ width: '110px', height: '110px', objectFit: 'contain' }} />
              <input
                type='file'
                ref={inputRef}
                style={{ display: 'none' }}
                onChange={e => handleChange(e)}
                accept='.jpg, .jpeg, .png'
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#1F1F1F' }}>Thumbnail</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#525252' }}>Recomended 500 x 500</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                  <Button onClick={() => inputRef?.current?.click()} variant='outlined' sx={{ textTransform: 'none' }}>
                    Change Thumbnail
                  </Button>
                  <Button
                    onClick={() => {
                      setAttachment(null)
                      setAttachmentUrl('')
                    }}
                    color='error'
                    sx={{ textTransform: 'none' }}
                  >
                    Remove Thumbnail
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <div {...getRootProps({ className: styles['dropzone-wrapper'] })}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p style={{ textAlign: 'center' }}>Drop the file here ...</p>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Icon icon='uil:image-upload' fontSize={44} color={'#32497A'} />
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#32497A' }}>Click to upload or drag and drop</p>
                  <p style={{ fontSize: 14, fontWeight: 400, color: '#999999' }}>
                    Allowed JPEG, JPG, PNG Size up to 3MB
                  </p>
                </div>
              )}
            </div>
          )}
          <Box
            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mt: 5 }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography sx={{ color: '#1F1F1F', fontSize: 16, fontWeight: 700 }}>Activate Training</Typography>
              <Typography sx={{ color: '#1F1F1F', fontSize: 14, fontWeight: 400 }}>
                Activate this training program to make it available for immediate enrollment.
              </Typography>
            </Box>
            <Box
              onClick={() => setIsActive(!isActive)}
              sx={{
                position: 'relative',
                width: '84px',
                height: '22px',
                display: 'flex',
                alignItems: 'center',
                pl: isActive ? '16px' : '22px',
                backgroundColor: isActive ? '#4CAF50' : '#868686',
                borderRadius: '100px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, padding 0.5s ease'
              }}
            >
              <Typography
                sx={{
                  color: '#FFF',
                  userSelect: 'none',
                  fontSize: 14,
                  fontWeight: '400'
                }}
              >
                {isActive ? 'Active' : 'Inactive'}
              </Typography>
              <Box
                sx={{
                  position: 'absolute',
                  backgroundColor: '#FFF',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  top: '4px',
                  left: isActive ? 'calc(100% - 18px)' : '4px',
                  transition: 'left 0.5s ease-in-out'
                }}
              />
            </Box>
          </Box>
          <Grid
            item
            container
            sx={{ display: 'flex', gap: '24px', alignItems: 'center', justifyContent: 'right', mt: 5 }}
          >
            <Typography
              component={Link}
              href={pageView === 'trainer' ? '/trainer/training-management' : '/admin/training-management'}
              sx={{ color: '#868686', fontSize: 14 }}
            >
              Cancel
            </Typography>

            <Button
              type='submit'
              onClick={async () => {
                //   await setIsDraft(false)
                handleSubmit(onSubmit)
              }}
              variant='contained'
              size='small'
              disabled={loading}
              sx={{ fontSize: 14, fontWeight: 400, textTransform: 'none' }}
            >
              {loading ? <CircularProgress size={22} /> : 'Save Training'}
            </Button>
          </Grid>
        </Box>
      </Box>
    </form>
  )
}

const SchemaCard = ({
  item,
  selectedScheme,
  setSelectedScheme
}: {
  item: schemeItemProps
  selectedScheme: string
  setSelectedScheme: any
}) => {
  return (
    <Box
      onClick={() => setSelectedScheme(item.value)}
      sx={{
        transition: '.6s ease',
        cursor: 'pointer',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 2,
        borderRadius: '6px',
        padding: '.95rem 1.45rem',
        ...(selectedScheme === item.value
          ? { backgroundColor: '#F2F8FE', border: '1px solid #0B58A6' }
          : { border: '1px solid #868686' })
      }}
    >
      <Icon icon={item.icon} color={selectedScheme === item.value ? '#0B58A6' : '#868686'} fontSize={32} />
      <Typography sx={{ fontSize: 16, fontWeight: 700, color: selectedScheme === item.value ? '#0B58A6' : '#868686' }}>
        {item.name}
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 400,
          color: selectedScheme === item.value ? '#0B58A6' : '#868686',
          textAlign: 'center'
        }}
      >
        {item.details}
      </Typography>
    </Box>
  )
}

export default TrainingForm
