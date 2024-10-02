// ** MUI Components
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'

import { Button } from '@mui/material'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import secureLocalStorage from 'react-secure-storage'
import { IUser } from 'src/contract/models/user'
import localStorageKeys from 'src/configs/localstorage_keys'

export type IData = {
  id: number
  user_id: number
  document_name: string
  document_number: string
  organization: string
  path: string
  issue_at: string
  expired_at: string
  created_at: string
  updated_at: string
  is_lifetime: any
}

// export type ProfileTeamsType = ProfileTabCommonType & { color: ThemeColor }
interface Props {
  userId: number
}

const Ceritificate = (props: Props) => {
  const { userId } = props
  const [data, setData] = useState<IData[]>([])

  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  const isDataHidden = userId == user?.id || user?.team_id === 3 ? false : true

  const loadData = () => {
    HttpClient.get(AppConfig.baseUrl + `/user/candidate-document/?user_id=${userId}`).then(response => {
      const itemData = response.data.documents

      setData(itemData)
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Box sx={{ borderRadius: '16px', backgroundColor: '#FFFFFF', boxShadow: 3, overflow: 'hidden' }}>
      <Box sx={{ p: '24px' }}>
        <Typography sx={{ mb: '10px', color: 'black', fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize' }}>
          Certificate
        </Typography>
        <Typography sx={{ mb: '10px', color: 'black', fontSize: 14, fontWeight: '400' }}>
          You Have <span style={{ color: 'rgba(50, 73, 122, 1)' }}>{data.length} Certificates</span>
        </Typography>
        {/* {renderList(vacancy)} */}
        {data && data.length > 0
          ? data.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  borderBottom:
                    data.length - 1 == index
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
                    sx={{ color: 'rgba(45, 52, 54, 1)', fontWeight: 700, fontSize: '16px', lineHeight: '20px' }}
                  >
                    {item?.document_name}
                  </Typography>
                  <Typography
                    sx={{ color: 'rgba(45, 52, 54, 1)', fontWeight: 400, fontSize: '14px', lineHeight: '21px' }}
                  >
                    {item?.organization}
                  </Typography>
                  <Typography
                    sx={{ color: 'rgba(45, 52, 54, 1)', fontWeight: 400, fontSize: '14px', lineHeight: '21px' }}
                  >
                    {item?.issue_at ? 'Issued date ' + format(new Date(item?.issue_at), 'LLL yyyy') : 'Issued date -'}
                  </Typography>
                  {!isDataHidden && (
                    <Button
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
                      variant='outlined'
                      color='primary'
                      size='medium'
                      href={process.env.NEXT_PUBLIC_BASE_URL + '/storage/' + item.path}
                      target='_blank'
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

export default Ceritificate
