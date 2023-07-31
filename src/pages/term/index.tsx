import { Grid, Typography, Card, CardContent, CardHeader } from "@mui/material";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import FooterView from "src/views/landing-page/footerView";
import Head from "next/head";
import themeConfig from "src/configs/themeConfig";
import OuterPageLayout from "src/@core/layouts/outer-components/OuterPageLayout";

const Term = () => {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{`${themeConfig.templateName} - ${t('landing_hero_title')}`}</title>
                <meta name='description' content={`${themeConfig.templateName} - ${t('landing_about_subtitle')}`} />
                <meta name='keywords' content={`${t('app_keyword')}`} />
                <meta name='viewport' content='initial-scale=0.8, width=device-width' />
            </Head>

            <Grid container>
              <Grid item xs={12}>
                <Card>
                  <CardHeader
                    title={
                      <Typography variant="h4" style={{ color: '#424242' }}>
                        Term And Condition
                      </Typography>
                    }
                  />
                    <CardContent>
                      <h1>Welcome to Seaflex Maritime Industry</h1> <p>At Seaflex Maritime Industry, we are your trusted partner in the maritime logistics world. As a premier logistics company, we specialize in providing comprehensive and efficient services tailored to the unique demands of the maritime industry. With a strong focus on handling vessels and cargo, we ensure seamless operations that keep the global maritime trade moving forward.</p> <h2>Unparalleled Expertise and Experience</h2> <p>With decades of industry experience, Seaflex Maritime Industry boasts a team of highly skilled professionals who are well-versed in the complexities of maritime logistics. Our team members are experts in their respective fields, including vessel operations, cargo handling, customs clearance, documentation, and supply chain management. We leverage our in-depth knowledge to deliver top-notch solutions that streamline operations and optimize efficiency for our esteemed clients.</p> <h2>Comprehensive Maritime Solutions</h2> <p>Our comprehensive range of services caters to every aspect of maritime logistics, making us a one-stop-shop for all your shipping needs. From vessel agency services to port handling, warehousing, and distribution, we cover the entire logistics spectrum with precision and care. Our vast network of global partners and industry connections ensures that your cargo reaches its destination securely and on time, no matter the destination.</p> <h2>Customer-Centric Approach</h2> <p>At Seaflex Maritime Industry, our clients are at the heart of everything we do. We take the time to understand your specific requirements and develop tailored solutions that address your unique challenges. Our customer-centric approach ensures that every interaction is met with responsiveness, transparency, and professionalism. With us, you gain a reliable partner dedicated to your success.</p> <h2>Commitment to Safety and Sustainability</h2> <p>We recognize the vital importance of safety and environmental responsibility in the maritime industry. Seaflex Maritime Industry adheres to strict safety protocols and best practices to ensure the protection of your cargo, vessels, and crew. Additionally, we actively pursue sustainable practices, aiming to reduce our environmental impact and contribute to a greener future for the industry.</p> <h2>Global Reach, Local Touch</h2> <p>Our extensive reach extends across international waters and numerous ports worldwide. Yet, despite our global presence, we maintain a local touch, ensuring personalized services that cater to the unique requirements of each location. Whether you're a multinational corporation or a small enterprise, we offer the same dedication and attention to detail to each client.</p> <h2>Choose Seaflex Maritime Industry for Excellence in Maritime Logistics</h2> <p>When you choose Seaflex Maritime Industry, you choose excellence, reliability, and efficiency in maritime logistics. We are driven by our passion for the industry, and our commitment to innovation ensures that we stay ahead in an ever-evolving world. Trust us to navigate your logistics challenges and unlock a world of possibilities for your business.</p> <p><em>Seaflex Maritime Industry - Your Journey, Our Commitment</em></p>
                    </CardContent>
                </Card>
              </Grid>
            </Grid >

            <FooterView />
        </>
    );
}

Term.guestGuard = false;
Term.authGuard = false;
Term.getLayout = (page: ReactNode) => <OuterPageLayout>{page}</OuterPageLayout>

export default Term;
