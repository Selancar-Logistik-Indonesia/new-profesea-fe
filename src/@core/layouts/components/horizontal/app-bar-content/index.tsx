import Link from 'next/link'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { LayoutProps } from 'src/@core/layouts/types'

interface Props {
    hidden: LayoutProps['hidden']
    settings: LayoutProps['settings']
    saveSettings: LayoutProps['saveSettings']
    appBarContent: NonNullable<NonNullable<LayoutProps['horizontalLayoutProps']>['appBar']>['content']
    appBarBranding: NonNullable<NonNullable<LayoutProps['horizontalLayoutProps']>['appBar']>['branding']
}

const LinkStyled = styled(Link)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    marginRight: theme.spacing(8)
}))

const AppBarContent = (props: Props) => {
    const { appBarContent: userAppBarContent, appBarBranding: userAppBarBranding } = props

    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {
                userAppBarBranding
                    ? (userAppBarBranding(props))
                    : (
                        <LinkStyled href='/'>
                            <Box
                                component="img"
                                sx={{ width: 150 }}
                                alt="The Profesea logo"
                                title="Profesea"
                                src="/images/logosamudera.png"
                            />
                        </LinkStyled>
                    )
            }
            {userAppBarContent ? userAppBarContent(props) : null}
        </Box>
    )
}

export default AppBarContent
