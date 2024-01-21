import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";

const bannerHero: SxProps<Theme> = {
    backgroundImage: "url(/images/letssail.jpg)",
    backgroundSize: "cover",
    backgroundPosition: {
        xs: "5% 40%",
        md: "60% 40%",

    },
    height: 450
};

const landingPageStyle = {
    bannerHero,
}

export default landingPageStyle;