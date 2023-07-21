import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Avatar, CircularProgress } from '@mui/material'
import { HttpClient } from 'src/services'
import { useEffect, useState } from 'react'
import { IUser } from 'src/contract/models/user'
import { toTitleCase } from 'src/utils/helpers'
import ConnectButton from './ConnectButton'

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
          <Typography sx={{ color: 'text.primary', fontWeight: 'bold', mt: 1, fontSize: 14 }}>
            {toTitleCase(item.name)}
          </Typography>
          <Typography sx={{ color: 'text.primary', mt: 1, mb: 1, fontSize: 14 }}>
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

  const getListFriends = async () => {
    setIsLoading(true);
    try {
      const resp = await HttpClient.get("/friendship/suggestion", {
        page: 1,
        take: 7,
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
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 7 }}>
              <Typography color={"#424242"} fontWeight="600" fontSize={"14px"} sx={{ mb: 4}}>
                Add to your feed
              </Typography>
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
