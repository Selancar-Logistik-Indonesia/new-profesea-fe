import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import ISearchContent from "src/contract/models/search_content";
import SearchContentType from "src/contract/types/search_content_type";
import { HttpClient } from "src/services";
import debounce from "src/utils/debounce";
import { getUserAvatarByPath } from "src/utils/helpers";

const AppbarSearchUser = () => {
    const router = useRouter();
    const [listFriends, setListFriends] = useState<ISearchContent[]>([]);
    const [search, setSearch] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchListFriends = async () => {
        setIsLoading(true);
        try {
            const resp = await HttpClient.get("/search/content", {
                search: search
            });

            const { contents } = resp.data as { contents: ISearchContent[] };
            setIsLoading(false);
            setListFriends(contents);
        } catch (error) {
            setIsLoading(false);
            alert(error);
        }
    }

    const handleClick = (option: ISearchContent) => {
        if (option.content_type == SearchContentType.socialFeed) {
            return router.push(`/feed/${option.content.id}`);
        }

        return router.push(`/profile/${option.content.username}`);
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
            getOptionLabel={(option) => (option as ISearchContent).title}
            size='small'
            renderOption={(props, option) => (
                <Box {...props} onClick={() => handleClick(option)} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 }, display: 'flex', flexDirection: 'row' }}>
                    {option.content_type == SearchContentType.user && (
                        <img
                            loading="lazy"
                            width="40"
                            src={getUserAvatarByPath(option.leading)}
                            srcSet={getUserAvatarByPath(option.leading)}
                            alt={option.title}
                        />
                    )}

                    <Box>
                        <Typography variant='body1' sx={{
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2
                        }}>
                            {option.title}
                        </Typography>
                        <Typography variant='caption'>
                            {option.subtitle}
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