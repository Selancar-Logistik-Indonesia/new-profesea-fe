import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";

const bannerHero: SxProps<Theme> = {
    backgroundImage: "url(/images/header-homepage6.jpg)",
    backgroundSize: "cover",
    backgroundPosition: {
        xs: "60% 40%",
        md: "60% 40%"
    },
    height: '100%',
};

const landingPageStyle = {
    bannerHero,
}

export default landingPageStyle;