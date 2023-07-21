import { faBriefcase, faChartLine, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

const FeatureView = () => {
    const { t } = useTranslation();

    const featureItems = [
        {
            key: "feat1",
            icon: faBriefcase,
            title: t('features.findJobs.title'),
            description: t('features.findJobs.subtitle'),
            img: ('/images/icon-findjob.png'),
        },
        {
            key: "feat2",
            icon: faUsers,
            title: t('features.findCandidates.title'),
            description: t('features.findCandidates.subtitle'),
            img: ('/images/icon-findcandidate.png'),
        },
        {
            key: "feat3",
            icon: faChartLine,
            title: t('features.improveCareer.title'),
            description: t('features.improveCareer.subtitle'),
            img: ('/images/icon-trainer.png'),
        },
    ];

    return (

        <Grid container justifyContent="center" sx={{ backgroundColor: 'none' }} spacing={9} mt={0} mb={10}>
            {
                featureItems.map(item => (
                    <Grid item key={item.key}>
                        <Card sx={{ width: 420, height: 450, backgroundColor: '#4c98cf12' }} elevation={0}>
                            <CardContent>
                                <Typography variant="h6" color={"#32487A"} fontWeight="600">{item.title}</Typography>
                                <Typography sx={{ mb: 4 }} variant='body1' style={{ color: "#424242" }}>
                                {item.description}
                                </Typography>
                                <Box
                                    component="img"
                                    sx={{ width: 350, height: 300}}
                                    alt="The Profesea logo"
                                    title="Profesea"
                                    src={item.img}
                                />
                            </CardContent>
                        </Card>

                    </Grid>
                ))
            }
        </Grid>
    );
}

export default FeatureView;