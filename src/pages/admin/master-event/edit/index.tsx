// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import { Button, CircularProgress, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'

// import {  useTheme } from '@mui/material/styles'
// ** Third Party Imports

// ** Component Import
import { Grid } from '@mui/material'

import EditorArea from 'src/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import "../../node_modules/draft-js-image-plugin/lib/plugin.css"

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

//import Thread from 'src/contract/models/news'
import { toast } from 'react-hot-toast'
import { getCleanErrorMessage } from 'src/utils/helpers'
import { Icon } from '@iconify/react'
import { useDropzone } from 'react-dropzone'
import Link from 'next/link'
import { DateType } from 'src/contract/models/DatepickerTypes'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

interface FileProp {
  name: string
  type: string
  size: number
}

const EditNewsScreen = () => {
  // const theme = useTheme()
  const windowUrl = window.location.search
  const params = new URLSearchParams(windowUrl)
  const [onLoading, setOnLoading] = useState(false)
  // const [sforumCode, setForumCode] = useState<any>([])
  // const [sforum, setForum] = useState<any>([])
  const [sTitle, setTitle] = useState<any>([])

  const [sdate, setDate] = useState<any>([])
  const [stime, setTime] = useState<any>([])
  const [sCost, setCost] = useState<any>([])

  const [sorganizer, setOrganizer] = useState<any>([])
  const [swebsite, setWebsite] = useState<any>([])
  const [sphone, setPhone] = useState<any>([])
  const [smeet, setMeet] = useState<any>([])
  const [semail, setEmail] = useState<any>([])
  const [svenue, setVenue] = useState<any>([])

  // const [sTitle, setTitle] = useState<any>([])
  // const [sSlug, setSlug] = useState<any>([])
  // const [sMeta, setMeta] = useState<any>([])

  const [charType, setType] = useState('0')
  //const [newsDetail, setThreadDetail] = useState<Thread>()
  const [desc, setDesc] = useState(EditorState.createEmpty())
  const [files, setFiles] = useState<File[]>([])
  const [postingDate, setPostingDate] = useState<DateType>(new Date())
  const [urlFile, getUrlFile] = useState<any>()
  // const [User, getUser] =useState<any[]>([])
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  const [show, setShow] = useState<boolean>(false)
  const img = files.map((file: FileProp) => (
    <img
      key={file.name}
      alt={file.name}
      className='single-file-image'
      src={URL.createObjectURL(file as any)}
      width={450}
    />
  ))

  const schema = yup.object().shape({
    // titlex: yup.string().min(1).required(),
    // slugx: yup.string().min(1).required()
  })
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  // const type = [{ title: 'News' }, { title: 'Event' }]
  const firstload = () => {
    setShow(false)
    HttpClient.get(AppConfig.baseUrl + '/news/id/' + params.get('id')).then(resp => {
      const news: any = resp.data.news
      const contenDesc = convertFromHTML(news?.content).contentBlocks
      const contentState = ContentState.createFromBlockArray(contenDesc)
      const editorState = EditorState.createWithContent(contentState)
      setDesc(editorState)
      setTitle(news?.title)
      setType(news?.title?.length)

      setDate(news?.date)
      setTime(news?.time)
      setCost(news?.cost)
      setOrganizer(news?.organizer)
      setWebsite(news?.website)
      setPhone(news?.phone)
      setMeet(news?.meet)
      setEmail(news?.email)
      setVenue(news?.venue)
      getUrlFile(news?.imgnews)
      setPostingDate(new Date(news?.posting_at))
    })
  }
  useEffect(() => {
    firstload()
  }, [])

  function uploadCallback(file: any) {
    console.log(file)

    return new Promise((resolve, reject) => {
      const form_data = new FormData()
      form_data.append('file', file)
      HttpClient.postFile(`/user/filemanager`, form_data).then(response => {
        if (response.status != 200) {
          const error = response.data.message
          reject(error)
        }
        resolve({ data: { link: response.data.path } })
      })
    })
  }

  const onCreate = async () => {
    const json = {
      imgnews: files,
      title: sTitle,
      content: draftToHtml(convertToRaw(desc?.getCurrentContent())),
      type: 'Event',
      postingdate: postingDate,
      date: sdate,
      time: stime,
      cost: sCost,
      organizer: sorganizer,
      website: swebsite,
      phone: sphone,
      email: semail,
      venue: svenue,
      meet: smeet
    }
    setOnLoading(true)
    try {
      const resp = await HttpClient.patch(`/news/${params.get('id')}`, json)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      toast.success(` News/Event update successfully!`)
      window.location.replace('/admin/master-event/')
    } catch (error) {
      toast.error(`Opps ${getCleanErrorMessage(error)}`)
    }
    setOnLoading(false)
  }
  const handleChangetitle = (event: { target: { value: any } }) => {
    // Update the 'value' state when the input value changes.

    const newValue = event.target.value.length
    setType(newValue)
    setTitle(event.target.value)
  }

  return (
    <Box padding={3}>
      <Grid
        container
        spacing={6}
        sx={{
          boxSizing: 'border-box',
          background: '#FFFFFF',
          border: '1px solid rgba(76, 78, 100, 0.12)',
          borderRadius: '10px',
          p: 4,
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'center',
          wrap: 'nowrap'
        }}
      >
        <Grid item xs={12} spacing={6}>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onCreate)}>
            <Grid
              item
              container
              xs={12}
              sx={{
                boxSizing: 'border-box',
                background: '#FFFFFF',
                border: '1px solid rgba(76, 78, 100, 0.12)',
                borderRadius: '10px',
                p: 4,
                display: 'flex',
                alignItems: 'stretch',
                justifyContent: 'left',
                wrap: 'nowrap'
              }}
            >
              <Typography variant='body2' color={'#32487A'} fontWeight='600' fontSize={18} mb={3}>
                {' '}
                Edit Event
              </Typography>
              <Grid container xs={12} columnSpacing={'2'} rowSpacing={'2'} sx={{ mb: 2 }}>
                <Grid item xs={12} md={6}>
                  <InputLabel htmlFor='x' error={Boolean(errors.title)}>
                    Title
                  </InputLabel>
                  <OutlinedInput
                    id='title'
                    {...register('title')}
                    error={Boolean(errors.title)}
                    value={sTitle}
                    label='Title'
                    fullWidth
                    sx={{ mb: 1 }}
                    onChange={handleChangetitle}
                    endAdornment={
                      <InputAdornment position='end'>
                        <Typography>{charType} character</Typography>
                      </InputAdornment>
                    }
                  />
                </Grid>
                <Grid item container xs={12} md={3}>
                  <Grid container md={12}>
                    <InputLabel htmlFor='x' error={Boolean(errors.date)}>
                      Date
                    </InputLabel>
                    <OutlinedInput
                      sx={{ mb: 1 }}
                      id='date'
                      {...register('date')}
                      error={Boolean(errors.date)}
                      label='date'
                      fullWidth
                      value={sdate}
                      onChange={e => setDate(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid item container xs={12} md={3}>
                  <Grid container md={12}>
                    <InputLabel htmlFor='x' error={Boolean(errors.time)}>
                      Time
                    </InputLabel>
                    <OutlinedInput
                      sx={{ mb: 1 }}
                      id='time'
                      {...register('time')}
                      error={Boolean(errors.time)}
                      label='time'
                      fullWidth
                      value={stime}
                      onChange={e => setTime(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} md={3}>
                  <Grid container md={12}>
                    <InputLabel htmlFor='x' error={Boolean(errors.cost)}>
                      Cost
                    </InputLabel>
                    <OutlinedInput
                      sx={{ mb: 1 }}
                      id='cost'
                      {...register('cost')}
                      error={Boolean(errors.cost)}
                      label='Cost'
                      fullWidth
                      value={sCost}
                      onChange={e => setCost(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} md={3}>
                  <Grid container md={12}>
                    <InputLabel htmlFor='x' error={Boolean(errors.time)}>
                      Organizer
                    </InputLabel>
                    <OutlinedInput
                      sx={{ mb: 1 }}
                      id='datetime'
                      {...register('organizer')}
                      error={Boolean(errors.time)}
                      label='Organizer'
                      fullWidth
                      value={sorganizer}
                      onChange={e => setOrganizer(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} md={3}>
                  <Grid container md={12}>
                    <InputLabel htmlFor='x' error={Boolean(errors.time)}>
                      Website
                    </InputLabel>
                    <OutlinedInput
                      sx={{ mb: 1 }}
                      id='datetime'
                      {...register('website')}
                      error={Boolean(errors.time)}
                      label='Website'
                      fullWidth
                      value={swebsite}
                      onChange={e => setWebsite(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} md={3}>
                  <Grid container md={12}>
                    <InputLabel htmlFor='x' error={Boolean(errors.venue)}>
                      Venue
                    </InputLabel>
                    <OutlinedInput
                      sx={{ mb: 1 }}
                      id='Venue'
                      {...register('venue')}
                      error={Boolean(errors.venue)}
                      label='Venue'
                      fullWidth
                      value={svenue}
                      onChange={e => setVenue(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid item container xs={12} md={3}>
                  <Grid container md={12}>
                    <InputLabel htmlFor='x' error={Boolean(errors.time)}>
                      Email
                    </InputLabel>
                    <OutlinedInput
                      sx={{ mb: 1 }}
                      id='email'
                      {...register('email')}
                      error={Boolean(errors.email)}
                      label='Email'
                      fullWidth
                      value={semail}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} md={3}>
                  <Grid container md={12}>
                    <InputLabel htmlFor='x' error={Boolean(errors.time)}>
                      Phone
                    </InputLabel>
                    <OutlinedInput
                      sx={{ mb: 1 }}
                      id='phone'
                      {...register('phone')}
                      error={Boolean(errors.phone)}
                      label='phone'
                      fullWidth
                      value={sphone}
                      onChange={e => setPhone(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} md={3}>
                  <Grid container md={12}>
                    <InputLabel htmlFor='x' error={Boolean(errors.meet)}>
                      Link Meeting
                    </InputLabel>
                    <OutlinedInput
                      sx={{ mb: 1 }}
                      id='meet'
                      {...register('meet')}
                      error={Boolean(errors.meet)}
                      label='meet'
                      fullWidth
                      value={smeet}
                      onChange={e => setMeet(e.target.value)}
                    />
                  </Grid>
                </Grid>

                {show == true && (
                  <Grid item xs={12} md={4}>
                    <DatePickerWrapper>
                      <DatePicker
                        minDate={new Date()}
                        dateFormat='dd/MM/yyyy'
                        selected={postingDate}
                        id='basic-input'
                        onChange={(date: Date) => setPostingDate(date)}
                        placeholderText='Click to select a date'
                        customInput={<TextField size='small' label='Schedule' variant='outlined' fullWidth />}
                      />
                    </DatePickerWrapper>
                  </Grid>
                )}

                <Grid item md={12} xs={12}>
                  <Box
                    {...getRootProps({ className: 'dropzone' })}
                    sx={{
                      p: 2,
                      border: '1px dashed ',
                      borderRadius: '10px',
                      borderColor: 'grey.400',
                      '&:hover': { borderColor: 'grey.500' }
                    }}
                  >
                    <input {...getInputProps()} />
                    {files.length || urlFile ? (
                      urlFile && files.length == 0 ? (
                        <Link href='/' onClick={e => e.preventDefault()}>
                          <img alt='item thumbnail' className='single-file-image' src={urlFile} width={450} />
                        </Link>
                      ) : (
                        <Link href='/' onClick={e => e.preventDefault()}>
                          {img}
                        </Link>
                      )
                    ) : (
                      <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
                        <img width={200} alt='Upload img' src='/images/upload.png' />
                        <Box
                          sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}
                        >
                          <Typography
                            variant='h5'
                            color='textSecondary'
                            sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}
                          >
                            Click{' '}
                            <Link href='/' onClick={e => e.preventDefault()}>
                              browse / image
                            </Link>{' '}
                            to upload Thumbnail
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                  <Typography sx={{ mt: 1, color: 'primary.main', fontSize: 12 }}>
                    Allowed JPEG, JPG, PNG Size up to 3 Mb.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <EditorWrapper>
                    <EditorArea
                      editorState={desc}
                      onEditorStateChange={data => setDesc(data)}
                      toolbar={{
                        image: {
                          uploadCallback: uploadCallback,
                          previewImage: true,
                          alt: { present: true, mandatory: false }
                        }
                      }}
                      placeholder='Write detail of Event'
                    />
                    <Button
                      variant='contained'
                      sx={{ mr: 2 }}
                      type='submit'
                      startIcon={<Icon icon='ion:enter' fontSize={10} />}
                    >
                      {onLoading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Save'}
                    </Button>
                  </EditorWrapper>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  )
}

EditNewsScreen.acl = {
  action: 'read',
  subject: 'admin-community-management'
}
export default EditNewsScreen
