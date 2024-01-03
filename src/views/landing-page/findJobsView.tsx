import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Chip, Grid, Typography } from "@mui/material";
import { AxiosError } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { AppConfig } from "src/configs/api";
import { HttpClient } from "src/services";
// const renderList = (arr: any[]) => {
//   if (arr && arr.length) {
  
//       return arr.map((item, index:number) => {

//           return (
            
//           )
//       })
//     }
// }
const FindJobsView = (props: { id: string }) => {
    
    const [planItems, setDataPlanItems] = useState<any[]>([]);
    const { t } = useTranslation();
    // const planItems = [
    //     "Captain",
    //     "Chief Engineer",
    //     "Finance",
    //     "Cook",
    //     "Second Engineer",
    //     "Chief Officer",
    //     "Able Seaman",
    //     "Mess Boy",
    //     "Assistant Cook",
    //     "Show more",
    // ];
    
   const getListNews = async () => {
    try {
      // const resp = await HttpClient.get(`/news?page=${1}&take=25&type=${forumCode}`)
    //   const resp = await HttpClient.get(`/news?page=${1}&take=25&type=Event`)
        const resp = await HttpClient.get(AppConfig.baseUrl + '/recomend/jobpostbyrole')
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }
        debugger;
      const rows = resp.data.data
      const items = rows 
      setDataPlanItems(items)
    } catch (error) {
      let errorMessage = 'Something went wrong!'

      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message ?? errorMessage
      }

      if (typeof error == 'string') {
        errorMessage = error
      }

      toast.error(`Opps ${errorMessage}`)
    }
  }

  // const type = [{ title: 'News' }, { title: 'Event' }]

  useEffect(() => { 
    getListNews().then(() => { 
    }) 
  }, [])
  
    return (
        <Grid id={props.id} sx={{ backgroundColor: '#FFFFFF', backgroundSize: 'cover', py: 30 , maxWidth: { xs: '100%' }, px: { xs: 5, md: 5 } }} container direction="column" alignItems="center" justifyContent="center">
            <Box sx={{ display: { xs: 'block', md: 'flex' }, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box sx={{ flexShrink: 1, mx: 10 }}>
                    <Typography variant='h5' sx={{ mb: 5 }} color={"#000000"} fontWeight="600">{t("landing_jobs_title")}</Typography>
                    <Typography fontSize={16} variant='body1' style={{ color: "#000" }} maxWidth='80%'>{t("landing_jobs_subtitle")}</Typography>
                </Box>
                <Box sx={{ flexDirection: 'column', py: { xs: 10, md: 0 }, mx: 10 }}>
                    <Typography variant="h5" sx={{ mb: 5 }} color={"#000000"} fontWeight="600">{t("landing_jobs_suggested")}</Typography>
                    <Box sx={{ maxWidth: 880 }}>
                         {planItems && (
 
                            planItems.map((item, i) => (
                                i == 9
                                    ? <Link key={item} href="/">
                                        <Chip clickable label={item} onDelete={() => null} deleteIcon={(<FontAwesomeIcon color="#fff" icon={faChevronDown} />)} sx={{ marginRight: 2, marginBottom: 3 }} variant="filled" color="primary" />
                                    </Link>
                                    : <Chip sx={{ marginRight: 2, marginBottom: 3 }} key={item} label={item.name} variant="outlined" />
                            ))
                         
                         )}
                       
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
}

export default FindJobsView;