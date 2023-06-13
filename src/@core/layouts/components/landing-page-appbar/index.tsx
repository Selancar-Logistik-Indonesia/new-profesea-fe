import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import themeConfig from 'src/configs/themeConfig'
import { useSettings } from 'src/@core/hooks/useSettings'
import { Box, Button, ButtonPropsVariantOverrides, Container } from '@mui/material'
import { OverridableStringUnion } from '@mui/types';

const LinkStyled = styled(Link)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    marginRight: theme.spacing(8)
}))

const LandingPageAppBar = () => {
    // ** Hooks & Vars
    const theme = useTheme()
    const { settings } = useSettings()
    const { skin } = settings
    const navItems = [
        { title: 'English', variant: 'outline', onClick: "/" },
        { title: 'Login', variant: 'outlined', onClick: "/login" },
        { title: 'Register', variant: 'contained', onClick: "/register" },
    ] as { title: string, variant: OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonPropsVariantOverrides>, onClick: any }[];

    return (
        <AppBar
            color='default'
            position='sticky'
            elevation={skin === 'bordered' ? 0 : 3}
            sx={{
                backgroundColor: 'background.paper',
                ...(skin === 'bordered' && { borderBottom: `1px solid ${theme.palette.divider}` })
            }}
        >
            <Container>
                <Toolbar
                    sx={{
                        justifyContent: 'space-between',
                        p: theme => `${theme.spacing(0, 6)} !important`,
                        minHeight: `${(theme.mixins.toolbar.minHeight as number) - (skin === 'bordered' ? 1 : 0)}px !important`
                    }}
                >
                    <LinkStyled href='/'>
                        <b>Fake Icon</b>
                        <Typography variant='h6' sx={{ ml: 2, fontWeight: 700, lineHeight: 1.2 }}>
                            {themeConfig.templateName}
                        </Typography>
                    </LinkStyled>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Link href={item.onClick} key={item.title}>
                                <Button size='small' type='button' variant={item.variant} sx={{ mr: 2, ml: 2 }}>
                                    {item.title}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default LandingPageAppBar;
