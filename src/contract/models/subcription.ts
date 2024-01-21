
export default interface Subscription {
    id: number
    user_id: number
    transaction_id: string
    plan_type: string
    account_type: string,
    start_date: string
    end_date: string
    canceled_at: string
    qty: string
    measure: string
    is_active: boolean
    created_at: string
    updated_at: string
}

