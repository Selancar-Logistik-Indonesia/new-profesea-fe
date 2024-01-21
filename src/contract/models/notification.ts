interface INotification {
    id: string,
    type: string,
    notifiable_type: string,
    notifiable_id: number,
    data?: any,
    read_at?: string,
    created_at: string,
    updated_at: string
}

export default INotification;