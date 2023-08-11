import { Card, Grid } from "@mui/material"
import { Box } from "@mui/system";

const SideAd = (props: { sx?: any }) => {
    return <Grid xs={12} container display={'flex'} sx={{
        ...props.sx,
        direction: "row",
        justifyContent: "flex-start",
        alignContent: 'top',
        alignItems: "stretch"
    }}>
        <Grid xs={12}>
            <Card elevation={8}>
                <Box component='img' src="/images/backgrounds/samplead.jpg"></Box>
            </Card>
        </Grid>
    </Grid>
}

export default SideAd;