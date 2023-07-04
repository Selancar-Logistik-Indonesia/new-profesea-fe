import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useTheme } from '@mui/material/styles'
import { useSettings } from 'src/@core/hooks/useSettings'
import { Box, Button, ButtonPropsVariantOverrides, Container, Divider, SxProps } from '@mui/material'
import { OverridableStringUnion } from '@mui/types';
import localStorageKeys from 'src/configs/localstorage_keys'
import { useEffect, useState } from 'react'
import UserDropdown from '../shared-components/UserDropdown'
import secureLocalStorage from 'react-secure-storage'
import LanguageDropdown from '../shared-components/LanguageDropdown'
import { useRouter } from 'next/router'

type NavItemType = {
    title: string,
    variant: OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonPropsVariantOverrides>,
    sx?: SxProps,
    onClick: any
};

const LandingPageAppBar = () => {
    const theme = useTheme();
    const { settings, saveSettings } = useSettings();
    const { locale } = useRouter();
    const { skin } = settings;
    const navItems: NavItemType[] = [
        { title: 'Login', variant: 'contained', onClick: "/login" },
        { title: 'Register', variant: 'contained', onClick: "/register", sx: { backgroundColor: "#ffa000", ":hover": { backgroundColor: "#ef6c00" } } },
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
            elevation={0}
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
                    <Box sx={{
                        display: 'flex',
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
                        <Link href={"/"}>
                            <Button sx={{ fontWeight: 'bold' }} variant="text" color='secondary'>Home</Button>
                        </Link>
                        <Link href={"/"}>
                            <Button variant="text" color='secondary'>Job</Button>
                        </Link>
                        <Link href={"/"}>
                            <Button variant="text" color='secondary'>Seafarer</Button>
                        </Link>
                        <Link href={"/"}>
                            <Button variant="text" color='secondary'>Pricing</Button>
                        </Link>
                        <Link href={"/"}>
                            <Button variant="text" color='secondary'>Contact</Button>
                        </Link>
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
                                        Home
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
