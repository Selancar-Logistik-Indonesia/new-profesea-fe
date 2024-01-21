// ** React Imports
import React , { useEffect, useState } from 'react'

// ** MUI Components
import Box  from '@mui/material/Box'  
import { Autocomplete, Button, CircularProgress, Typography } from '@mui/material'
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
// import { yupResolver } from '@hookform/resolvers/yup'
// import * as yup from 'yup'
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html';

import Forum from 'src/contract/models/forum'
//import Thread from 'src/contract/models/thread'
import { toast } from 'react-hot-toast'
import { getCleanErrorMessage } from 'src/utils/helpers'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
 
const EditThreadScreen = () => {  
  // const theme = useTheme()   
  const router = useRouter() 
  const windowUrl = window.location.search 
  const params = new URLSearchParams(windowUrl)
  const [onLoading, setOnLoading] = useState(false);
  const [forumCode, getForumCode] = useState<[]>([])
  const [sforum, setForum] = useState<any>(0)
  const [sTitle, setTitle] = useState<any>([])
  //const [threadDetail, setThreadDetail] = useState<Thread>()
  const [desc, setDesc] = useState(EditorState.createEmpty())

  const {
    handleSubmit
  } = useForm<any>({
    mode: 'onBlur'
  })  

  const firstload = () => {
      HttpClient.get(AppConfig.baseUrl + '/thread/' + params.get('id')).then(resp => {        
        const thread  = resp.data.thread 
        const contenDesc = convertFromHTML(thread?.content).contentBlocks
        const contentState = ContentState.createFromBlockArray(contenDesc)
        const editorState = EditorState.createWithContent(contentState)
        // console.log(thread)
        setDesc(editorState)
        setTitle(thread?.title)
        setForum(thread?.forum)
      })

      HttpClient.get(AppConfig.baseUrl + '/forum?page=1&take=15&search=').then(response => {
        const code = response.data.forums.data
        getForumCode(code)
      })
  }
  useEffect(() => {
    firstload()
  }, [])

  function uploadCallback(file:any){
    console.log(file);
    
    return new Promise((resolve, reject) => {
      const form_data = new FormData();
      form_data.append('file', file)
      HttpClient.postFile(`/user/filemanager` , form_data).then(response => {
        if (response.status != 200) {
          const error = response.data.message;
          reject(error);
        }
        resolve({ data: { link: response.data.path } })
      })
    });
  }

  const onCreate = async () => {

    const json = {
        "title": sTitle,
        "content": draftToHtml(convertToRaw(desc?.getCurrentContent())),
        "forum_id": sforum.id
    }
    setOnLoading(true);       
    try {
        const resp = await HttpClient.patch(`/thread/${params.get('id')}`, json);
        if (resp.status != 200) {
            throw resp.data.message ?? "Something went wrong!";
        }

        toast.success(`Thread update successfully!`);
        router.push('/admin/community-management')
    } catch (error) {
        toast.error(`Opps ${getCleanErrorMessage(error)}`);
    }
    setOnLoading(false);       

  }

  return (
    <Box>
      <Grid container spacing={6}  sx={{
        boxSizing: 'border-box',
        background: '#FFFFFF',
        border: '1px solid rgba(76, 78, 100, 0.12)',
        borderRadius: '10px',
        p: 4,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        wrap: 'nowrap'
      }}>
        <Grid item xs={10} spacing={6}>
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
                <Typography variant="body2" color={"#32487A"} fontWeight="600" fontSize={18} mb={3}> Edit Thread</Typography>
                  <Grid container xs={12} columnSpacing={'2'} rowSpacing={'2'} sx={{ mb: 2 }}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        id='title'
                        value={sTitle} 
                        onChange={(e) => setTitle(e.target.value)}           
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
                        value={sforum}
                        options={forumCode}
                        renderInput={params => <TextField {...params} label='Forum' />}
                        getOptionLabel={(option: any) => option.name}
                        onChange={(event: any, newValue: Forum | null) =>
                          newValue?.id ? setForum(newValue) : setForum([])
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <EditorWrapper>
                          <EditorArea editorState={desc} onEditorStateChange={data => setDesc(data)} toolbar={{
                              image: { uploadCallback: uploadCallback, previewImage: true,  alt: { present: true, mandatory: false }},
                          }}  placeholder='Write a thread' />
                          <Button variant='contained' sx={{ mr: 2 }} type='submit' startIcon={<Icon icon='ion:enter' fontSize={10} />}>
                              {onLoading ? (<CircularProgress size={25} style={{ color: 'white' }} />) : "Save"}
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
 

EditThreadScreen.acl = {
  action: 'read',
  subject: 'admin-community-management'
};
export default EditThreadScreen
