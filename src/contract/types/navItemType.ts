import { ButtonPropsVariantOverrides, SxProps } from '@mui/material'
import { OverridableStringUnion } from '@mui/types';

type NavItemType = {
    title: string,
    variant: OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonPropsVariantOverrides>,
    sx?: SxProps,
    onClick: any
};

export default NavItemType;