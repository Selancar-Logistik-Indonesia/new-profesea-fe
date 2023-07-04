import { faBriefcase, faChartLine, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardContent, Grid, Typography } from "@mui/material";

const FeatureView = () => {
    const featureItems = [
        {
            icon: faBriefcase,
            title: "Find Jobs",
            description: "Find any jobs in the maritime industry that match your skills and interest",
        },
        {
            icon: faUsers,
            title: "Find Candidates",
            description: "Find the right candidate using our specific filters made for maritime industry jobs",
        },
        {
            icon: faChartLine,
            title: "Improve your career",
            description: "Improve your chance to become the star candidate and get picked by the employers using training and certification",
        },
    ];

    return (
        <Grid container justifyContent="center" sx={{ backgroundColor: 'none' }} spacing={9} mt={10}>
            {
                featureItems.map(item => (
                    <Grid item key={item.title}>
                        <Card sx={{ width: 420, height: 180 }} elevation={3}>
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