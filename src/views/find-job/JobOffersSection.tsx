import React, { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'

interface IJobOfferSectionProps {
  jobOffers: any[]
  user: any
}

const JobOffersSection = ({ jobOffers, user }: IJobOfferSectionProps) => {
  const [showAll, setShowAll] = useState(false)
  const router = useRouter()

  if (!jobOffers || jobOffers.length === 0) {
    return null
  }

  const displayedOffers = showAll ? jobOffers : jobOffers.slice(0, 1)
  const handleToggle = () => {
    setShowAll(prev => !prev)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '24px',
        background: '#FFF',
        borderRadius: '8px',
        boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08)',
        marginBottom: '12px'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#1F1F1F' }}>
          You have {jobOffers.length} Offers{' '}
          <span
            style={{
              background: '#F22',
              padding: '2px 4px',
              borderRadius: '100px',
              fontSize: '10px',
              color: '#FFF',
              marginLeft: '10px'
            }}
          >
            New
          </span>
        </Typography>
        {jobOffers.length >= 2 && (
          <Typography
            onClick={handleToggle}
            sx={{ fontSize: '12px', fontWeight: 400, color: '#868686', cursor: 'pointer' }}
          >
            {showAll ? 'Show Less' : 'Show More'}
          </Typography>
        )}
      </Box>

      {displayedOffers.map((offer, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            padding: '16px 24px',
            borderRadius: '8px',
            border: '1px solid var(--Primary-Blue-1, #32497A)',
            background: 'var(--Primary-Blue-7, #F2F8FE)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Icon icon={'ph:briefcase-light'} fontSize={'32px'} />
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#32497A' }}>
                {offer.company_name} is interested in you! Check out the job details and take the next step in your
                career.
              </Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#1F1F1F' }}>
                Hi {user?.name}, we’ve matched you with a new opportunity at {offer.company_name} for the{' '}
                {offer.job_title} role! Let’s chat about this exciting next step!
              </Typography>
            </Box>
            <Button
              variant='contained'
              sx={{ fontSize: '14px', fontWeight: 400, textTransform: 'capitalize', width: '166px', height: '40px' }}
              onClick={() =>
                router.push(
                  `/candidate/job/${offer.company_name.toLowerCase().split(' ').join('-')}/${
                    offer.job_id
                  }/${offer.job_title.toLowerCase().split(' ').join('-')}`
                )
              }
            >
              View Job Details
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default JobOffersSection
