import { ReactNode } from "react";
import LandingPageLayout from "src/@core/layouts/LandingPageLayout";
import FooterView from "src/views/landing-page/footerView";
import PricingView from "src/views/landing-page/pricingView";

const PricingPage = () => {
    return (
        <>
            <PricingView />
            <FooterView />
        </>
    );
}

PricingPage.guestGuard = false;
PricingPage.authGuard = false;
PricingPage.getLayout = (page: ReactNode) => <LandingPageLayout appBarElevation={3}>{page}</LandingPageLayout>

export default PricingPage;