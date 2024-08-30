// import Grid from '@mui/material/Grid'
// import Typography from '@mui/material/Typography'
// import { Avatar, Box, Button, Paper, useMediaQuery, useTheme } from '@mui/material'
import { IUser } from 'src/contract/models/user'
// import { Icon } from '@iconify/react'

import { Box } from '@mui/material'

// import Link from 'next/link'
// import { toLinkCase } from 'src/utils/helpers'
// import { calculateAge, getMonthYear } from 'src/utils/helpers'

interface Props {
  listCandidate: IUser[]
}

// const handleChatWhatsapp = (phone: string) => {
//   if (!phone) return

//   const formattedPhone = phone.startsWith('0') ? phone.replace(/^0/, '+62') : `+62${phone}`
//   const whatsappUrl = `https://wa.me/${formattedPhone}`

//   window.open(whatsappUrl, '_blank')
// }

// const BoxedText = ({ children }: { children: string }) => {
//   if (!children) return null

//   return (
//     <Box
//       sx={{
//         border: '1px solid #32497A',
//         backgroundColor: '#F1F6FF',
//         color: 'primary.main',
//         borderRadius: '4px',
//         py: '2.5px',
//         px: '8px',
//         fontSize: 14,
//         fontWeight: 400,
//         whiteSpace: 'nowrap'
//       }}
//     >
//       {children}
//     </Box>
//   )
// }

// const renderList = (listCandidate: IUser[], isXs: boolean) => {
//   if (!listCandidate || listCandidate.length == 0) {
//     return
//   }

//   return listCandidate?.map(item => {
//     const type = item.employee_type
//     const userPhoto = item.photo ?? '/images/avatars/default-user-new.png'

//     return (
//       <Grid item xs={12} key={item.id}>
//         <Link href={`/profile/${item.id}/${toLinkCase(item.username)}`} target='_blank'>
//           <Paper
//             sx={{
//               marginTop: '24px',
//               border: '1px solid #DDDDDD',
//               borderRadius: '8px',
//               padding: isXs ? '12px' : '24px',
//               '&:hover': {
//                 border: '1px solid #32497A'
//               }
//             }}
//             elevation={0}
//           >
//             <Box sx={{ display: 'flex', alignContent: 'flex-start', gap: '12px' }}>
//               <Avatar src={userPhoto} alt='profile-picture' sx={{ width: isXs ? 64 : 76, height: isXs ? 64 : 76 }} />
//               <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', gap: '4px' }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
//                     <Typography sx={{ color: 'primary.main', fontSize: 16, fontWeight: 'bold' }}>
//                       {item.name}
//                     </Typography>
//                     {item.date_of_birth !== null && (
//                       <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
//                         {calculateAge(item.date_of_birth)} years old
//                       </Typography>
//                     )}
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'nowrap', gap: '16px' }}>
//                     {!isXs && (
//                       <Button
//                         disabled={true}
//                         variant='contained'
//                         onClick={() => handleChatWhatsapp(item.phone)}
//                         sx={{ height: '34px', textTransform: 'none', fontSize: 14 }}
//                         startIcon={<Icon icon='ph:whatsapp-logo' />}
//                       >
//                         Message
//                       </Button>
//                     )}
//                     {/* {isXs ? (
//                   <IconButton>
//                     <Icon icon='ph:bookmark-simple' />
//                   </IconButton>
//                 ) : (
//                   <Button
//                     variant='outlined'
//                     startIcon={<Icon icon='ph:bookmark-simple' />}
//                     sx={{ height: '34px', textTransform: 'none', fontSize: 14 }}
//                   >
//                     Save
//                   </Button>
//                 )} */}
//                   </Box>
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                   {!isXs && (
//                     <Typography sx={{ color: '#949EA2', fontSize: 14, fontWeight: 400 }}>Preference:</Typography>
//                   )}
//                   {type === 'onship' ? (
//                     <>
//                       <Typography
//                         sx={{ fontSize: 14, fontWeight: 400 }}
//                       >{`(${item.field_preference?.role_type?.name})`}</Typography>
//                       <Icon icon='ion:ellipse' fontSize={6} style={{ color: '#949EA2' }} />
//                       <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
//                         {item.field_preference?.vessel_type.name}
//                       </Typography>
//                     </>
//                   ) : (
//                     <Typography sx={{ fontSize: 14 }}>{`${item.field_preference?.job_category?.name}`}</Typography>
//                   )}
//                 </Box>
//                 <Typography
//                   sx={{ color: '#949EA2', fontSize: 14, fontWeight: 400 }}
//                 >{`${item.address?.city?.city_name}, ${item.address?.country?.nicename}`}</Typography>
//               </Box>
//             </Box>
//             <Box sx={{ mt: '16px' }}>
//               {item.last_company && (
//                 <Box
//                   sx={{
//                     mb: '16px',
//                     display: 'flex',
//                     flexDirection: isXs ? 'column' : 'row',
//                     alignItems: 'start'
//                   }}
//                 >
//                   <Typography sx={{ width: '150px', fontSize: 16, fontWeight: 'bold', mb: isXs ? '4px' : 0 }}>
//                     Last Experience
//                   </Typography>
//                   <Box
//                     sx={{
//                       display: 'flex',
//                       flexDirection: isXs ? 'column' : 'row',
//                       alignItems: isXs ? 'start' : 'center',
//                       gap: 1.5
//                     }}
//                   >
//                     <BoxedText>{item.last_company.position}</BoxedText>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                       <Typography
//                         sx={{
//                           flexShrink: 1,
//                           fontSize: 14,
//                           fontWeight: 'bold',
//                           overflow: 'hidden',
//                           textOverflow: 'ellipsis',
//                           whiteSpace: 'nowrap'
//                         }}
//                       >
//                         at {item.last_company.institution}
//                       </Typography>
//                       <Icon icon='ion:ellipse' fontSize={6} style={{ color: '#949EA2' }} />
//                       <Typography
//                         sx={{ flexShrink: 0, color: '#949EA2', fontSize: 14, fontWeight: 400 }}
//                       >{`${getMonthYear(item.last_company.start_date, true)} - ${
//                         item.last_company.end_date ? getMonthYear(item.last_company.end_date, true) : 'Present'
//                       }`}</Typography>
//                     </Box>
//                   </Box>
//                 </Box>
//               )}
//               {item.last_education && (
//                 <Box
//                   sx={{
//                     mb: '16px',
//                     display: 'flex',
//                     flexDirection: isXs ? 'column' : 'row',
//                     alignItems: 'start'
//                   }}
//                 >
//                   <Typography sx={{ width: '150px', fontSize: 16, fontWeight: 'bold', mb: isXs ? '4px' : 0 }}>
//                     Education
//                   </Typography>
//                   <Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                       <Typography
//                         sx={{
//                           flexShrink: 1,
//                           fontSize: 14,
//                           fontWeight: 'bold',
//                           overflow: 'hidden',
//                           textOverflow: 'ellipsis',
//                           whiteSpace: 'nowrap'
//                         }}
//                       >
//                         {item.last_education.title}
//                       </Typography>
//                       <Icon icon='ion:ellipse' fontSize={6} style={{ color: '#949EA2' }} />
//                       <Typography
//                         sx={{ flexShrink: 0, color: '#949EA2', fontSize: 14, fontWeight: 400 }}
//                       >{`${getMonthYear(item.last_education.start_date, true)} - ${
//                         item.last_education.end_date ? getMonthYear(item.last_education.end_date, true) : 'Present'
//                       }`}</Typography>
//                     </Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: '4px' }}>
//                       <BoxedText>{item.last_education.major}</BoxedText>
//                       <Typography
//                         sx={{
//                           fontSize: 14,
//                           fontWeight: 400,
//                           overflow: 'hidden',
//                           textOverflow: 'ellipsis',
//                           whiteSpace: 'nowrap',
//                           flexShrink: 1
//                         }}
//                       >
//                         {item.last_education.degree}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </Box>
//               )}
//               {isXs && (
//                 <Button
//                   disabled={true}
//                   variant='contained'
//                   startIcon={<Icon icon='ph:whatsapp-logo' />}
//                   onClick={() => handleChatWhatsapp(item.phone)}
//                   sx={{ width: '100%', textTransform: 'none', fontSize: 14 }}
//                 >
//                   Message
//                 </Button>
//               )}
//             </Box>
//           </Paper>
//         </Link>
//       </Grid>
//     )
//   })
// }

// const RecomendedView = (props: Props) => {
//   const { listCandidate } = props
//   const theme = useTheme()
//   const isXs = useMediaQuery(theme.breakpoints.down('md'))

//   return <Grid container>{renderList(listCandidate, isXs)}</Grid>
// }

// export default RecomendedView

const RecomendedView = (props: Props) => {
  console.log(props.listCandidate)

  return <Box>Find Candidate</Box>
}

export default RecomendedView
