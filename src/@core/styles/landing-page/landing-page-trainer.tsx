import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";

const bannerHero: SxProps<Theme> = {
    backgroundImage: "url(/images/bg-landing-trainer.jpg)",
    backgroundSize: "cover",
    backgroundPosition: {
        xs: "67% 40%",
        md: "20% 40%"
    },
    height: 750
};

const landingPageStyle = {
    bannerHero,
}

export default landingPageStyle;