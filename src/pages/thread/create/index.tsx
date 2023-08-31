// ** React Imports
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import { Autocomplete, Button, CircularProgress, TextField, Typography } from '@mui/material'

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
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import Forum from 'src/contract/models/forum'
import { toast } from 'react-hot-toast'
import { getCleanErrorMessage } from 'src/utils/helpers'
import { Icon } from '@iconify/react'

const Thread = () => {
  // const theme = useTheme() 
  const router = useRouter()
  const [onLoading, setOnLoading] = useState(false);
  const [forumCode, getForumCode] = useState<[]>([])
  const [sforumCode, setForumCode] = useState(0)
  const [desc, setDesc] = useState(EditorState.createEmpty())

  const schema = yup.object().shape({
    title: yup.string().min(1).required()
  })
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<any>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const combobox = () => {
    HttpClient.get(AppConfig.baseUrl + '/forum?page=1&take=10&search=').then(response => {
      const code = response.data.forums.data
      getForumCode(code)
    })
  }
  useEffect(() => {
    combobox()
  }, [])

  function uploadCallback(file: any) {
    console.log(file);

    return new Promise((resolve, reject) => {
      const form_data = new FormData();
      form_data.append('file', file)
      HttpClient.postFile(`/user/filemanager`, form_data).then(response => {
        if (response.status != 200) {
          const error = response.data.message;
          reject(error);
        }
        resolve({ data: { link: response.data.path } })
      })
    });
  }

  const onCreate = async (formData: any) => {
    const { title } = formData

    const json = {
      "title": title,
      "content": draftToHtml(convertToRaw(desc?.getCurrentContent())),
      "forum_id": sforumCode
    }
    setOnLoading(true);
    try {
      const resp = await HttpClient.post('/thread', json);
      if (resp.status != 200) {
        throw resp.data.message ?? "Something went wrong!";
      }

      toast.success(` Thread created successfully!`);
      router.push('/community')
    } catch (error) {
      toast.error(`Opps ${getCleanErrorMessage(error)}`);
    }
    setOnLoading(false);

  }

  return (
    <Box padding={5}>
      <Grid container spacing={2} sx={{
        boxSizing: 'border-box',
        background: '#FFFFFF',
        border: 0,
        borderRadius: '2px',
        p: 4,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        wrap: 'nowrap'
      }}>

        <Grid item xs={12} spacing={6}>
          <Grid item xs={12}>
            <Typography variant='h6' color={'#32487A'} fontWeight='600' mb={5}>
              Create Thread
            </Typography>
          </Grid>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onCreate)} >
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



              <Grid container xs={12} columnSpacing={'2'} rowSpacing={'2'} sx={{ mb: 2 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id='title'
                    {...register("title")} error={Boolean(errors.title)}
                    label='Title'
                    variant='outlined'
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    disablePortal
                    id='code'
                    options={forumCode}
                    renderInput={params => <TextField {...params} label='Forum' />}
                    getOptionLabel={(option: any) => option.name}
                    onChange={(event: any, newValue: Forum | null) =>
                      newValue?.id ? setForumCode(newValue.id) : setForumCode(0)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <EditorWrapper>
                    <EditorArea editorState={desc} onEditorStateChange={data => setDesc(data)} toolbar={{
                      image: { uploadCallback: uploadCallback, previewImage: true, alt: { present: true, mandatory: false } },
                    }} placeholder='Write a thread' />
                  </EditorWrapper>
                </Grid>S
                <Grid item direction='row' justifyContent='flex-end' alignItems='center' md={11} lg={11} xs={12}></Grid>
                <Grid item container direction='row' justifyContent='flex-end' alignItems='center' md={1} lg={1} xs={12}>
                <Button variant='contained' color='success' size='small' sx={{ mr: 2, mt: 2 }} type='submit' startIcon={<Icon icon='solar:diskette-bold-duotone' fontSize={18} />}>
                      {onLoading ? (<CircularProgress size={25} style={{ color: 'white' }} />) : "Save"}
                    </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box >
  )
}


Thread.acl = {
  action: 'read',
  subject: 'home'
};
export default Thread
