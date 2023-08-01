import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";

const bannerHero: SxProps<Theme> = {
    backgroundImage: "url(/images/bg-discover.jpg)",
    backgroundSize: "cover",
    backgroundPosition: {
        xs: "67% 40%",
        md: "20% 40%",
    },
    height: 720
};

const discoverPageStyle = {
    bannerHero,
}

export default discoverPageStyle;