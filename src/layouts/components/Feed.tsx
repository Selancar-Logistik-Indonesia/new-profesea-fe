import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Avatar, CircularProgress, TextField, debounce } from '@mui/material'
import { HttpClient } from 'src/services'
import { useCallback, useEffect, useState } from 'react'
import { IUser } from 'src/contract/models/user'
import { toTitleCase } from 'src/utils/helpers'
import ConnectButton from './ConnectButton'
import Link from 'next/link'

const renderList = (arr: IUser[]) => {
    if (!arr || arr.length == 0) {
        return <Box textAlign={'center'}>
            <Typography color='text.secondary'>No suggestion for now</Typography>
        </Box>;
    }

    return arr.map((item) => {
        const userPhoto = (item.photo) ? item.photo : "/images/avatars/default-user.png";

        return (
            <Box key={item.id}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    '&:not(:last-of-type)': { mb: 4 },
                }}
            >
                <Box>
                    <Avatar src={userPhoto} alt='profile-picture' sx={{ width: 60, height: 60 }} />
                </Box>
                <Box sx={{ flexGrow: 1, ml: 3, display: 'flex', flexDirection: 'column' }}>
                    <Link style={{ textDecoration: 'none' }} href={`/profile/${item.username}`}>
                        <Typography sx={{ color: '#0a66c2', fontWeight: 'bold', mt: 1, fontSize: 12 }}>
                            {toTitleCase(item.name)}
                        </Typography>
                    </Link>
                    <Typography sx={{ color: 'text.primary', mt: 1, mb: 1, fontSize: 10 }}>
                        {item.email}
                    </Typography>
                    <Box>
                        <ConnectButton user={item} />
                    </Box>
                </Box>
            </Box>
        )
    });
}

const Feed = () => {
    const [results, setResults] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searched, setSearched] = useState<any>('');

    const handleSearch = useCallback(
        debounce((value: string) => {
            setSearched(value);
        }, 500), []
    );

    const getListFriends = async () => {
        setIsLoading(true);
        try {
            const resp = await HttpClient.get("/friendship/suggestion", {
                page: 1,
                take: 7,
                search: searched
            });

            const { data } = resp.data as { data: IUser[] };
            setIsLoading(false);
            setResults(data);
        } catch (error) {
            setIsLoading(false);
            alert(error);
        }
    }

    useEffect(() => {
        getListFriends();
    }, [searched]);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
                    <CardContent>
                        <Box sx={{ mb: 7 }}>
                            <Typography color={"#424242"} fontWeight="600" fontSize={"14px"} sx={{ mb: 4 }}>
                                Add to your feed
                            </Typography>
                            <TextField
                                id='fullName'
                                label='Search Name'
                                variant='outlined'
                                fullWidth
                                onChange={e => handleSearch(e.target.value)}
                                sx={{ mb: 3 }}
                            />
                            {
                                isLoading
                                    ? (<Box textAlign={'center'} mt={10}><CircularProgress /></Box>)
                                    : renderList(results)
                            }
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Feed
