import { Icon } from '@iconify/react'
import { Box, Divider, Grid, IconButton, LinearProgress, Menu, MenuItem, Typography } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import Training from 'src/contract/models/training'
import { calculateDaysDifference, dateProgress, getDateMonth } from 'src/utils/helpers'


type StatusProps = {
  icon: string
  iconColor: string
  bgColor: string
  total:number
  status:string
}

const TrainingCard = ({ role, trainingData }: { role?: string, trainingData:Training }) => {
  const [statusItems, setStatusItems] = useState<StatusProps[]>([
    {
      icon: 'ph:user-check',
      iconColor:'#32497A',
      bgColor:'#CBE2F9',
      total:99,
      status: role === 'superadmin' ?  'Registered Participant' : 'Registered'
    },
    {
      icon: 'material-symbols:pause-outline-rounded',
      iconColor:'#FE9602',
      bgColor:'#FCE9C8',
      total:99,
      status:'Onhold'
    },
    {
      icon: 'material-symbols:start',
      iconColor:'#7B61FF',
      bgColor:'#D7CBF9',
      total:99,
      status:'Ongoing'
    },
    {
      icon: 'mingcute:check-fill',
      iconColor:'#4CAF50',
      bgColor:'#F4FEF2',
      total:99,
      status:role === 'superadmin' ?   'Completed Training' : 'Completed'
    },
  ])


  return (
    <Box
      sx={{
        padding:'.4rem 1rem',
        backgroundColor:'#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        border: '1px solid #E7E7E7',
        borderRadius: '8px',
        boxShadow: '0px 2px 10px 0px #00000014',
        flex:1
      }}
    >
      {/* bagian atas */}
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        {/* gabmabr & title */}
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4.5, }}>
          <Box component='img' src={trainingData.thumbnail} alt='gambar test' sx={{objectFit:'cover', borderRadius:'7.7px', width:'117px', height:'120px'}} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#404040' }}>{trainingData?.title}</Typography>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 400,
                color: '#404040',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Icon icon={'material-symbols:anchor'} /> General
            </Typography>
            {role === 'superadmin' && <Typography>{trainingData.trainer.name}</Typography>}
          </Box>
        </Box>
        {/* switch & menu */}
        <MenuOption training={trainingData}/>
      </Box>
      {/* bagian tengah (status) */}
      <Grid
        container
        sx={{
          display: 'flex',
          flexWrap: 1,
          justifyContent: 'space-between',
          borderRadius: '6px',
          backgroundColor: '#F8F8F7'
        }}
      >
        {statusItems.map((item, i) => {
          if(role === 'superadmin' && (i === 1 || i === 2)){

            return <></>
          }

          if(i === 3){

            return <StatusCard key={i} item={item}/>
          }

          return (
            <>
              <StatusCard key={i} item={item}/>
              <Divider sx={{ borderWidth: '1px', bgcolor: '#E7E7E7' }} />
            </>
          )
        })}
        
      </Grid>
      {/* bagian bawah (booking schema) */}
      <BookingSchemaSection schema={trainingData.booking_scheme} training={trainingData}/>
    </Box>
  )
}

const MenuOption = ({training} : {training: Training}) => {
  const [status, setStatus] = useState<boolean>(training.is_active as boolean)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center',position:'relative' }}>
      <Box
        onClick={() => setStatus(!status)}
        sx={{
          position: 'relative',
          width: '84px',
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          pl: status ? '16px' : '22px',
          backgroundColor: status ? '#4CAF50' : '#868686',
          borderRadius: '100px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease, padding 0.5s ease',
          top:-45
        }}
      >
        <Typography
          sx={{
            color: '#FFF',
            userSelect: 'none',
            fontSize: 14,
            fontWeight: '400'
          }}
        >
          {status ? 'Active' : 'Inactive'}
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: '#FFF',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            top: '4px',
            left: status ? 'calc(100% - 18px)' : '4px',
            transition: 'left 0.5s ease-in-out'
          }}
        />
      </Box>
      <IconButton onClick={handleOpen} sx={{top:-45, position:'relative'}}>
        <Icon icon='tabler:dots' fontSize={24} color='#868686' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem component={Link} href={`#`} sx={{ color: '#428FDC' }}>
          <Icon icon='tabler:eye-filled' fontSize={20} style={{ marginRight: 8 }} />
          View Training Detail
        </MenuItem>
        <MenuItem component={Link} href={`#`} sx={{ color: '#404040' }}>
          <Icon icon='tabler:edit' fontSize={20} style={{ marginRight: 8 }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose()
          }}
          sx={{ color: '#FF2222' }}
        >
          <Icon icon='tabler:trash' fontSize={20} style={{ marginRight: 8 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  )
}

const StatusCard = ({item} : {item : StatusProps}) => {
  return (
    <Box sx={{ p: '16px 18px', display: 'flex', flexDirection: 'column', gap: '12px', flex:1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}>
        <Box
          sx={{
            width: 'fit-content',
            backgroundColor: item.bgColor,
            borderRadius: '4px',
            p: '6px',
            height: '28px',
            aspectRatio: 1 / 1
          }}
        >
          <Icon icon={item.icon} color={item.iconColor} fontSize={16} />
        </Box>
        <Link href='#'>
          <Icon icon={'ph:arrow-right'} color={'#000'} fontSize={16} />
        </Link>
      </Box>
      <Box flexDirection='column'>
        <Typography sx={{ fontSize: 20, fontWeight: 700 }}>{item.total}</Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 400 }}>{item.status}</Typography>
      </Box>
    </Box>
  )
}

const BookingSchemaSection = ({schema, training} : {schema: string, training?: Training}) => {

  const participantPercentage = ((training?.count_participant as number) / (training?.participants as number)) * 100

  const currentDate =  Date.now()
  const startDate = new Date(training?.start_date as string)
  const endDate = new Date(training?.end_date as string)
  const daysLeft = calculateDaysDifference(currentDate, endDate)

  return(
    <Box sx={{display:'flex', flexDirection:'column', gap:2, padding:'1rem'}}>
      {schema === 'instant_access' && (
        <>
          <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:2}}>
            <Icon icon={'material-symbols:rocket'} color='#4CAF50' fontSize={22}/>
            <Typography sx={{fontSize:14, fontWeight:700, color:'#4CAF50'}}>
              Instant Access
            </Typography>
          </Box>
          <Typography sx={{fontSize:12, fontWeigth:400, color:'#1F1F1F'}}>Participant can start anytime without waiting for a schedule or quota.</Typography>
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
            {daysLeft} to go
          </Typography>
          </Box>
          <LinearProgress variant="determinate" value={dateProgress(startDate, endDate) as number}/>
        </>
      )}

    </Box>
  )
}

export default TrainingCard
