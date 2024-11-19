import { Icon } from '@iconify/react'
import { Box, Button, Dialog, DialogContent, Fade, FadeProps, Grid, IconButton, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { forwardRef, ReactElement, Ref, useEffect, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'

type Prop = {
  openDialog: boolean
  setOpenDialog: (value: boolean) => void
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const CompleteOnboarding = (props: Prop) => {
  const router = useRouter()
  const { user } = useAuth()
  const { openDialog, setOpenDialog } = props
  const [employeeType, setEmployeeType] = useState<string | null>(null)

  const handleCloseDialog = () => {
    const { onboarding, ...rest } = router.query
    router.replace(
      {
        pathname: router.pathname,
        query: rest
      },
      undefined,
      { shallow: true }
    )
    setOpenDialog(false)
  }
  useEffect(() => {
    if (user) {
      if (user.team_id === 3) {
        setEmployeeType('employer')
      } else if (user.team_id === 2) {
        if (user.employee_type === 'onship') {
          setEmployeeType('seafarer')
        } else if (user.employee_type === 'offship') {
          setEmployeeType('professional')
        }
      }
    }
  }, [user])

  return (
    <Dialog
      fullWidth
      open={openDialog}
      onClose={() => handleCloseDialog()}
      TransitionComponent={Transition}
      maxWidth='md'
    >
      <DialogContent>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: "url('/images/complete-onboard.png')",
            backgroundSize: '100%',
            backgroundPosition: 'center',
            zIndex: 0,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              zIndex: 1
            }
          }}
        />

        <Grid
          container
          sx={{
            position: 'relative',
            p: '32px 41px !important',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <IconButton size='small' onClick={() => handleCloseDialog()} sx={{ position: 'absolute', right: 0, top: 0 }}>
            <Icon icon='mdi:close' color='white' fontSize={32} />
          </IconButton>
          <Box display='flex' flexDirection='column' gap='24px'>
            <Typography sx={{ color: '#FAFAFA', fontSize: 40, fontWeight: 700 }}>Yay! 🎉 You're all set!</Typography>
            <Box display='flex' flexDirection='column' gap='16px'>
              <Typography sx={{ color: '#FFF', fontSize: 20, fontWeight: 700 }}>
                Welcome on board, {user?.name}!
              </Typography>
              {employeeType === 'employer' ? (
                <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                  You've successfully completed the onboarding process. Now, it's time to get Noticed by candidates!
                  <br />
                  Complete your profile to improve your chances of landing the right candidates. Here's what you need to
                  fill in:
                </Typography>
              ) : (
                <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                  You've successfully completed the onboarding process. Now, it's time to get Noticed by employers!
                  <br />
                  Complete your profile to improve your chances of landing the right job opportunities. Here's what you
                  need to fill in:
                </Typography>
              )}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {employeeType === 'employer' ? (
              user?.photo === null && (
                <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                  • <b>Profile Picture</b>: Help candidates put a face to your name.
                </Typography>
              )
            ) : (
              <>
                {user?.photo === null && (
                  <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                    • <b>Profile Picture</b>: Help employers put a face to your name.
                  </Typography>
                )}
                <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                  • <b>Education</b>: Showcase your academic background.
                </Typography>
              </>
            )}
            {employeeType === 'seafarer' && (
              <>
                {user?.no_experience === true && (
                  <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                    • <b>Sea Experience</b>: Share your maritime journey and roles.
                  </Typography>
                )}
                <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                  • <b>Upload Sea Book</b>: Verify your sea service history.
                </Typography>
              </>
            )}
            {employeeType === 'professional' && user?.no_experience === true && (
              <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                • <b>Experience</b>: Share your journey and experience.
              </Typography>
            )}
            {employeeType === 'employer' ? (
              <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                • <b>Upload Document</b>: Highlight your qualifications and credentials.
              </Typography>
            ) : (
              <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                • <b>Upload Certificates</b>: Highlight your qualifications and credentials.
              </Typography>
            )}
          </Box>
          <Typography sx={{ color: '#FFF', fontSize: 18, fontWeight: 700 }}>
            The more you complete, the better your profile will stand out!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '24px' }}>
            <Box sx={{ cursor: 'pointer' }} onClick={() => setOpenDialog(false)}>
              <Typography
                sx={{ color: '#FAFAFA', fontSize: 14, fontWeight: 700, '&:hover': { textDecoration: 'underline' } }}
              >
                Skip
              </Typography>
            </Box>
            <Button
              component={Link}
              href={employeeType === 'employer' ? '/company' : '/candidate'}
              variant='contained'
              sx={{
                width: 'fit-content',
                boxShadow: 0,
                color: '#FFF',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#BFBFBF' }
              }}
            >
              Complete Profile
            </Button>
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default CompleteOnboarding
