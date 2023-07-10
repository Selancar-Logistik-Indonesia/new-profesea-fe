import Link from 'next/link'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import { LayoutProps } from 'src/@core/layouts/types'
import Icon from 'src/@core/components/icon'

interface Props {
    navHover: boolean
    collapsedNavWidth: number
    hidden: LayoutProps['hidden']
    navigationBorderWidth: number
    toggleNavVisibility: () => void
    settings: LayoutProps['settings']
    saveSettings: LayoutProps['saveSettings']
    navMenuBranding?: LayoutProps['verticalLayoutProps']['navMenu']['branding']
    menuLockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['lockedIcon']
    menuUnlockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['unlockedIcon']
}

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    paddingRight: theme.spacing(4),
    justifyContent: 'space-between',
    transition: 'padding .25s ease-in-out',
    minHeight: theme.mixins.toolbar.minHeight
}))

const LinkStyled = styled(Link)({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
})

const VerticalNavHeader = (props: Props) => {
    // ** Props
    const {
        hidden,
        navHover,
        settings,
        saveSettings,
        collapsedNavWidth,
        toggleNavVisibility,
        navigationBorderWidth,
        menuLockedIcon: userMenuLockedIcon,
        navMenuBranding: userNavMenuBranding,
        menuUnlockedIcon: userMenuUnlockedIcon
    } = props

    // ** Hooks & Vars
    const theme = useTheme()
    const { mode, direction, navCollapsed } = settings

    const svgFillSecondary = () => {
        if (mode === 'semi-dark') {
            return `rgba(${theme.palette.customColors.dark}, 0.6)`
        } else {
            return theme.palette.text.secondary
        }
    }
    const svgFillDisabled = () => {
        if (mode === 'semi-dark') {
            return `rgba(${theme.palette.customColors.dark}, 0.38)`
        } else {
            return theme.palette.text.disabled
        }
    }

    const menuHeaderPaddingLeft = () => {
        if (navCollapsed && !navHover) {
            if (userNavMenuBranding) {
                return 0
            } else {
                return (collapsedNavWidth - navigationBorderWidth - 40) / 8
            }
        } else {
            return 5.5
        }
    }

    const svgRotationDeg = () => {
        if (navCollapsed) {
            if (direction === 'rtl') {
                if (navHover) {
                    return 0
                } else {
                    return 180
                }
            } else {
                if (navHover) {
                    return 180
                } else {
                    return 0
                }
            }
        } else {
            if (direction === 'rtl') {
                return 180
            } else {
                return 0
            }
        }
    }

    return (
        <MenuHeaderWrapper className='nav-header' sx={{ pl: menuHeaderPaddingLeft() }}>
            {userNavMenuBranding ? (
                userNavMenuBranding(props)
            ) : (
                <LinkStyled href='/'>
                    <Box
                        component="img"
                        sx={{ width: 150 }}
                        alt="The Profesea logo"
                        title="Profesea"
                        src="/images/logosamudera.png"
                    />
                </LinkStyled>
            )}

            {
                hidden ? (
                    <IconButton
                        disableRipple
                        disableFocusRipple
                        onClick={toggleNavVisibility}
                        sx={{ p: 0, backgroundColor: 'transparent !important' }}
                    >
                        <Icon icon='mdi:close' fontSize={20} />
                    </IconButton>
                ) : <></>
            }
        </MenuHeaderWrapper>
    )
}

export default VerticalNavHeader
