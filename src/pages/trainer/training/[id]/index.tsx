import { Icon } from '@iconify/react'
import { Box, Breadcrumbs, Button, Grid, LinearProgress, Link, Typography } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdNavigateNext } from 'react-icons/md'
import Training from 'src/contract/models/training'
import { HttpClient } from 'src/services'
import { calculateDaysDifference, dateProgress, formatIDR, formatUSD, getDateMonth } from 'src/utils/helpers'
import TrainingDetailsSkeleton from 'src/views/training-management/TrainingDetailsSkeleton'

const TrainingDetail = () => {
  const params = useSearchParams()
  const trainingId = params.get('id')

  const [training, setTraining] = useState<Training>()
  const [loading, setLoading] = useState<boolean>(false)

  const onLoad = async () => {
    try {
      setLoading(true)
      const res = await HttpClient.get(`/training/${trainingId}`)
      setTraining(res.data.training)

    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <Box>
      {/* breadcrumbs */}
      <Box sx={{mb:4}}>
        <Breadcrumbs separator={<MdNavigateNext fontSize={'17px'} color='black' />} aria-label='breadcrumb'>
          <Link key='1' href='/' sx={{ textDecoration: 'none' }}>
            <Typography
              sx={{
                color: '#32497A',
                fontSize: '14px',
                fontWeight: 400
              }}
            >
              Homepage
            </Typography>
          </Link>
          <Link key='2' href='/trainer/training-management' sx={{ textDecoration: 'none' }}>
            <Typography
              sx={{
                color: '#32497A',
                fontSize: '14px',
                fontWeight: 400
              }}
            >
              Training Management
            </Typography>
          </Link>
          <Typography
            key='3'
            sx={{
              color: '#949EA2',
              fontSize: '14px',
              fontWeight: 400,
              cursor: 'pointer'
            }}
          >
            Detail Training
          </Typography>
        </Breadcrumbs>
      </Box>
      {/* content */}
      {loading ? (<TrainingDetailsSkeleton/>) : (
        <Grid container>
        {/* main detail */}
        <Grid item xs={9} spacing={2}>
            <Box sx={{display:'flex', flexDirection:'column', gap:'24px', mr:4}} >
                <Box component={'img'} src={training?.thumbnail} sx={{objectFit:'cover', width:'100%', height:'444px', borderRadius:'12px'}}/>
                
                <Box sx={{backgroundColor:'#FFFFFF', padding:'1.95rem', boxShadow: '0px 2px 10px 0px #00000014', borderRadius:'12px', display:'flex', flexDirection:'column', gap:4}}>
                    <Box sx={{display:'flex', flexDirection:'column', gap:4}}>
                        <Typography sx={{fontSize:24, fontWeight:700, color:'#1F1F1F'}}>{training?.title}</Typography>
                        <Box sx={{border:'1px solid #525252', width:'fit-content', padding:'8px', borderRadius:'8px'}}>
                            <Typography sx={{fontSize:12, fontWeight:400, color:'#525252'}}>{training?.category.category}</Typography>
                        </Box>
                        <Typography sx={{fontSize:20, fontWeight:700, color:'#32497A'}}>{training?.currency === 'IDR' ?  formatIDR(training?.price as number, true) : formatUSD(training?.price as number, true)}</Typography>
                        <BookingSchemaSection schema={training?.booking_scheme as string} training={training}/>
                    </Box>

                    <Box>
                        {training?.short_description ? (
                            <Box sx={{display:'flex', flexDirection:'column', gap:2}}>
                                <Typography sx={{fontSize:16, fontWeight:700, color:'#32497A'}}>Description</Typography>
                                <Typography sx={{fontSize:14, fontWeight:400, color:'#303030', mb:4}} dangerouslySetInnerHTML={{ __html: training.short_description }}/>
                            </Box>
                        ) : ''}
                        {training?.requirements ? (
                            <Box sx={{display:'flex', flexDirection:'column', gap:2}}>
                                <Typography sx={{fontSize:16, fontWeight:700, color:'#32497A'}}>Requirements</Typography>
                                <Typography sx={{fontSize:14, fontWeight:400, color:'#303030'}} dangerouslySetInnerHTML={{ __html: training.requirements }}/>
                            </Box>
                        ) : ''}
                    </Box>
                </Box>
            </Box>
        </Grid>
        {/* action */}
        <Grid item xs={3} sx={{position:'fixed', right:'150px'}}>
            <Box sx={{display:'flex', flexDirection:'column',backgroundColor:'#FFFFFF', boxShadow: '0px 2px 10px 0px #00000014', borderRadius:'8px', padding:'1.45rem', gap:2}}>
                <Typography sx={{fontSize:16, fontWeight:700, color:'#1F1F1F'}}>Manage Training Details</Typography>
                <Link href={`/trainer/training-management/${training?.id}`}><Button variant='contained' size='small' sx={{textTransform:'none', fontSize:14,fontWeight:400,width:'100%', display:'flex', flexDirection:'row', alignItems:'center', gap:2}}>View Participant List <Icon icon={'ph:arrow-right-bold'} fontSize={16}/></Button></Link>
                <Link href={`/trainer/training-management/edit-training?id=${training?.id}`} ><Button variant='outlined' size='small' sx={{textTransform:'none', fontSize:14, width:'100%'}}>Edit</Button></Link>
            </Box>
        </Grid>
      </Grid>
      )}
    </Box>
  )
}


const BookingSchemaSection = ({schema, training} : {schema: string, training?: Training}) => {

    const participantPercentage = ( (training?.count_participant as number)) / (training?.participants as number) * 100
  
    const currentDate =  Date.now()
    const startDate = new Date(training?.start_date as string)
    const endDate = new Date(training?.end_date as string)
    const daysLeft = calculateDaysDifference(currentDate, endDate)
  
    return(
      <Box sx={{display:'flex', flexDirection:'column', gap:2}}>
        {schema === 'instant_access' && (
          <>
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:2}}>
              <Icon icon={'material-symbols:rocket'} color='#4CAF50' fontSize={22}/>
              <Typography sx={{fontSize:14, fontWeight:700, color:'#4CAF50'}}>
                Instant Access
              </Typography>
            </Box>
          </>
        )}
  
        {schema === 'quota_based' && (
          <>
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', mt:3}}>
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:2}}>
              <Icon icon={'mdi:users'} color='#FF9800' fontSize={22}/>
              <Typography sx={{fontSize:14, fontWeight:700, color:'#FF9800'}}>
                Quota Based
              </Typography>
            </Box>
            <Typography sx={{fontSize:12, fontWeight:700, color:'#404040'}}>
             {training?.count_participant}/{training?.participants} quotas filled
            </Typography>
            </Box>
            <LinearProgress variant="determinate" value={participantPercentage}/>
          </>
        )}
  
        {schema === 'fixed_date' && (
          <>
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', mt:3}}>
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:2}}>
              <Icon icon={'ph:calendar-dots'} color='#2662EC' fontSize={22}/>
              <Typography sx={{fontSize:14, fontWeight:700, color:'#2662EC'}}>
                Fixed Date
              </Typography>
              <Typography sx={{fontSize:14, fontWeight:400, color:'#525252'}}>
                Start at {getDateMonth(startDate, true, false)} - Close at {getDateMonth(endDate, true, false)}
              </Typography>
            </Box>
            <Typography sx={{fontSize:12, fontWeight:700, color:'#404040'}}>
              {daysLeft} {daysLeft == 'Expired' ? '' : 'to go'}
            </Typography>
            </Box>
            <LinearProgress variant="determinate" value={dateProgress(startDate, endDate) as number}/>
          </>
        )}
  
      </Box>
    )
  }

TrainingDetail.acl = {
  action: 'read',
  subject: 'user-training-management'
}

export default TrainingDetail
