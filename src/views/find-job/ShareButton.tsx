import { Icon } from "@iconify/react"
import { Box, Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Typography } from "@mui/material"
import React from "react"
import Job from "src/contract/models/job"
import CopyLinkButton from "src/pages/candidate/job/coplink"
import EmailShareButton from "src/pages/candidate/job/emailshare"

type Props = {
    url: string,
    anchorRef: React.RefObject<HTMLDivElement>,
    handleToggle: () => void,
    selectedIndex: number,
    open: boolean,
    handleClose: (event: Event) => void,
    handleMenuItemClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => void,
    jobDetail?: Job,
};

const ShareButton = (props: Props) => {
    const {
        url, handleToggle, anchorRef, selectedIndex,
        jobDetail, open, handleClose, handleMenuItemClick
    } = props;
    const options = ['Whatsapp', 'Email', 'Link'];

    const buildButtonItem = () => {
        if (options[selectedIndex] == 'Link') {
            return <CopyLinkButton linkToCopy={url} />;
        }

        if (options[selectedIndex] == 'Whatsapp') {
            return (
                <Typography sx={{ color: 'text.primary' }} ml='0.5rem' fontSize={12}>
                    <Button
                        variant='contained'
                        color='secondary'
                        href={'https://web.whatsapp.com/send?text=' + url}
                        target='_blank'
                    >
                        <Box mr={2}>
                            <Icon icon='mdi:share' />
                        </Box>
                        {options[selectedIndex]}
                    </Button>
                </Typography>
            )
        }

        return (
            <EmailShareButton
                subject={'Job For ' + jobDetail?.rolelevel?.levelName}
                body={url}
            />
        );
    }

    return (
        <>
            <ButtonGroup variant='contained' ref={anchorRef} aria-label='split button'>
                {buildButtonItem()}
                <Button
                    variant='contained'
                    color='secondary'
                    size='small'
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label='select merge strategy'
                    aria-haspopup='menu'
                    onClick={handleToggle}
                >
                    <Icon icon='solar:arrow-down-bold' />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{
                    zIndex: 1
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id='split-button-menu' autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            onClick={event => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    )
}

export default ShareButton;