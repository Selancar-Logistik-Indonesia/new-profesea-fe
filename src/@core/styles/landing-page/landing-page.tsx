import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";

const bannerHero: SxProps<Theme> = {
    backgroundImage: "url(/images/header-homepage3.jpg)",
    backgroundSize: "cover",
    backgroundPosition: {
        xs: "78% 40%",
        md: "60% 40%"
    },
    height: '100%'
};

const landingPageStyle = {
    bannerHero,
}

export default landingPageStyle;