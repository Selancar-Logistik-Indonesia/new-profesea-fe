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
        <Grid id={props.id} sx={{ backgroundColor: '#eae6df', backgroundSize: 'cover' }} marginY={1} container direction="column" alignItems="center" justifyContent="center">
            <Grid container mt={10} ml={10}>
                <Grid item lg={4} md={6} textAlign={'left'}>
                    <Typography variant='h4' sx={{ mb: 5 }} color={"#32487A"}>{t("landing_jobs_title")}</Typography>
                    <Typography fontSize={14} variant='body1'>{t("landing_jobs_subtitle")}</Typography>
                </Grid>
                <Grid item lg={8} md={6}>
                    <Grid container>
                        <Grid item lg={12}>
                            <Typography variant="h6" color={"#32487A"}>Suggested Category</Typography>
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