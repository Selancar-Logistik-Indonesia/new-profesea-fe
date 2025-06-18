

export interface IReportReason {
    id: number;
    reason: string;
    created_at?: string;
    updated_at?: string;
}

export interface IReportedRowData {
    id: number;
    content: string;
    postedBy: string;
    reportedBy: string;
    community: string;
    reason: string[];
    date: string;
}