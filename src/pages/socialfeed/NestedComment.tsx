// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Button, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'

import Icon from 'src/@core/components/icon'
import { styled } from '@mui/material/styles'
import CommentForm from './CommentForm'
import { useState } from 'react'

export type ParamMain = {
    logo: string
    name: string
    waktu: string
    postcomment: string
}
const ProfilePicture = styled('img')(({ theme }) => ({
    width: 45,
    height: 45,
    borderRadius: theme.shape.borderRadius,
    border: `5px solid ${theme.palette.common.white}`,
    [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(4)
    }
}))

interface Props {
    paramcomment: ParamMain[]
}

function CommentActions({
    commentId, replycount
}: {
    commentId: string;
    replycount: string;
}) {
    const [replying, setreplying] = useState(false);

    return (
        <>
            <Button size='small' color='primary' startIcon={<Icon icon='mdi:comment-outline' fontSize={10} />} onClick={() => setreplying(!replying)}>{replycount} Comment</Button>
            {replying && <CommentForm parentId={commentId} />}
        </>
    )
}

const renderList = (arr: ParamMain[]) => {
    let itemCount = 0;
    let appendComponent: any;

    if (arr && arr.length) {
        return arr.map((item, index) => {
            itemCount++;
            appendComponent = <></>;
            if (itemCount > 3) {
                itemCount = 1;

                appendComponent = (
                    <Paper sx={{ marginTop: '10px', padding: '10px', textAlign: 'center' }} key={index}>
                        <Box component='img' src={'/images/backgrounds/samplead.jpg'} sx={{ opacity: 0.2 }} />
                    </Paper>
                );
            }

            return (
                <>
                    {appendComponent}
                    <Paper sx={{ marginTop: '10px', padding: '10px' }} key={index}>
                        <Box sx={{ display: 'flex', '& svg': { color: 'text.secondary' } }}>
                            <Box>
                                <ProfilePicture src='/images/avatars/1.png' alt='profile-picture' />
                            </Box>
                            <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
                                <Typography variant='body2' sx={{ color: "#424242", fontWeight: 600, textTransform: 'uppercase' }}>
                                    {`${item.name.charAt(0).toUpperCase() + item.name.slice(1)}`}
                                </Typography>
                                <Typography sx={{ color: "#424242", fontWeight: 500 }}>
                                    {`${item.waktu.charAt(0).toUpperCase() + item.waktu.slice(1)}`}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                            <Typography variant="body1" sx={{ color: "#424242", fontWeight: 400, margin: "5px" }}>
                                {`${item.postcomment.charAt(0).toUpperCase() + item.postcomment.slice(1)}`}
                            </Typography>
                        </Box>
                        <Box >
                            <Button size='small' color='primary' startIcon={<Icon icon='ic:round-repeat' fontSize={10} />}> Repost</Button>
                            <Button size='small' color='primary' startIcon={<Icon icon='solar:share-linear' fontSize={10} />} > Share</Button>
                            <Button size='small' color='primary' startIcon={<Icon icon='mdi:like-outline' fontSize={10} />} > Like</Button>
                            <CommentActions commentId='1' replycount='1' />
                        </Box>
                    </Paper>
                </>
            )
        })
    } else {
        return null
    }
}

const NestedComment = (props: Props) => {
    const { paramcomment } = props

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Box>
                    {renderList(paramcomment)}
                </Box>
            </Grid>

        </Grid>
    )
}

export default NestedComment
