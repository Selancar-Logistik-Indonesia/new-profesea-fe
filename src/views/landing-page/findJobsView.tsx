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
        <Grid id={props.id} sx={{ backgroundColor: '#FFFFFF', backgroundSize: 'cover', py: 30 }} container direction="column" alignItems="center" justifyContent="center">
            <Box sx={{ display: { xs: 'block', md: 'flex' }, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box sx={{ flexShrink: 1, mx: 10 }}>
                    <Typography variant='h5' sx={{ mb: 5 }} color={"#000000"} fontWeight="600">{t("landing_jobs_title")}</Typography>
                    <Typography fontSize={18} variant='body1' style={{ color: "#000" }}>{t("landing_jobs_subtitle")}</Typography>
                </Box>
                <Box sx={{ flexDirection: 'column', py: { xs: 10, md: 0 }, mx: 10 }}>
                    <Typography variant="h5" sx={{ mb: 5 }} color={"#000000"} fontWeight="600">{t("landing_jobs_suggested")}</Typography>
                    <Box sx={{ maxWidth: 880 }}>
                        {
                            planItems.map((item, i) => (
                                i == 9
                                    ? <Link key={item} href="/">
                                        <Chip clickable label={item} onDelete={() => null} deleteIcon={(<FontAwesomeIcon color="#fff" icon={faChevronDown} />)} sx={{ marginRight: 2, marginBottom: 3 }} variant="filled" color="primary" />
                                    </Link>
                                    : <Chip sx={{ marginRight: 2, marginBottom: 3 }} key={item} label={item} variant="outlined" />
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
}

export default FindJobsView;