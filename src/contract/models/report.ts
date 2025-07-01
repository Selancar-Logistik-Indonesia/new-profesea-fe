import ISocialFeed from "./social_feed";
import { IUser } from "./user";


export interface IReportReason {
    id: number;
    reason: string;
    created_at?: string;
    updated_at?: string;
}

export interface IReportedFeed {
    id:number;
    user_id:number;
    social_feed_id:number;
    reason: IReportReason[];
    social_feed: ISocialFeed;
    status:string;
    user:IUser;
    notes:string | null;
    created_at:string;
    updated_at:string;
}

export interface IReportedRowData {
    id: number;
    content: string;
    postedBy: string;
    reportedBy: string;
    community_name: string;
    community_visibility: boolean;
    reason: string[];
    date: string;
    status: string;
    feed_data: ISocialFeed;
    allow: () => void;
    delete: () => void;
}