import { Icon } from "@iconify/react";
import { Box, Button, Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";

const ButtonShare = (props: { feedPage: string }) => {
    const emails = ['Email', 'Whatsapp', 'Copy link'];
    const [openDialog, setOpenDialog] = useState(false);

    const copyLinkToClipboard = () => {
        navigator.clipboard.writeText(props.feedPage)
    }

    const shareToWhatsapp = () => {
        window.open(`https://web.whatsapp.com/send?text=${props.feedPage}`)
    }

    const shareToEmail = (subject: string, body: string) => {
        const emailLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(emailLink);
    }

    const handleShareButton = (title: string) => {
        if (title == 'Email') {
            return shareToEmail(`Share feed`, props.feedPage);
        }

        if (title == 'Whatsapp') {
            return shareToWhatsapp();
        }

        return copyLinkToClipboard();
    }

    return (
        <>
            <Button
                onClick={() => setOpenDialog(!openDialog)}
                sx={{ fontSize: '0.9rem', textTransform: 'none' }}
                size='small'
                color='primary'
                startIcon={<Icon icon='solar:share-linear' fontSize={10} />}
            >
                Share
            </Button>
            <Dialog onClose={() => setOpenDialog(!openDialog)} open={openDialog}>
                <DialogTitle>Share to</DialogTitle>
                <Box sx={{ width: 220, mx: 2 }}>
                    <List sx={{ pt: 0 }}>
                        {emails.map((title) => (
                            <ListItem key={title} disableGutters>
                                <ListItemButton onClick={() => handleShareButton(title)} key={title}>
                                    <ListItemText primary={title} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Dialog>
        </>
    );
}

export default ButtonShare;