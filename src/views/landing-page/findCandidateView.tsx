import { faAdd, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Chip, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const FindCandidateView = () => {
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
        <Grid marginY={20} container direction="column" alignItems="center" justifyContent="center">
            <Grid mb={5} sx={{ width: "80%" }} item textAlign="center">
                <Typography variant='h3' sx={{ mb: 5 }} color={"black"}>{t("landing_candidate_title")}</Typography>
                <Typography fontSize={18} variant='body1'>{t("landing_candidate_subtitle")}</Typography>
            </Grid>
            <Grid container>
                <Grid item lg={8} paddingX={25}>
                    <Container sx={{ marginY: 5 }} disableGutters>
                        <Button startIcon={<FontAwesomeIcon color="#fff" icon={faAdd} />} variant="contained">{t('b_post_job')}</Button>
                    </Container>
                    <Typography variant="h6">Sugested Searches</Typography>
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
                <Grid item lg={6}>
                    <Box></Box>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default FindCandidateView;