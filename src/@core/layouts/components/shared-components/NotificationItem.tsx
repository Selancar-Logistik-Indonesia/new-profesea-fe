import { styled } from "@mui/material/styles";
import { NotificationsType } from "./NotificationDropdown";
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import { Box, TypographyProps, Typography, Dialog, DialogTitle, Button, CircularProgress } from "@mui/material";
import CustomAvatar from 'src/@core/components/mui/avatar'
import { CustomAvatarProps } from "src/@core/components/mui/avatar/types";
import { getInitials } from "src/@core/utils/get-initials";
import { useEffect, useState } from "react";
import NotificationType from "src/utils/notification_type";
import { getUserAvatar } from "src/utils/helpers";
import { IUser } from "src/contract/models/user";
import { HttpClient } from "src/services";

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)<TypographyProps>({
    flex: '1 1 100%',
    whiteSpace: 'break-spaces',
    fontSize: '11px'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
    fontWeight: 600,
    flex: '1 1 100%',
    overflow: 'hidden',
    fontSize: '0.875rem',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginBottom: theme.spacing(0.75)
}))

// ** Styled Avatar component
const Avatar = styled(CustomAvatar)<CustomAvatarProps>({
    width: 38,
    height: 38,
    fontSize: '1.125rem'
})

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`
    }
}))

const RenderAvatar = ({ notification }: { notification: NotificationsType }) => {
    const { avatarAlt, avatarImg, avatarIcon, avatarText, avatarColor } = notification

    if (avatarImg) {
        return <Avatar alt={avatarAlt} src={avatarImg} />
    } else if (avatarIcon) {
        return (
            <Avatar skin='light' color={avatarColor}>
                {avatarIcon}
            </Avatar>
        )
    } else {
        return (
            <Avatar skin='light' color={avatarColor}>
                {getInitials(avatarText as string)}
            </Avatar>
        )
    }
}

const FriendshipIssuingDialog = (props: { dialogOpen: boolean, setDialogOpen: (e: boolean) => void, item: NotificationsType }) => {
    const { dialogOpen, setDialogOpen, item } = props;
    const [friend, setFriend] = useState<IUser>(item.payload);
    const [onLoading, setOnLoading] = useState(true);

    const getUser = async () => {
        setOnLoading(true);
        try {
            const res = await HttpClient.get(`/user/${friend.id}`);
            if (res.status != 200) {
                return;
            }

            setFriend(res.data.user);
        } catch (error) { }
        setOnLoading(false);
    }

    const handleIssuing = async (type: 'AP' | 'RJ') => {
        const res = await HttpClient.post('/friendship/issuing-request', { "friend_id": friend.id, "type": type });
        if (res.status != 200) {
            alert(res.data?.message ?? "Unknow error!");

            return;
        }

        await getUser();
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <Dialog onClose={() => setDialogOpen(!dialogOpen)} open={dialogOpen}>
            <DialogTitle>Request Connect</DialogTitle>

            {onLoading && (
                <Box sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            )}

            {!onLoading && (
                <Box sx={{ width: 320, display: 'flex', flexDirection: 'row', p: 4 }}>
                    <Avatar src={getUserAvatar(friend)} sx={{ width: 50, height: 50, mr: 3, mb: 3 }} />
                    <Box pt={1} width={'100%'}>
                        <Typography variant="body1">{friend.name}</Typography>
                        <Typography variant="caption">{friend.email}</Typography>

                        <Box sx={{ mt: 3, textAlign: 'left' }}>
                            {friend.frienship_status == "WA" && (
                                <>
                                    <Button onClick={() => handleIssuing('AP')} disabled={onLoading} sx={{ mr: 2 }} variant="contained" size="small">Approve</Button>
                                    <Button onClick={() => handleIssuing('RJ')} disabled={onLoading} disableElevation={true} variant="contained" color="secondary" size="small">Reject</Button>
                                </>
                            )}

                            {friend.frienship_status == "AP" && (
                                <Button disabled={true} variant="text">Approved</Button>
                            )}

                            {friend.frienship_status == "RJ" && (
                                <Button disabled={true} variant="text">Rejected</Button>
                            )}
                        </Box>
                    </Box>
                </Box>
            )}
        </Dialog>
    )
}

const NotificationItem = (props: { item: NotificationsType }) => {
    const { item } = props;
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClick = () => {
        setDialogOpen(true);
    }

    return (
        <>
            <MenuItem key={item.id} onClick={() => handleClick()}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <RenderAvatar notification={item} />
                    <Box sx={{ mx: 4 }}>
                        <MenuItemTitle>{item.title}</MenuItemTitle>
                        <MenuItemSubtitle variant='body2'>{item.subtitle}</MenuItemSubtitle>
                    </Box>
                    <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                        {item.meta}
                    </Typography>
                </Box>
            </MenuItem>

            {dialogOpen && item.type == NotificationType.connectRequest && (
                <FriendshipIssuingDialog item={item} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
            )}
        </>
    )
}

export default NotificationItem;