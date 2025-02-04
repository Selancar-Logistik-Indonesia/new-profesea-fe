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
  Typography
} from '@mui/material'
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
import { INewsCategories } from '../create'

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
  const [sforumCode, setForumCode] = useState<any>([])
  const [sforum, setForum] = useState<any>([])
  const [sTitle, setTitle] = useState<any>([])
  const [sTitleEnglish, setTitleEnglish] = useState<any>([])
  const [sSlug, setSlug] = useState<any>([])
  const [sMeta, setMeta] = useState<any>([])

  const [charType, setType] = useState('0')
  const [charMeta, setMeta2] = useState('0')
  const [charSlug, setSlug2] = useState('0')
  const [charSnap, setCharSnap] = useState('0')
  //const [newsDetail, setThreadDetail] = useState<Thread>()
  const [desc, setDesc] = useState(EditorState.createEmpty())
  const [descEnglish, setDescEnglish] = useState(EditorState.createEmpty())
  const [files, setFiles] = useState<File[]>([])
  const [postingDate, setPostingDate] = useState<DateType>(new Date())
  const [urlFile, getUrlFile] = useState<any>()
  // const [User, getUser] =useState<any[]>([])

  const [newsCategoryId, setNewsCategoryId] = useState<any>(null)
  const [newsCategories, setNewsCategories] = useState<INewsCategories[]>([])
  const [featuredNews, setFeaturedNews] = useState(false)
  const [snapContent, setSnapContent] = useState<any>(null)

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
    title: yup.string().min(1).max(60).required('maximum 60 character'),
    title_eng: yup.string().min(1).max(60).required('maximum 60 character'),
    meta: yup.string().min(1).max(160).required('maximum 160 character'),
    snapContent: yup.string().min(1).max(250).required('maximum 250 character')
  })
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const type = [{ title: 'News' }, { title: 'Event' }]
  const firstload = () => {
    setShow(false)
    HttpClient.get(AppConfig.baseUrl + '/news/id/' + params.get('id')).then(resp => {
      const news: any = resp.data.news
      const contenDesc = convertFromHTML(news?.content).contentBlocks
      const contenEnglishDesc = convertFromHTML(news?.content_eng).contentBlocks
      const contentState = ContentState.createFromBlockArray(contenDesc)
      const contentEnglishState = ContentState.createFromBlockArray(contenEnglishDesc)
      const editorState = EditorState.createWithContent(contentState)
      const editorEnglishState = EditorState.createWithContent(contentEnglishState)
      setDesc(editorState)
      setDescEnglish(editorEnglishState)
      setTitle(news?.title)
      setTitleEnglish(news?.title_eng)
      setType(news?.title?.length)
      setSlug(news?.slug)
      setSlug2(news?.slug?.length)
      setMeta(news?.meta)
      setMeta2(news?.meta.length)
      setNewsCategoryId(news?.category)
      setFeaturedNews(news?.featured_news)
      setSnapContent(news?.snap_content)
      setCharSnap(news?.snap_content?.length)

      // useform setvalue
      setValue('title', news?.title)
      setValue('title_eng', news?.title_eng)
      setValue('meta', news?.meta)
      setValue('snapContent', news?.snap_content)

      setForum({ title: news?.type })
      getUrlFile(news?.imgnews)
      setPostingDate(new Date(news?.posting_at))
      setForumCode(news?.type)
    })
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
    firstload()
    comboBox()
  }, [])

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

  const onCreate = async () => {
    const json = {
      imgnews: files,
      title: sTitle,
      title_eng: sTitleEnglish,
      content: draftToHtml(convertToRaw(desc?.getCurrentContent())),
      content_eng: draftToHtml(convertToRaw(descEnglish?.getCurrentContent())),
      type: sforumCode,
      postingdate: postingDate,
      slug: sSlug,
      meta: sMeta,
      category_id: newsCategoryId?.id,
      featured_news: featuredNews,
      snap_content: snapContent
    }
    setOnLoading(true)
    try {
      const resp = await HttpClient.patch(`/news/${params.get('id')}`, json)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      toast.success(` News update successfully!`)
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
    setTitle(event.target.value)
  }
  const handleChangeEnglishTitle = (event: { target: { value: any } }) => {
    // Update the 'value' state when the input value changes.

    const newValue = event.target.value.length
    setType(newValue)
    setTitleEnglish(event.target.value)
  }
  const handleChangeslug = (event: { target: { value: any } }) => {
    // Update the 'value' state when the input value changes.

    const newValue = event.target.value.length
    setSlug2(newValue)
    setSlug(event.target.value)
  }
  const handleChangemeta = (event: { target: { value: any } }) => {
    // Update the 'value' state when the input value changes.

    const newValue = event.target.value.length
    setMeta2(newValue)
    setMeta(event.target.value)
  }

  const handleChangeSnapContentLength = (event: { target: { value: any } }) => {
    const newValue = event.target.value.length
    setCharSnap(newValue)
    setSnapContent(event?.target.value)
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
                Edit News
              </Typography>
              <Grid container xs={12} columnSpacing={'2'} rowSpacing={'2'} sx={{ mb: 2 }}>
                {/* <Grid item xs={12} md={4}>
                  <TextField
                    id='title'
                    {...register('title')}
                    error={Boolean(errors.title)}
                    value={sTitle}
                    onChange={e => setTitle(e.target.value)}
                    label='Title'
                    variant='outlined'
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                </Grid> */}
                <Grid item xs={12} md={6}>
                  <InputLabel htmlFor='x' error={Boolean(errors.type)}>
                    Type
                  </InputLabel>
                  <Autocomplete
                    disablePortal
                    id='code'
                    value={sforum}
                    options={type}
                    renderInput={params => <TextField {...params} />}
                    getOptionLabel={(option: any) => option.title}
                    onChange={(event: any, newValue: any | null) =>
                      newValue?.title ? setForumCode(newValue.title) : setForumCode('')
                    }
                  />
                </Grid>

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
                        <Typography>{charType} character / 60</Typography>
                      </InputAdornment>
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel htmlFor='x' error={Boolean(errors.title_eng)}>
                    English Title
                  </InputLabel>
                  <OutlinedInput
                    id='title_eng'
                    {...register('title_eng')}
                    error={Boolean(errors.title_eng)}
                    value={sTitleEnglish}
                    label='English Title'
                    fullWidth
                    sx={{ mb: 1 }}
                    onChange={handleChangeEnglishTitle}
                    endAdornment={
                      <InputAdornment position='end'>
                        <Typography>{charType} character / 60</Typography>
                      </InputAdornment>
                    }
                  />
                </Grid>
                <Grid item container xs={12} md={6}>
                  <Grid container md={12}>
                    <InputLabel htmlFor='x' error={Boolean(errors.slug)}>
                      Slug
                    </InputLabel>
                    <OutlinedInput
                      id='slug'
                      {...register('slug')}
                      error={Boolean(errors.slug)}
                      value={sSlug}
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
                      value={sMeta}
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
                  <Grid container md={12}>
                    <InputLabel htmlFor='x' error={Boolean(errors.snapContent)}>
                      Snap Content
                    </InputLabel>
                    <OutlinedInput
                      sx={{ mb: 1 }}
                      id='snapContent'
                      {...register('snapContent')}
                      error={Boolean(errors.snapContent)}
                      value={snapContent}
                      onChange={handleChangeSnapContentLength}
                      label='Please Insert Snap Content'
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
                    <InputLabel>News Category</InputLabel>
                    <Autocomplete
                      disablePortal
                      id='combo-box-category-id'
                      value={newsCategoryId}
                      options={newsCategories}
                      getOptionLabel={(option: INewsCategories) => option.name}
                      renderInput={params => <TextField {...params} />}
                      onChange={(event: any, newValue: INewsCategories | null) =>
                        newValue ? setNewsCategoryId(newValue) : setNewsCategoryId(null)
                      }
                    />
                  </Box>
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
                            to upload News/Event
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
                    <Typography>Indonesia Content :</Typography>
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
                      placeholder='Write a news'
                    />
                    <hr style={{ margin: '30px 0' }} />
                    <Typography>English Content :</Typography>
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
                      placeholder='Write a news'
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
