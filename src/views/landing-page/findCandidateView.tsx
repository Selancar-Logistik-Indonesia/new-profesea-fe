import { faAdd, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Chip, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const FindCandidateView = (props: { id: string }) => {
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
        <Grid id={props.id} sx={{ backgroundColor: '#f3f2f0', backgroundSize: 'cover', height: 400 }} marginY={1} container direction="column" alignItems="center" justifyContent="center">
            <Grid container mt={10} sx={{ mx: { xs: 5, md: 10 } }}>
                <Grid item lg={4} md={6} textAlign={'left'}>
                    <Typography variant='h4' sx={{ mb: 5 }} color={"#32487A"}>{t("landing_candidate_title")}</Typography>
                    <Typography fontSize={14} variant='body1'>{t("landing_candidate_subtitle")}</Typography>
                </Grid>
                <Grid item lg={8} md={6}>
                    <Container sx={{ my: 5 }} disableGutters>
                        <Button startIcon={<FontAwesomeIcon color="#fff" icon={faAdd} />} variant="contained">{t('b_post_job')}</Button>
                    </Container>
                    <Typography variant="h6" color={"#32487A"}>Suggested Searches</Typography>
                    <Grid item lg={9} xs={12} sx={{ my: 5, maxWidth: { xs: '90%' } }}>
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
    );
}

export default FindCandidateView;