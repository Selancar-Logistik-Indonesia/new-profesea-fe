import { Icon } from '@iconify/react'
import { Avatar, Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import moment from 'moment'
import { IReportedRowData } from 'src/contract/models/report'
import { getUserAvatar, toTitleCase } from 'src/utils/helpers'
import ActionMenu from './ActionMenu'
import CommentPreviewSection from './CommentPreviewSection'
import ISocialFeedComment from 'src/contract/models/social_feed_comment'

const ContentPreviewDialog = ({
  row,
  open,
  onClose
}: {
  row: IReportedRowData
  open: boolean
  onClose: () => void
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth scroll='paper'>
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          justifyContent: 'center',
          borderBottom: '1px solid ##F8F8F7',
          boxShadow: '0px 2px 10px 0px #00000014',
          alignItems: 'center',
          padding:'16px 0px'
        }}
      >
        <Typography sx={{ fontSize: '16px !important', fontWeight: 700, color: '#303030', mx:'auto' }}>
          {row.community_name}
        </Typography>
        <IconButton onClick={onClose} sx={{height:'40px', width:'40px', position:'absolute', top:'9px', right:'16px'}}>
          <Icon icon='material-symbols:close' fontSize={24} />
        </IconButton>
      </Box>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Avatar alt='profile-picture' src={getUserAvatar(row.feed_data.user)} sx={{ width: 54, height: 54 }} />
              <Box>
                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>
                  {toTitleCase(row.postedBy)}
                </Typography>
                <Box sx={{ display: 'flex', gap: '12px', flexDirection:'row', alignItems:'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Icon color={'#949EA2'} icon='formkit:time' fontSize='16px' />
                    <Typography sx={{ fontSize: '12px', color: '#949EA2' }}>
                      {moment(row.feed_data.created_at).fromNow()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Icon color={'#949EA2'} icon={row.community_visibility ? 'ph:lock-key' : 'ph:globe-hemisphere-west'} fontSize='16px' />
                    <Typography sx={{ fontSize: '12px', color: '#949EA2' }}>
                      {(row.community_visibility ? 'Private' : 'Public')}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <ActionMenu row={row} />
          </Box>
          <Typography sx={{ fontSize: 14, fontWeight: 400, textAlign: 'justify', whiteSpace: 'pre-line' }}>
            {row.content}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', mt:4}}>
            {row.feed_data.comments?.map((comment: ISocialFeedComment) => (
                <CommentPreviewSection key={comment.id} comment={comment} feedId={row.feed_data.id} user={comment?.user} />
            ))}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ContentPreviewDialog
