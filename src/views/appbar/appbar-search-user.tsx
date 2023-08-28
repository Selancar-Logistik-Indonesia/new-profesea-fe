import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { IUser } from "src/contract/models/user";
import { HttpClient } from "src/services";
import debounce from "src/utils/debounce";
import { getUserAvatar } from "src/utils/helpers";

const AppbarSearchUser = () => {
    const router = useRouter();
    const [listFriends, setListFriends] = useState<IUser[]>([]);
    const [search, setSearch] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchListFriends = async () => {
        setIsLoading(true);
        try {
            const resp = await HttpClient.get("/friendship/suggestion", {
                page: 1,
                take: 7,
                search: search
            });

            const { data } = resp.data as { data: IUser[] };
            setIsLoading(false);
            setListFriends(data);
        } catch (error) {
            setIsLoading(false);
            alert(error);
        }
    }

    const handleSearch = useCallback(
        debounce((value: string) => {
            setSearch(value);
        }, 500), []
    );

    useEffect(() => {
        fetchListFriends();
    }, [search]);

    return (
        <Autocomplete
            freeSolo
            autoHighlight
            sx={{ width: 300, ml: 5 }}
            options={listFriends}
            getOptionLabel={(option) => (option as IUser).name}
            size='small'
            renderOption={(props, option) => (
                <Box {...props} onClick={() => router.push(`/profile/${option.username}`)} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 }, display: 'flex', flexDirection: 'row' }}>
                    <img
                        loading="lazy"
                        width="40"
                        src={getUserAvatar(option)}
                        srcSet={getUserAvatar(option)}
                        alt={option.username}
                    />
                    <Box>
                        <Typography variant='body1'>
                            {option.name}
                        </Typography>
                        <Typography variant='caption'>
                            {option.email}
                        </Typography>
                    </Box>
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    disabled={isLoading}
                    label="Search"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            )}
        />
    );
}

export default AppbarSearchUser;