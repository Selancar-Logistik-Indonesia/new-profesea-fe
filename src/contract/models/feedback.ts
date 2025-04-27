import { IUser } from "./user";


export interface IFeedback {
    code: string;
    id: number;
    message: string;
    type: string
}

export interface IUserFeedback {
    id: number;
    user_id: number;
    user: IUser;
    section: string;
    feedback: IFeedback[];
    created_at: string;
}


export interface IFeedbackAnalytic {
    most_selected_features : {message: string, total:number}[];
    recent_submissions: number;
    total_submissions: number;
    total_subscriptions: number;
}

export interface IFeedbackRowData {
    id: number;
    no: number;
    name: string;
    email: string;
    date: string;
    selectedFeatures: number;  
    feedback: IFeedback[]

}

