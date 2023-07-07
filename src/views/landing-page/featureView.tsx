import { faBriefcase, faChartLine, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const FeatureView = () => {
    const { t } = useTranslation();

    const featureItems = [
        {
            key: "feat1",
            icon: faBriefcase,
            title: t('features.findJobs.title'),
            description: t('features.findJobs.subtitle'),
        },
        {
            key: "feat2",
            icon: faUsers,
            title: t('features.findCandidates.title'),
            description: t('features.findCandidates.subtitle'),
        },
        {
            key: "feat3",
            icon: faChartLine,
            title: t('features.improveCareer.title'),
            description: t('features.improveCareer.subtitle'),
        },
    ];

    return (
        <Grid container justifyContent="center" sx={{ backgroundColor: 'none' }} spacing={9} mt={10}>
            {
                featureItems.map(item => (
                    <Grid item key={item.key}>
                        <Card sx={{ width: 420, height: 180, border: 'solid 1px #eeeeee', }} elevation={0}>
                            <CardContent>
                                <Typography variant='h6' sx={{ mb: 2 }}>
                                    <FontAwesomeIcon width={40} height={200} icon={item.icon} />
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