import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";

const bannerHero: SxProps<Theme> = {
  backgroundImage: 'url(/images/header-features.png)',
  backgroundSize: 'cover',
  backgroundPosition: {
    xs: '67% 40%',
    md: '50% 50%'
  },
  height: {
    xs: 1100,
    md: 800
  }
}

const landingPageStyle = {
    bannerHero,
}

export default landingPageStyle;