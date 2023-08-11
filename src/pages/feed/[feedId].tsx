import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardContent, CardHeader, CircularProgress, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SocialFeedProvider } from "src/context/SocialFeedContext";
import ISocialFeed from "src/contract/models/social_feed";
import { HttpClient } from "src/services";
import FeedCard from "src/views/social-feed/FeedCard";

const FeedDetailApp = () => {
    return (
        <SocialFeedProvider>
            <FeedDetail />
        </SocialFeedProvider>
    )
}

const FeedDetail = () => {
    const router = useRouter();
    const feedId = parseInt(router.query?.feedId as string);
    const [feed, setFeed] = useState<ISocialFeed | null>(null);

    const getDetailFeed = async () => {
        const response = await HttpClient.get(`/social-feed/feed/${feedId}`);
        if (response.status != 200) {
            alert(response.data?.message ?? "Unknow error!");

            return;
        }

        setFeed(response.data.feed);
    }

    useEffect(() => {
        getDetailFeed();
    }, []);

    return (
        <Card>
            <CardHeader
                avatar={(
                    <IconButton LinkComponent={Link} href="/home">
                        <FontAwesomeIcon icon={faArrowLeft} color='text.primary' />
                    </IconButton>
                )}
            />
            <CardContent>
                {
                    feed == null ? (
                        <CircularProgress />
                    ) : (
                        <FeedCard item={feed} />
                    )
                }
            </CardContent>
        </Card>
    )
}

FeedDetailApp.acl = {
    action: 'read',
    subject: 'feed-detail'
};

export default FeedDetailApp;