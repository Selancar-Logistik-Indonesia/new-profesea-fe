import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const DiscoverView = () => {
    const { t } = useTranslation();

    return (
        <Box sx={{ px: { xs: 10, md: 20 }, display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#2c2c2d', backgroundSize: 'cover', height: 150 }}>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant='h5' sx={{ mb: 5 }} color={"#ffffff"} fontWeight="600">{t("landing_lets_sail")}</Typography>
            </Box>
            <Box sx={{ flexShrink: 1 }}>
                <Link href="/register">
                    <Button style={{ backgroundColor: "#ef6c00", color: "white", marginRight: 10 }} variant="contained">{t('landing_join_now')}</Button>
                </Link>
            </Box>
        </Box>
    );
}

export default DiscoverView;