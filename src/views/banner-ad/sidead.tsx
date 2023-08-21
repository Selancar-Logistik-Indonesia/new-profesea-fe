import { Card, Grid } from "@mui/material"
import { Box } from "@mui/system";

const SideAd = (props: { sx?: any }) => {
    return <Grid xs={12} container display={'flex'} sx={{
        ...props.sx,
        direction: "row",
        justifyContent: "flex-start",
        alignContent: 'top',
        alignItems: "stretch",
    }}>
        <Grid xs={12}>
            <Card elevation={1} sx={{height: "240px"}}>
                <Box component='img' src="/images/backgrounds/ads-here.png" ></Box>
            </Card>
        </Grid>
    </Grid>
}

export default SideAd;