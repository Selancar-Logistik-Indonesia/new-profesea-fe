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
            img: ('/images/sailor.png'),
        },
        {
            key: "feat2",
            icon: faUsers,
            title: t('features.findCandidates.title'),
            description: t('features.findCandidates.subtitle'),
            img: ('/images/company.png'),
        },
        {
            key: "feat3",
            icon: faChartLine,
            title: t('features.improveCareer.title'),
            description: t('features.improveCareer.subtitle'),
            img: ('/images/traine.png'),
        },
    ];

    return (
        <Grid container justifyContent="center" sx={{ backgroundColor: 'none' }} spacing={9} mt={0} mb={10}>
            {
                featureItems.map(item => (
                    <Grid item key={item.key}>
                        <Card sx={{ width: 420, height: 600, backgroundColor: '#f7f7f9' }} elevation={0}>
                            <CardContent>
                                <Box
                                    component="img"
                                    sx={{ width: 200, height: 450 }}
                                    alt="The Profesea logo"
                                    title="Profesea"
                                    src={item.img}
                                />
                                <Typography variant='h6' sx={{ mb: 2 }}>
                                    {item.title}
                                </Typography>
                                <Typography variant='body1'>
                                    {item.description}
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    );
}

export default FeatureView;