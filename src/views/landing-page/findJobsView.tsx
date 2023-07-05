import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Chip, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const FindJobsView = (props: { id: string }) => {
    const { t } = useTranslation();

    const planItems = [
        "Captain",
        "Chief Engineer",
        "Finance",
        "Cook",
        "Second Engineer",
        "Chief Officer",
        "Able Seaman",
        "Mess Boy",
        "Assistant Cook",
        "Show more",
    ];

    return (
        <Grid id={props.id} sx={{ backgroundImage: 'url(/images/backgrounds/bg-company-form.jpg)', backgroundSize: 'cover' }} marginY={20} container direction="column" alignItems="center" justifyContent="center">
            <Grid mb={5} sx={{ width: "80%" }} item textAlign="center">
                <Typography variant='h3' sx={{ mb: 5 }} color={"black"}>{t("landing_jobs_title")}</Typography>
                <Typography fontSize={18} variant='body1'>{t("landing_jobs_subtitle")}</Typography>
            </Grid>
            <Grid container>
                <Grid item lg={6} md={6} textAlign={'center'}>
                    <Box
                        component="img"
                        sx={{ width: "54%" }}
                        alt="The Profesea logo"
                        title="Profesea"
                        src="/images/cards/seafarer-findjob.png"
                    />
                </Grid>
                <Grid item lg={6} md={6}>
                    <Grid container>
                        <Grid item lg={12}>
                            <Typography variant="h6">On-Ship</Typography>
                            <Grid item lg={9} sx={{ marginY: 5 }}>
                                {
                                    planItems.map((item, i) => (
                                        i == 9
                                            ? <Link key={item} href="/">
                                                <Chip clickable label={item} onDelete={() => null} deleteIcon={(<FontAwesomeIcon color="#fff" icon={faChevronDown} />)} sx={{ marginRight: 2, marginBottom: 3 }} variant="filled" color="primary" />
                                            </Link>
                                            : <Chip sx={{ marginRight: 2, marginBottom: 3 }} key={item} label={item} variant="outlined" />
                                    ))
                                }
                            </Grid>
                        </Grid>
                        <Grid item lg={12}>
                            <Typography variant="h6">Off-Ship</Typography>
                            <Grid item lg={9} sx={{ marginY: 5 }}>
                                {
                                    planItems.map((item, i) => (
                                        i == 9
                                            ? <Link key={item} href="/">
                                                <Chip clickable label={item} onDelete={() => null} deleteIcon={(<FontAwesomeIcon color="#fff" icon={faChevronDown} />)} sx={{ marginRight: 2, marginBottom: 3 }} variant="filled" color="primary" />
                                            </Link>
                                            : <Chip sx={{ marginRight: 2, marginBottom: 3 }} key={item} label={item} variant="outlined" />
                                    ))
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default FindJobsView;