import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useTheme } from '@mui/material/styles'
import { useSettings } from 'src/@core/hooks/useSettings'
import { Box, Button, Container, Divider, IconButton } from '@mui/material'
import localStorageKeys from 'src/configs/localstorage_keys'
import { useEffect, useState } from 'react'
import UserDropdown from '../shared-components/UserDropdown'
import secureLocalStorage from 'react-secure-storage'
import LanguageDropdown from '../shared-components/LanguageDropdown'
import { useRouter } from 'next/router'
import NavItemType from 'src/contract/types/navItemType'
import IconifyIcon from 'src/@core/components/icon'

const LandingPageAppBar = (props: { appBarElevation?: number }) => {
    const theme = useTheme();
    const { settings, saveSettings } = useSettings();
    const { locale } = useRouter();
    const { skin } = settings;
    const navItems: NavItemType[] = [
        { title: 'Login', variant: 'contained', onClick: "/login" },
        { title: 'Register', variant: 'contained', onClick: "/register", sx: { backgroundColor: "#ffa000", ":hover": { backgroundColor: "#ef6c00" } } },
    ];
    const router = useRouter();

    const homeNavItems = [
        { title: "Home", path: "/" },
        { title: "Job", path: "/#findJobSection" },
        { title: "Seafarer", path: "/#findCandidate" },
        { title: "Pricing", path: "/pricing/" },
        { title: "Contact", path: "/#footer" },
    ];

    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        const strUser = secureLocalStorage.getItem(localStorageKeys.userData);
        if (!strUser) {
            return;
        }

        setIsLogin(true);
    }, []);

    return (
        <AppBar
            color='default'
            position='sticky'
            elevation={props.appBarElevation ?? 0}
            sx={{
                backgroundColor: 'background.paper',
                ...(skin === 'bordered' && { borderBottom: `1px solid ${theme.palette.divider}` })
            }}
        >
            <Container maxWidth={false}>
                <Toolbar
                    sx={{
                        justifyContent: 'space-between',
                        p: theme => `${theme.spacing(0, 6)} !important`,
                        minHeight: `${(theme.mixins.toolbar.minHeight as number) - (skin === 'bordered' ? 1 : 0)}px !important`
                    }}
                >
                    <Link href='/'>
                        <Box
                            component="img"
                            sx={{ width: 150 }}
                            alt="The Profesea logo"
                            title="Profesea"
                            src="/images/logosamudera.png"
                        />
                    </Link>

                    <Box display={{ xs: 'flex', md: 'none' }}>
                        <IconButton>
                            <IconifyIcon icon='mdi:menu' fontSize={32} />
                        </IconButton>
                    </Box>

                    <Box display={{ xs: 'none', md: 'flex' }} sx={{
                        alignItems: 'center',
                        width: 'fit-content',
                        borderRadius: 1,
                        bgcolor: 'background.paper',
                        color: 'text.secondary',
                        '& svg': {
                            m: 1.5,
                        },
                        '& hr': {
                            mx: 0.5,
                        },
                    }}>
                        {
                            homeNavItems.map(el => (
                                <Link key={el.path} href={el.path}>
                                    <Button sx={{ fontWeight: router.asPath == el.path ? 'bold' : undefined }} variant="text" color='secondary'>{el.title}</Button>
                                </Link>
                            ))
                        }

                        <Divider orientation="vertical" variant="middle" flexItem color='#ddd' />
                        <LanguageDropdown settings={settings} saveSettings={saveSettings} />

                        {!isLogin ? navItems.map((item) => (
                            <Link href={item.onClick} key={item.title} locale={locale}>
                                <Button size='small' type='button' variant={item.variant} sx={{ ...item.sx, mr: 2, ml: 2 }} >
                                    {item.title}
                                </Button>
                            </Link>
                        )) : (
                            <>
                                <Link href="/home" locale={locale}>
                                    <Button size='small' type='button' variant='outlined' sx={{ mr: 2, ml: 2 }}>
                                        Dashboard
                                    </Button>
                                </Link>
                                <UserDropdown settings={settings} />
                            </>
                        )}

                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    )
}

export default LandingPageAppBar;
