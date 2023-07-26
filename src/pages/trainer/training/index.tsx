import React from 'react'
import Box from '@mui/material/Box'
import { Tabs, Tab, useMediaQuery, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import AllTrainingScreen from './all'
import OngoingTrainingScreen from './ongoing'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    {children}
                    {/* <Typography>{children}</Typography> */}
                </Box>
            )}
        </div>
    );
}

const Training = () => {
    const theme = useTheme()
    const hidden = useMediaQuery(theme.breakpoints.down('md'))

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box  >
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}
                    sx={!hidden ? {
                        direction: "row",
                        justifyContent: "flex-start",
                        alignItems: "stretch",
                        alignContent: 'top',
                        marginBottom: '10px',
                    } : {
                    }}
                >
                    <Grid xs={12}>
                        <Box sx={{
                            borderBottom: 1, borderColor: 'divider', boxSizing: 'border-box',
                            background: '#FFFFFF',
                            border: '1px solid rgba(76, 78, 100, 0.12)',
                            borderRadius: '10px'
                        }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ "& button.Mui-selected": { backgroundColor: '#32487A', color: 'white', borderRadius: '4px' } }} >
                                <Tab label="Ongoing Training" {...a11yProps(0)} />
                                <Tab label="All Training" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <Grid container sx={{
                            marginTop: '10px',
                            direction: "row",
                            justifyContent: "flex-start",
                            alignItems: "top",
                            alignContent: 'top',
                        }}>
                            <Grid item xs={12} >
                                <TabPanel value={value} index={0}>
                                    <Grid container xs={12}>
                                        <Grid container xs={9}>
                                        </Grid>
                                        <Grid md={12} xs={3} container justifyContent={'right'} marginTop={'10px'}>
                                        </Grid>
                                    </Grid>
                                </TabPanel>
                                <TabPanel value={value} index={0}>
                                    <OngoingTrainingScreen />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <AllTrainingScreen />
                                </TabPanel>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

Training.acl = {
    action: 'read',
    subject: 'user-training-management'
};

export default Training
