import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import {Button, Card, CardContent } from '@mui/material'
import { HttpClient } from 'src/services' 
import { useEffect, useState } from 'react'
import Alumni from 'src/contract/models/alumni'
import { Icon } from '@iconify/react'
import { toast } from 'react-hot-toast'
 
export type ParamMain = {
  name: string
  skill: string
  location: string
}

interface Props { 
  alumni: any
}
 
const ListAlumniLatter = (props: Props) => {
  const { alumni } = props  
  const onSelectFile2 = async (e: any) => {
    debugger;
    const json = {
      suratpenugasan: e.target.files[0]
    }
    try {
      console.log(json)
      const resp = await HttpClient.postFile('/alumni/'+alumni.id, json)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong create alumni!'
      } 
      toast.success(` Create Alumni successfully!`)
      window.location.reload()
    } catch (error) {
      toast.error(`Opps ${error}`)
    }
  }
  
  return (
    <Grid container marginTop={'10px'}>
      <Grid item xs={12}>
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
          <CardContent>
            <Grid item lg={12} md={12} xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ mr: 2 }}>
                  <Typography
                    align='left'
                    variant='body2'
                    sx={{ color: '#32487A', fontFamily: 'Outfit', fontWeight: '600', mb: 1 }}
                    fontSize={16}
                  >
                    Letter of Assignment
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', width: '90%', mb: 1, justifyContent: 'center' }} ml={5}>
                <Box mr={3}>
                  <Icon fontSize='large' icon={'vscode-icons:file-type-pdf2'} style={{ fontSize: '36px' }} />
                </Box>

                <Box flexGrow={1} display={'flex'} flexDirection={'column'} alignItems={'end'}>
                  <Button component='label'>
                    Change
                    <input
                      accept='application/pdf'
                      style={{ display: 'none', height: 50, width: '100%' }}
                      id='raised-button-file-2'
                      onChange={onSelectFile2}
                      type='file'
                    ></input>
                  </Button>
                </Box>
                <Box flexGrow={1} display={'flex'} flexDirection={'column'} alignItems={'end'} mt={1.5}>
                  <Button target='blank' href={alumni?.suratpenugasan} size='small'>
                    Open
                  </Button>
                </Box>
              </Box>
            </Grid>
            {/* <Box sx={{ mt: 3 }}>{renderList(listAlumni, idalumni, props, firstload)}</Box> */}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ListAlumniLatter