import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";

const bannerHero: SxProps<Theme> = {
    backgroundImage: "url(/images/header-homepage3.png)",
    backgroundSize: "cover",
    backgroundPosition: {
        xs: "67% 40%",
        md: "60% 40%"
    },
    height: 550
};

const landingPageStyle = {
    bannerHero,
}

export default landingPageStyle;