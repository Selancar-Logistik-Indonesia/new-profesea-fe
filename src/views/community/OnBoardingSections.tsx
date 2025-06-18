import React, { useEffect, useState } from 'react'
import Joyride, { type CallBackProps, type Step, STATUS } from 'react-joyride'
import BannerOnboarding from './BannerOnboarding'
import { Box, Skeleton, Typography } from '@mui/material'
import CardGroupCommunity, { ICardGroupProps } from './CardGroupCommunity'
import Icon from 'src/@core/components/icon'
import { HttpClient } from 'src/services'

const OnBoardingSections = () => {
  const [runTour, setRunTour] = useState(false)
  const [steps, setSteps] = useState<Step[]>([])
  const [groups, setGroups] = useState<ICardGroupProps[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Define the tour steps
    const tourSteps: Step[] = [
      {
        target: '.banner-section',
        title: ' Welcome to the Profesea Community',
        content:
          "You haven't joined any groups yet — but that's about to change! Join groups to stay updated, share insights, and connect with fellow maritime professionals.",
        placement: 'bottom' as 'bottom',
        disableBeacon: true,
        spotlightClicks: false
      },
      {
        target: '.groups-section',
        title: 'Discover and Join Groups',
        content:
          'Scroll through recommended groups and topics. Click “Join group” to become a member and dive into discussions right away.',
        placement: 'top' as 'top'
      },
      {
        target: '.join-group-btn',
        content: (
          <Box sx={{ p: 1 }}>
            <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 1 }}>
              Join Groups
            </Typography>
            <Typography variant='body1' sx={{ mb: 2 }}>
              Click here to join a group and start engaging with the community.
            </Typography>
          </Box>
        ),
        placement: 'top'
      }
    ]

    setSteps(tourSteps)
    // Start the tour after a short delay
    const timer = setTimeout(() => {
      setRunTour(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const fetchGroups = async () => {
    setLoading(true)
    try {
      const response = await HttpClient.get('/community', {
        page: 1,
        take: 3
      })
      if (response.status == 200) {
        setGroups(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching groups:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRunTour(false)
    }
  }

  return (
    <Box>
      {/* Joyride Tour */}
      <Joyride
        steps={steps}
        run={runTour}
        continuous={true}
        showSkipButton={true}
        callback={handleJoyrideCallback}
        spotlightClicks={false}
        disableOverlayClose={true}
        tooltipComponent={({ step, primaryProps }) => (
          <Box
            sx={{
              py: '24px',
              px: '32px',
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: 3,
              width: 350,
              maxWidth: 400
            }}
          >
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 1, color: '#170F49' }}>{step.title}</Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#5E5E5E', mb: 2 }}>{step.content}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
              <button
                {...primaryProps}
                style={{
                  backgroundColor: '#32497A',
                  color: '#fff',
                  borderRadius: '4px',
                  border: 'none',
                  padding: '8px 16px'
                }}
              >
                Next
              </button>
            </Box>
          </Box>
        )}
        styles={{
          options: {
            primaryColor: '#2662EC',
            backgroundColor: '#ffffff',
            arrowColor: '#ffffff',
            textColor: '#333',
            zIndex: 10000
          },
          buttonBack: {
            color: '#2662EC'
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)'
          }
        }}
      />

      {/* Banner Section */}
      <Box className='banner-section' sx={{ mb: '24px' }}>
        <BannerOnboarding />
      </Box>
      <Box
        className='groups-section'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '22px',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08)',
          background: '#FFF'
        }}
      >
        <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#1F1F1F' }}>
          Groups you might be intersted in...
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: '15px' }}>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  width: 300,
                  height: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}
              >
                <Skeleton variant='rectangular' width='100%' height={120} />
                <Skeleton variant='text' width='80%' />
                <Skeleton variant='text' width='60%' />
              </Box>
            ))
          ) : groups.length > 0 ? (
            groups.map(group => (
              <CardGroupCommunity
                key={group.id}
                id={group.id}
                name={group.name}
                description={group.description}
                banner_url={group.banner_url}
                discussions_count={group.discussions_count}
                members_count={group.members_count}
              />
            ))
          ) : (
            <Typography sx={{ fontSize: '14px', color: '#999', textAlign: 'center' }}>No groups found</Typography>
          )}

          {groups.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  borderRadius: '200px',
                  background: 'rgba(10, 12, 15, 0.50)',
                  backdropFilter: 'blur(50px)',
                  cursor: 'pointer'
                }}
              >
                <Icon icon={'iconamoon:arrow-right-2-thin'} fontSize='18px' />
              </Box>

              <Typography sx={{ fontSize: '14px', fontWeight: 400, textAlign: 'center' }}>
                Discover More Group
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default OnBoardingSections
