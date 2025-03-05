import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Drawer,
  Fade,
  FadeProps,
  Grid,
  IconButton,
  Typography
} from '@mui/material'
import React, { forwardRef, ReactElement, Ref, useCallback, useEffect, useRef, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { useDropzone, Accept } from 'react-dropzone'
import styles from '../../../styles/scss/Dropzone.module.scss'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import toast from 'react-hot-toast'
import { IUser } from 'src/contract/models/user'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'


type dialogProps = {
  isSubs: boolean
  isOpen: boolean
  handleClose: VoidFunction
  isMobile: boolean
}

type ConfirmationProps = {
  isOpen: boolean
  handleCloseModal: VoidFunction
  handleDelete: VoidFunction
  
}
type errorModalProps = {
  isOpen: boolean
  isWait: boolean
  handleCloseModal: any
  handleDisable: any
  errorType: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const errorMessages: any = {
  fileNotFound: {
    title: 'File Not Found',
    message: 'The file could not be found. Please upload your CV again.'
  },
  fileFormatError: {
    title: 'File Format Error',
    message: 'Invalid file format. Please upload a PDF or PNG file.'
  },
  fileSizeExceedsLimit: {
    title: 'File Size Exceeds Limit',
    message: 'File size exceeds the 3MB limit. Please upload a smaller file.'
  },
  fileCountExceedsLimit: {
    title: 'File Count Exceeds Limit',
    message: 'File count exceeds the limit. Please upload a single file.'
  },
  fileCoruptedDetected: {
    title: 'File Corrupted Detected',
    message: 'The file appears to be corrupted. Please upload a valid CV.'
  },
  unauthorizedAccess: {
    title: 'Unauthorized Access',
    message: 'You need a subscription to access this feature. Upgrade now to start uploading your CV.'
  },
  tiemout: {
    title: 'Timeout',
    message: 'Upload failed due to a network issue. Please check your connection and try again.'
  },
  serverError: {
    title: 'Server Error',
    message: 'There was an error uploading your CV. Please try again later.'
  }
}

const DialogResumeBuilder = ({ isSubs, isOpen, handleClose, isMobile }: dialogProps) => {
  if (isMobile) {
    return (
      <Drawer open={isOpen} anchor='bottom' onClose={handleClose}>
        <Box
          padding={isSubs ? '24px' : '32px 64px'}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08)'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Typography variant='body2' fontWeight={700} fontSize={isSubs ? '18px' : '32px'} color={'#1F1F1F'}>
              {isSubs ? 'Upload Resume' : 'Find the Perfect Profesea Plans for Your Goals!'}
            </Typography>
            {isSubs ? (
              ''
            ) : (
              <Typography fontWeight={400} fontSize={'14px'} color={'#666666'}>
                Start Growing Today—Cancel Anytime
              </Typography>
            )}
          </Box>
          <IconButton size='small' onClick={handleClose}>
            <Icon icon='mdi:close' fontSize={'24px'} />
          </IconButton>
        </Box>
        <Box>
          {isSubs ? <SubscriberContent isMobile={isMobile} handleClose={handleClose} /> : <NonSubscriberContent />}
        </Box>
      </Drawer>
    )
  }

  return (
    <Dialog
      fullWidth
      open={isOpen}
      scroll='body'
      maxWidth='md'
      TransitionComponent={Transition}
      sx={{ borderRadius: 12 }}
    >
      <DialogContent sx={{ padding: 0 }}>
        <Box
          padding={isSubs ? '16px 64px' : '32px 64px'}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            boxShadow: '0px 0px 0px 0px , 0px 2px 10px 0px rgba(0, 0, 0, 0.08)'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Typography variant='body2' fontWeight={700} fontSize={isSubs ? '18px' : '32px'} color={'#1F1F1F'}>
              {isSubs ? 'Upload Resume' : 'Find the Perfect Profesea Plans for Your Goals!'}
            </Typography>
            {isSubs ? (
              ''
            ) : (
              <Typography fontWeight={400} fontSize={'14px'} color={'#666666'}>
                Start Growing Today—Cancel Anytime
              </Typography>
            )}
          </Box>
          <IconButton size='small' onClick={handleClose}>
            <Icon icon='mdi:close' fontSize={'24px'} />
          </IconButton>
        </Box>
        <Box>
          {isSubs ? <SubscriberContent isMobile={isMobile} handleClose={handleClose} /> : <NonSubscriberContent />}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

const SubscriberContent = ({ handleClose, isMobile }: { handleClose: VoidFunction; isMobile: boolean}) => {
  const [attachment, setAttachment] = useState<any>()
  const [prevAttachment, setPrevAttachment] = useState<any>(false)
  const [errorType, setErrorType] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [wait, setWait] = useState<number>(0)
  const [isWait, setIsWait] = useState<boolean>(false)


  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  
  const router = useRouter()
  const params = useSearchParams()
  const fallbackUrl = params.get('fallbackUrl')

  //Dropdown Settings
  const acceptFile: Accept = {
    'image/*': ['.png'],
    'aaplication/pdf': ['.pdf']
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsError(false)

      if (acceptedFiles.length > 1) {
        setIsError(true)
        setErrorType('fileCountExceedsLimit')
        setIsErrorModalOpen(true)

        return
      }

      const maxSize = 3 * 1024 * 1024
      if (acceptedFiles[0].size > maxSize) {
        setIsError(true)
        setErrorType('fileSizeExceedsLimit')
        setIsErrorModalOpen(true)

        return
      }

      if (acceptedFiles[0].type !== 'application/pdf' && acceptedFiles[0].type !== 'image/png') {
        setIsError(true)
        setErrorType('fileFormatError')
        setIsErrorModalOpen(true)

        return
      }

      setAttachment(acceptedFiles[0])
      setIsErrorModalOpen(false)
    },
    [attachment]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      ...acceptFile
    }
  })

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile: any = e.target.files
    onDrop(selectedFile)
  }

  const handleUpload: VoidFunction = async () => {
    if (prevAttachment) {
      handleClose()

      return
    }

    try {
      setIsLoading(true)
      const data = new FormData()
      data.append('cv', attachment)

      const res = await HttpClient.post(AppConfig.baseUrl + '/user/upload-cv', data)

      if (res.status !== 200) {
        toast.error('There is something wrong when uploading your file. Please try again later.')
      }
      setIsLoading(false)
      
      

      handleClose()
      toast.success('Your resume has been successfully uploaded.')
      if(fallbackUrl){
        router.push(fallbackUrl)
      }
      
    } catch (err: any) {
      setIsLoading(false)
      if(err.response.status as number === 500) {
        setIsError(true)
        setErrorType('serverError')
        setIsErrorModalOpen(true)
        setIsWait(true)
      } else if(err.response.status === 401 || err.response.status === 403) {
        setIsError(true)
        setErrorType('unauthorizedAccess')
        setIsErrorModalOpen(true)
      }else {
        setIsError(true)
        setErrorType('timeout')
        setIsErrorModalOpen(true)
      }
    }
  }

  const handleDelete: VoidFunction = async () => {
    if (attachment) {
      setAttachment(null)
      setPrevAttachment(null)
      setIsWait(false)
      setIsError(false)

      return
    }

    setPrevAttachment('')
    try {
      HttpClient.del(`/user/delete-cv/${user.id}`)
      toast.success('Resume Deleted.')
    } catch (error) {
      toast.error('There is an error when trying to delete your resume. Please try again later.')
    }
  }

  const handleDisable: VoidFunction = () =>{
    setWait(10)
    
    const interval = setInterval(() => {
      setWait(prev => {
          if (prev <= 1) {
              clearInterval(interval); // Stop interval when it reaches 0
              setIsError(false)
              setIsWait(false)

              return 0; // Reset countdown
          }

          return prev - 1; // Decrease countdown
      });
  }, 1000);
  }


  useEffect(() => {
    //getting previous uploaded CV
    HttpClient.get(AppConfig.baseUrl + `/user/download-cv/${user.id}`)
      .then(response => {
        if (!response.data.filename || response.data.filename === '') {
          setPrevAttachment(false)

          return
        }
        console.log(response)
        setPrevAttachment({ ...response.data })
      })
      .catch(err => {
        if(err.response.status === 404) {
          setIsError(true)
          setErrorType('fileNotFound')
          setIsErrorModalOpen(true)
        } else{
          setIsError(true)
          setErrorType('tiemout')
          setIsErrorModalOpen(true)
        }
      })
  }, [])

  return (
    <>
      <Box
        padding={isMobile ? '24px' : '16px 64px'}
        sx={{
          backgroundColor: '#FAFAFA',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          minHeight: isMobile ? '0px' : '360px'
        }}
      >
        <Box display={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography variant='body2' fontSize={'16px'} fontWeight={700} color={'#303030'}>
            Manage your resume
          </Typography>
          <Typography variant='body2' fontSize={'14px'} fontWeight={400} color={'#868686'}>
            Attach your preferred resume when submitting your application.
          </Typography>
        </Box>

        {attachment || prevAttachment ? (
          <Box
            border={'1px solid #BFBFBF'}
            borderRadius={'8px'}
            padding={'12px'}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'center' }}>
              <Icon icon='ph:file-text' fontSize={'24px'} />
              <Box>
                <Typography variant='body2' fontSize={'14px'} fontWeight={700} color={'#303030'}>
                  {(attachment && attachment.name) || (prevAttachment && prevAttachment.filename)}
                </Typography>
                <Typography variant='body2' fontSize={'12px'} fontWeight={400} color={'#999999'}>
                  {attachment && (attachment?.size / (1024 * 1024)).toFixed(2) + 'MB'}
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={() => setIsModalOpen(true)}>
              <Icon icon='mdi:close' fontSize={'18px'} color='#343330' />
            </IconButton>
          </Box>
        ) : (
          <div {...getRootProps({ className: styles['dropzone-wrapper'] })}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p style={{ textAlign: 'center' }}>Drop the file here ...</p>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <Icon icon='ph:upload-simple' fontSize={24} />
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#303030' }}>
                  Choose a file or drag & drop it here
                </p>
                <p style={{ fontSize: '12px', fontWeight: 400, color: '#999999' }}>PNG and PDF formats, up to 3MB</p>
                <Button
                  variant='outlined'
                  sx={{
                    border: '1px solid #BFBFBF',
                    fontSize: '14px',
                    color: '#666666',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    textTransform: 'none',
                    fontWeight: 400
                  }}
                >
                  Browse File
                </Button>
              </div>
            )}
          </div>
        )}
        <ConfirmationModal isOpen={isModalOpen} handleCloseModal={handleCloseModal} handleDelete={handleDelete} />
        <ErrorModal
          errorType={errorType}
          isOpen={isErrorModalOpen}
          isWait={isWait}
          handleCloseModal={setIsErrorModalOpen}
          handleChange={handleChange}
          handleDisable={handleDisable}
        />
      </Box>
      <Box
        padding={isMobile ? '16px 24px' : '16px 64px'}
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column-reverse' : 'row',
          justifyContent: 'space-between',
          boxShadow: '0px 0px 0px 0px, 0px 2px 10px rgba(0, 0, 0, 0.08)',
          gap: '10px'
        }}
      >
        <Button
          variant='outlined'
          onClick={() => handleClose()}
          sx={{
            padding: '8px 12px',
            color: '#0B58A6',
            fontSize: '14px',
            fontWeight: 400,
            borderRadius: '4px',
            border: 'solid 1px #0B58A6',
            textTransform: 'none',
            width: isMobile ? '100%' : '120px'
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleUpload()}
          disabled={(isError || !attachment) && !prevAttachment}
          variant='contained'
          sx={{
            padding: '8px 12px',
            BackgourndColor: '#0B58A6',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: 400,
            borderRadius: '4px',
            textTransform: 'none',
            width: isMobile ? '100%' : '120px'
          }}
        >
        {isLoading ? <CircularProgress size={20}/> : prevAttachment ? 'Done' : isWait ? `(wait ${wait}s)` : 'Upload' }
        </Button>
      </Box>
    </>
  )
}

const NonSubscriberContent = () => {
  return (
    <Box padding={'32px 64px'} sx={{ backgroundColor: '#F0F0F0' }}>
      <Box></Box>
    </Box>
  )
}

const ConfirmationModal = ({ isOpen, handleCloseModal, handleDelete }: ConfirmationProps) => {
  return (
    <Dialog open={isOpen} onClose={() => handleCloseModal()}>
      <DialogContent>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', alignItems: 'center' }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Typography textAlign={'center'} fontSize={'18px'} fontWeight={700}>
              Are you sure you want to remove this?
            </Typography>
            <Typography textAlign={'center'} fontSize={'14px'} fontWeight={400}>
              This action will remove the file permanently. You'll <br />
              need to re-upload it if required.
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{}}>
            <Grid item xs={6}>
              <Button
                onClick={() => {
                  handleDelete()
                  handleCloseModal()
                }}
                variant='outlined'
                sx={{ padding: '8px 12px', color: '#0B58A6', fontSize: '14px', textTransform: 'none', width: '100%' }}
              >
                Yes, Delete
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={() => handleCloseModal()}
                variant='contained'
                sx={{ padding: '8px 12px', color: '#FFFFFF', fontSize: '14px', textTransform: 'none', width: '100%' }}
              >
                No, Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

const ErrorModal = ({ isOpen, handleCloseModal, errorType, handleChange, handleDisable, isWait }: errorModalProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  return (
    <Dialog open={isOpen} onClose={() => handleCloseModal()}>
      <DialogContent>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', alignItems: 'center' }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Typography textAlign={'center'} fontSize={'18px'} fontWeight={700}>
              {errorMessages[errorType]?.title}
            </Typography>
            <Typography textAlign={'center'} fontSize={'14px'} fontWeight={400}>
              {errorMessages[errorType]?.message}
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{}}>
            <Grid item xs={6}>
              <Button
                onClick={() => {
                  if(isWait){
                    handleDisable()
                  }
                  handleCloseModal()}}
                variant='outlined'
                sx={{ padding: '8px 12px', color: '#0B58A6', fontSize: '14px', textTransform: 'none', width: '100%' }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <input
                type='file'
                style={{ display: 'none' }}
                onChange={e => {
                  handleChange(e)
                }}
                ref={fileInputRef}
              />
              <Button
                onClick={() => {
                  if(isWait){
                    handleDisable()
                    handleCloseModal()

                    return
                  }
                  fileInputRef.current?.click()
                }}
                variant='contained'
                sx={{ padding: '8px 12px', color: '#FFFFFF', fontSize: '14px', textTransform: 'none', width: '100%' }}
              >
                Retry 
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default DialogResumeBuilder
