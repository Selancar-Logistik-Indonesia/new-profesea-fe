import { CircularProgress, Divider, Avatar, Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import { useState, useEffect } from 'react'
import ISocialFeed from 'src/contract/models/social_feed'
import ISocialFeedComment from 'src/contract/models/social_feed_comment'
import CommentResponseType from 'src/contract/types/comment_response_type'
import { useSocialFeed } from 'src/hooks/useSocialFeed'
import { getUserAvatar, toTitleCase } from 'src/utils/helpers'
import CommentForm from './CommentForm'
import SubCommentAreaView from './SubCommentAreaView'
import ButtonLike from './ButtonLike'
import Link from 'next/link'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import ButtonDelete from './ButtonDelete'

const CommentCard = (props: { comment: ISocialFeedComment; feedId: number }) => {
  const { comment, feedId } = props
  const [openReply, setOpenReply] = useState(false)
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  return (
    <Box key={comment.id} sx={{ display: 'flex', flexDirection: 'column', mt: 5 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box>
          <Avatar
            sx={{ width: 35, height: 35, mr: 3, mb: 3 }}
            src={getUserAvatar(comment.user)}
            alt='profile-picture'
          />
        </Box>
        <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
          <Link style={{ textDecoration: 'none' }} href={`/profile/${comment.user.username}`}>
            <Typography variant='body2' sx={{ color: '#0a66c2', fontWeight: 600 }}>
              {toTitleCase(comment.user.name)}
            </Typography>
            <Typography sx={{ color: '#262525', fontWeight: 400 }}>{comment.h_created_at}</Typography>
          </Link>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
        <Typography variant='body1' sx={{ color: '#262525', fontWeight: 400, margin: '5px' }}>
          {comment.content}
        </Typography>
      </Box>
      <Box>
        {user.team_id !== 1 && (
          <ButtonLike
            variant='no-icon'
            item={{ id: comment.id, liked_at: comment.liked_at, count_likes: comment.count_likes }}
            likeableType='comment'
          />
        )}
        <Button
          onClick={() => setOpenReply(!openReply)}
          sx={{ textTransform: 'none', fontSize: 11 }}
          variant='text'
          size='small'
        >
          {comment.count_replies > 0 && comment.count_replies} Reply
        </Button>
        {(user.team_id == 1 || user.id.toString() == comment.user_id.toString()) && (
          <ButtonDelete
            variant='no-icon'
            item={{ id: comment.id, feedId, count_likes: comment.count_likes, deleteComment: true }}
          />
        )}
      </Box>

      {openReply && <SubCommentAreaView key={comment.id} item={comment} />}
    </Box>
  )
}

const CommentAreaView = (props: { item: ISocialFeed }) => {
  const { item } = props
  const [onLoading, setOnLoading] = useState(true)
  const { getComments, commentSignature } = useSocialFeed()
  const [commentObj, setCommentObj] = useState<CommentResponseType>()
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  const loadComments = async () => {
    setOnLoading(true)
    const obj = await getComments(item.id, 1, 7, 'feed')
    setCommentObj(obj)
    setOnLoading(false)
  }

  useEffect(() => {
    loadComments()
  }, [commentSignature])

  return (
    <>
      {user.team_id !== 1 && <CommentForm feedId={item.id} replyable_type='feed' />}
      {/* <CommentForm feedId={item.id} replyable_type='feed' /> */}
      {onLoading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
          <CircularProgress />
        </Box>
      )}

      {!onLoading && commentObj?.data && commentObj?.data.length > 0 && (
        <Box>
          <Divider sx={{ mt: 3 }} />
          {commentObj?.data.map(comment => (
            <CommentCard key={comment.id} comment={comment} feedId={item.id} />
          ))}
        </Box>
      )}
    </>
  )
}

export default CommentAreaView
