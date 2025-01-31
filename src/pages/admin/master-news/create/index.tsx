// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import {
  Autocomplete,
  Button,
  CircularProgress,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Switch,
  TextField,
  Typography
} from '@mui/material'

// import {  useTheme } from '@mui/material/styles'
// ** Third Party Imports

// ** Component Import
import { Grid } from '@mui/material'

import EditorArea from 'src/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { HttpClient } from 'src/services'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import "../../node_modules/draft-js-image-plugin/lib/plugin.css"

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { toast } from 'react-hot-toast'
import { getCleanErrorMessage } from 'src/utils/helpers'
import { Icon } from '@iconify/react'
import { useDropzone } from 'react-dropzone'
import Link from 'next/link'
import { DateType } from 'src/contract/models/DatepickerTypes'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

export interface INewsCategories {
  id: number
  name: string
  created_at: string
  updated_at: string
}

const MasterNewsScreen = () => {
  // const theme = useTheme()
  const [onLoading, setOnLoading] = useState(false)
  const [charType, setType] = useState('0')
  const [charMeta, setMeta] = useState('0')
  const [charSlug, setSlug] = useState('0')
  const [charSnap, setCharSnap] = useState('0')
  const [desc, setDesc] = useState(EditorState.createEmpty())
  const [descEnglish, setDescEnglish] = useState(EditorState.createEmpty())
  const [files, setFiles] = useState<File[]>([])
  const [postingDate, setPostingDate] = useState<DateType>(new Date())
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })
  const [newsCategories, setNewsCategories] = useState<INewsCategories[]>([])
  const [newsCategoryId, setNewsCategoryId] = useState<any>(null)
  const [featuredNews, setFeaturedNews] = useState(false)

  const img = files.map((file: FileProp) => (
    <img
      key={file.name}
      alt={file.name}
      className='single-file-image'
      src={URL.createObjectURL(file as any)}
      width={450}
    />
  ))
  interface FileProp {
    name: string
    type: string
    size: number
  }
  const schema = yup.object().shape({
    // desc: yup.string().min(1).required(),
    title: yup.string().min(1).max(60).required('maximum 60 character'),
    meta: yup.string().min(1).max(160).required('maximum 160 character'),
    snapContent: yup.string().min(1).max(250).required('maximum 250 character')
  })
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  //  const type = [{ title: 'News' }, { title: 'Event' }]
  const [show, setShow] = useState<boolean>(false)

  function uploadCallback(file: any) {
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

  const onCreate = async (formData: any) => {
    const { title, titleEnglish, slug, meta, snapContent } = formData

    const json = {
      imgnews: files,
      title: title,
      titleEnglish: titleEnglish,
      content: draftToHtml(convertToRaw(desc?.getCurrentContent())),
      contentEnglish: draftToHtml(convertToRaw(descEnglish?.getCurrentContent())),
      type: 'News',
      slug: slug,
      meta: meta,
      postingdate: postingDate,
      category_id: newsCategoryId ? newsCategoryId : null,
      featured_news: featuredNews,
      snap_content: snapContent
    }

    setOnLoading(true)
    try {
      const resp = await HttpClient.postFile('/news', json)

      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }
      setShow(false)
      toast.success(` News created successfully!`)
      window.location.replace('/admin/master-news2/')
    } catch (error) {
      toast.error(`Opps ${getCleanErrorMessage(error)}`)
    }
    setOnLoading(false)
  }
  const handleChangetitle = (event: { target: { value: any } }) => {
    // Update the 'value' state when the input value changes.

    const newValue = event.target.value.length
    setType(newValue)
  }
  const handleChangeslug = (event: { target: { value: any } }) => {
    // Update the 'value' state when the input value changes.
    // debugger
    const newValue = event.target.value.length
    setSlug(newValue)
  }
  const handleChangemeta = (event: { target: { value: any } }) => {
    // Update the 'value' state when the input value changes.
    // debugger
    const newValue = event.target.value.length
    setMeta(newValue)
  }

  const handleChangeSnapContentLength = (event: { target: { value: any } }) => {
    const newValue = event.target.value.length
    setCharSnap(newValue)
  }

  const comboBox = async () => {
    HttpClient.get(`/news-category?page=1&take=1000`).then(response => {
      if (response.status != 200) {
        throw response.data.message ?? 'Something went wrong!'
      }
      const newsCategories = response?.data?.data?.data
      setNewsCategories(newsCategories)
    })
  }

  useEffect(() => {
    comboBox()
  }, [])

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
                Create{' '}
              </Typography>
              <Grid container xs={12} columnSpacing={'2'} rowSpacing={'2'} sx={{ mb: 2 }}>
                <Grid item container xs={12} md={6}>
                  <Grid container md={12}>
                    <InputLabel htmlFor='x' error={Boolean(errors.title)}>
                      Title
                    </InputLabel>
                    <OutlinedInput
                      sx={{ mb: 1 }}
                      label='Title'
                      id='title'
                      {...register('title')}
                      error={Boolean(errors.title)}
                      onChange={handleChangetitle}
                      fullWidth
                      endAdornment={
                        <InputAdornment position='end'>
                          <Typography>{charType} character / 60</Typography>
                        </InputAdornment>
                      }
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} md={6}>
                  <Grid container md={12}>
                    <InputLabel htmlFor='x' error={Boolean(errors.slug)}>
                      Slug
                    </InputLabel>
                    <OutlinedInput
                      sx={{ mb: 1 }}
                      id='slug'
                      {...register('slug')}
                      error={Boolean(errors.slug)}
                      onChange={handleChangeslug}
                      label='Slug'
                      fullWidth
                      endAdornment={
                        <InputAdornment position='end'>
                          <Typography>{charSlug} character</Typography>
                        </InputAdornment>
                      }
                    />
                  </Grid>
                </Grid>

                <Grid item container xs={12} md={6}>
                  <Grid container md={12}>
                    <InputLabel htmlFor='x' error={Boolean(errors.meta)}>
                      Meta Description
                    </InputLabel>
                    <OutlinedInput
                      sx={{ mb: 1 }}
                      id='slugmeta'
                      {...register('meta')}
                      error={Boolean(errors.meta)}
                      onChange={handleChangemeta}
                      label='Meta Description'
                      fullWidth
                      endAdornment={
                        <InputAdornment position='end'>
                          <Typography>{charMeta} character / 160</Typography>
                        </InputAdornment>
                      }
                    />
                  </Grid>
                </Grid>

                <Grid item container xs={12} md={6}>
                  <Box sx={{ width: '100%' }}>
                    <InputLabel>News Category</InputLabel>
                    <Autocomplete
                      disablePortal
                      id='combo-box-category-id'
                      options={newsCategories}
                      getOptionLabel={(option: INewsCategories) => option.name}
                      renderInput={params => <TextField {...params} />}
                      onChange={(event: any, newValue: INewsCategories | null) =>
                        newValue ? setNewsCategoryId(newValue.id) : setNewsCategoryId(null)
                      }
                    />
                  </Box>
                </Grid>

                <Grid item container xs={12} md={6}>
                  <Grid container md={12}>
                    <InputLabel htmlFor='x' error={Boolean(errors.snapContent)}>
                      Snap Content
                    </InputLabel>
                    <OutlinedInput
                      sx={{ mb: 1 }}
                      id='snapContent'
                      {...register('snapContent')}
                      error={Boolean(errors.snapContent)}
                      onChange={handleChangeSnapContentLength}
                      label='Snap Content'
                      fullWidth
                      endAdornment={
                        <InputAdornment position='end'>
                          <Typography>{charSnap} character / 250</Typography>
                        </InputAdornment>
                      }
                    />
                  </Grid>
                </Grid>

                <Grid item container xs={12} md={6}>
                  <Box sx={{ width: '100%' }}>
                    <InputLabel>Featured News</InputLabel>
                    <Switch
                      checked={featuredNews}
                      onChange={() => setFeaturedNews(!featuredNews)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </Box>
                </Grid>

                {show == true && (
                  <Grid item xs={12} md={4}>
                    <DatePickerWrapper>
                      <DatePicker
                        minDate={new Date()}
                        dateFormat='dd/MM/yyyy'
                        selected={postingDate}
                        id='basic-input'
                        disabled
                        onChange={(date: Date) => setPostingDate(date)}
                        placeholderText='Click to select a date'
                        customInput={<TextField size='small' label='Posting Date' variant='outlined' fullWidth />}
                      />
                    </DatePickerWrapper>
                    <TextField
                      id='deskripsi'
                      {...register('deskripsi')}
                      error={Boolean(errors.deskripsi)}
                      label='deskripsi'
                      variant='outlined'
                      fullWidth
                      sx={{ mb: 1 }}
                    />
                  </Grid>
                )}
                <Grid item md={12} xs={12}>
                  <Box {...getRootProps({ className: 'dropzone' })} sx={{ p: 2, border: '1px dashed' }}>
                    <input {...getInputProps()} />
                    {files.length ? (
                      img
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
                      placeholder='Write a news/event in Bahasa Indonesia'
                    />

<EditorArea
                      editorState={descEnglish}
                      onEditorStateChange={data => setDescEnglish(data)}
                      toolbar={{
                        image: {
                          uploadCallback: uploadCallback,
                          previewImage: true,
                          alt: { present: true, mandatory: false }
                        }
                      }}
                      placeholder='Write a news/event in English'
                    />
                    {/* {errors.desc && (
                      <FormHelperText sx={{ color: 'error.main' }} id=''>
                        {(errors as any).desc?.message}
                      </FormHelperText>
                    )} */}
                    <Button
                      variant='contained'
                      size='small'
                      sx={{ mt: 2, mr: 2 }}
                      type='submit'
                      startIcon={<Icon icon='ion:enter' fontSize={12} />}
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

MasterNewsScreen.acl = {
  action: 'read',
  subject: 'admin-community-management'
}
export default MasterNewsScreen
