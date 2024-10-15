import { Box, Typography } from '@mui/material'
import { format } from 'date-fns'
import React from 'react'
import IEducation from 'src/contract/models/education'

export interface IEducationInfoProps {
  educations: IEducation[]
}

const EducationInfo: React.FC<IEducationInfoProps> = ({ educations }) => {
  return (
    <Box sx={{ borderRadius: '16px', backgroundColor: '#FFFFFF', boxShadow: 3, overflow: 'hidden' }}>
      <Box sx={{ p: '24px' }}>
        <Typography sx={{ mb: '16px', color: 'black', fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize' }}>
          Education
        </Typography>
        {educations && educations.length > 0
          ? educations.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  borderBottom:
                    educations.length - 1 == index
                      ? ''
                      : '1px solid var(--light-action-disabled-background, rgba(76, 78, 100, 0.12))'
                }}
              >
                <img
                  alt='logo'
                  src={item?.logo ? item.logo : '/images/education.png'}
                  style={{
                    width: '100px',
                    height: '100px',
                    padding: 10,
                    margin: 0
                  }}
                />
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    flexWrap: 'wrap',
                    m: 2
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                      sx={{ color: 'rgba(45, 52, 54, 1)', fontWeight: 700, fontSize: '16px', lineHeight: '20px' }}
                    >
                      {`${item.title.charAt(0).toUpperCase() + item.title.slice(1)}`}
                    </Typography>
                    <Typography sx={{ color: '#868686', fontWeight: 400, fontSize: '14px', lineHeight: '21px' }}>
                      {item?.start_date && item?.end_date
                        ? format(new Date(item?.start_date), 'LLL yyyy') +
                          ' - ' +
                          format(new Date(item?.end_date), 'LLL yyyy')
                        : '-'}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ color: 'rgba(45, 52, 54, 1)', fontWeight: 400, fontSize: '14px', lineHeight: '21px' }}
                  >
                    {item.major.charAt(0).toUpperCase() + item.major.slice(1)}
                  </Typography>
                </Box>
              </Box>
            ))
          : null}
      </Box>
    </Box>
  )
}

export default EducationInfo
