import { Icon } from '@iconify/react'
import { Avatar, Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import { set } from 'nprogress'
import { use, useEffect, useState } from 'react'
import ISocialFeedComment from 'src/contract/models/social_feed_comment'
import { IUser } from 'src/contract/models/user'
import CommentResponseType from 'src/contract/types/comment_response_type'
import { useSocialFeed } from 'src/hooks/useSocialFeed'
import { HttpClient } from 'src/services'
import { getUserAvatar, timeCreated, toLinkCase, toTitleCase } from 'src/utils/helpers'

const CommentPreviewSection = ({
  comment,
  feedId,
  user
}: {
  comment: ISocialFeedComment
  feedId: number
  user: IUser
}) => {
  return (
    <>
      <CommentCard comment={comment} feedId={feedId} user={user} isSubComment={false} />
    </>
  )
}

const CommentCard = (props: { comment: ISocialFeedComment; feedId: number; user: IUser; isSubComment?: boolean }) => {
  const { comment, feedId, user, isSubComment } = props
  const [openReply, setOpenReply] = useState(false)

  return (
    <Box
      key={comment.id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        position: 'relative',
        '&:hover .delete-button': {
          display: 'inline-block'
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
        <Box sx={{ display: 'flex', gap: '8px' }}>
          <Avatar sx={{ width: 36, height: 36 }} src={getUserAvatar(user)} alt='profile-picture' />
        </Box>
        {/* comment lv1 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F8F8F7',
            padding: '12px',
            width: '100%',
            borderRadius: '4px'
          }}
        >
          <Typography variant='body2' sx={{ color: 'black', fontSize: 14, fontWeight: 700 }}>
            {toTitleCase(user.name)}
          </Typography>
          <Typography variant='body1' sx={{ color: 'black', fontWeight: 400, whiteSpace: 'pre-line' }}>
            {comment.content}
          </Typography>
          <Typography sx={{ color: '#949EA2', py: '9px', fontSize: 12, fontWeight: 400 }}>
            {timeCreated(comment.created_at, 'feed')}
          </Typography>
        </Box>
      </Box>
      {comment.count_replies !== 0 && !isSubComment && (
        <Grid container sx={{ ml: 10 }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
            onClick={() => setOpenReply(!openReply)}
          >
            <Icon icon={openReply === true ? 'mdi:chevron-up' : 'mdi:chevron-down'} fontSize={18} color='primary' />
            <Typography color='primary' sx={{ fontSize: 14, fontWeight: 700 }}>
              {comment.count_replies} replies
            </Typography>
          </Box>
        </Grid>
      )}
      {openReply && <SubCommentAreaView item={comment} feedId={feedId} />}
    </Box>
  )
}

const SubCommentAreaView = (props: { item: ISocialFeedComment; feedId: number }) => {
  const { item, feedId } = props
  const [onLoading, setOnLoading] = useState(true)
  const { getComments, subCommentSignature } = useSocialFeed()
  const [commentObj, setCommentObj] = useState<CommentResponseType>()

  const loadComments = async () => {
    setOnLoading(true)
    try {
      const response = await HttpClient.get(`/social-feed/comment/${item.id}`, {
        page: 1,
        take: 7,
        replyable_type: 'comment'
      })
      if (response.status != 200) {
        throw response.data?.message ?? 'Unknow reason'
      }
      setCommentObj(response.data.comments)
    } catch (error) {
        console.log(error)
    } finally {
      setOnLoading(false)
    }
  }

  useEffect(() => {
    loadComments()
  }, [subCommentSignature, item.id])

  return (
    <Box sx={{ ml: 5, mt: 1 }}>
      {commentObj?.data && commentObj?.data.length > 0 && (
        <Box mb={5} sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {commentObj?.data.reverse().map(comment => (
            <CommentCard key={comment.id} comment={comment} feedId={feedId} isSubComment={true} user={comment?.user} />
          ))}
        </Box>
      )}
      {onLoading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  )
}

export default CommentPreviewSection
