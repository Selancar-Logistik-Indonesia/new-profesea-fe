import { ReactNode, createContext, useCallback, useMemo, useState } from "react";
import { IUser } from "src/contract/models/user"
import { HttpClient } from "src/services";
import debounce from "src/utils/debounce";

type ProviderProps = { children: ReactNode };

type FriendSuggestionContextType = {
    listFriends: IUser[],
    isLoading: boolean,
    search: string,
    handleSearch: (s: string) => void,
    fetchListFriends: () => void,
}

const defaultValue: FriendSuggestionContextType = {
    listFriends: [],
    isLoading: true,
    search: '',
    handleSearch: () => { },
    fetchListFriends: () => { },
};

const FriendSuggestionContext = createContext(defaultValue);

const FriendSuggestionProvider = (props: ProviderProps) => {
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

    const values = useMemo(() => ({
        listFriends,
        handleSearch,
        fetchListFriends,
        isLoading,
        search,
    }), [
        listFriends,
        handleSearch,
        fetchListFriends,
        isLoading,
        search,
    ]);

    return <FriendSuggestionContext.Provider value={values}>{props.children}</FriendSuggestionContext.Provider>
}

export {
    FriendSuggestionProvider,
}

export default FriendSuggestionContext;