import { Box, Button, Typography } from '@mui/material'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import { AppConfig } from 'src/configs/api'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'

export interface ISeafarerTravelDocumentProps {
  userId: number
}

const SeafarerTravelDocument: React.FC<ISeafarerTravelDocumentProps> = ({ userId }) => {
  const [travelDocument, setTravelDocument] = useState([])
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  const isDataHidden = userId == user?.id || user?.team_id === 3 ? false : true

  const loadTravelDocument = () => {
    HttpClient.get(AppConfig.baseUrl + '/seafarer-travel-documents/user-id/' + userId).then(response => {
      const result = response.data.data.map((item: any) => {
        return {
          ...item,
          country_issue: item.country?.name,
          date_of_issue: new Date(item.date_of_issue),
          valid_date_column: item.valid_date ? new Date(item?.valid_date) : 'lifetime'
        }
      })

      setTravelDocument(result)
    })
  }

  useEffect(() => {
    loadTravelDocument()
  }, [userId])

  return (
    <Box sx={{ borderRadius: '16px', backgroundColor: '#FFFFFF', boxShadow: 3, overflow: 'hidden' }}>
      <Box sx={{ p: '24px' }}>
        <Typography sx={{ mb: '20px', color: 'black', fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize' }}>
          Travel Document
        </Typography>
        {travelDocument && travelDocument.length > 0
          ? travelDocument.map((item: any, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  borderBottom:
                    travelDocument.length - 1 == index
                      ? ''
                      : '1px solid var(--light-action-disabled-background, rgba(76, 78, 100, 0.12))'
                }}
              >
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
                  <Typography
                    sx={{
                      color: 'rgba(45, 52, 54, 1)',
                      fontWeight: 700,
                      fontSize: '16px',
                      lineHeight: '20px',
                      textTransform: 'capitalize'
                    }}
                  >
                    {item?.document}
                  </Typography>

                  <Typography
                    sx={{ color: 'rgba(82, 82, 82, 1)', fontWeight: 400, fontSize: '14px', lineHeight: '21px' }}
                  >
                    {item?.is_lifetime
                      ? 'Valid Lifetime'
                      : item?.valid_date
                      ? 'Valid until ' + format(new Date(item?.valid_date), 'LLL yyyy')
                      : 'Valid until -'}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'rgba(45, 52, 54, 1)',
                      fontWeight: 700,
                      fontSize: '14px',
                      lineHeight: '17px',
                      textTransform: 'capitalize'
                    }}
                  >
                    Travel Document No.{' '}
                    <span style={{ fontWeight: 400 }}>{isDataHidden ? '***** ***** *****' : item?.no}</span>
                  </Typography>
                  {!isDataHidden && (
                    <Button
                      variant='outlined'
                      sx={{
                        width: { sm: '100%', md: '136px' },
                        height: '37px',
                        borderColor: 'rgba(50, 73, 122, 1) !important',
                        textTransform: 'capitalize',
                        fontWeight: 400,
                        fontSize: { sm: '14px', md: '11px' },
                        lineHeight: '21px',
                        color: 'rgba(50, 73, 122, 1) !important'
                      }}
                      onClick={() =>
                        window.open(
                          `${process.env.NEXT_PUBLIC_BASE_API}/public/data/travel-document/preview/${item?.id}`,
                          '_blank'
                        )
                      }
                    >
                      Show Credential
                    </Button>
                  )}
                </Box>
              </Box>
            ))
          : null}
      </Box>
    </Box>
  )
}

export default SeafarerTravelDocument
