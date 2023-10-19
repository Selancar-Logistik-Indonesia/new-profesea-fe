import Box from '@mui/material/Box'
import { Avatar, IconButton, TextField } from '@mui/material'
import { KeyboardEvent, useState } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import { getUserAvatar } from 'src/utils/helpers';
import { Icon } from '@iconify/react';
import UseBgColor from 'src/@core/hooks/useBgColor'; 
import { useGroupFeed } from 'src/hooks/useGroupFeed';

const CommentFormGroup = (props: { feedId: number, replyable_type: 'feed' | 'comment' }) => {
    const maxLineHeight = 3;
    const [textFieldHeight, setTextFieldHeight] = useState(1);
    const [content, setContent] = useState('');
    const [onLoading, setOnLoading] = useState(false);
    const { user } = useAuth();
    const bgColors = UseBgColor();
    const { postComment } = useGroupFeed();

    const handleSend = async () => {
        setOnLoading(true);
        try {
            await postComment(
                props.feedId,
                props.replyable_type,
                content,
            );

            setContent('');
            setTextFieldHeight(1);
        } catch (error) { }
        setOnLoading(false);
    }

    const handleEnter = (evt: KeyboardEvent) => {
        if (evt.key != "Enter") {
            return;
        }

        setTextFieldHeight((old) => {
            if (old >= maxLineHeight) {
                return old;
            }

            return old + 1;
        })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 3 }}>
            <Box sx={{ mr: 3 }}>
                <Avatar sx={{ height: 35, width: 35 }} src={getUserAvatar(user!)} />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <TextField
                    multiline
                    fullWidth
                    rows={textFieldHeight}
                    placeholder="Write a comment"
                    variant="standard"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleEnter}
                />
            </Box>
            <Box sx={{ ml: 3, alignSelf: 'end' }}>
                <IconButton onClick={handleSend} disabled={onLoading}>
                    <Icon color={bgColors.primaryLight.color} icon='ion:enter' />
                </IconButton>
            </Box>
        </Box>
    )
}

export default CommentFormGroup
