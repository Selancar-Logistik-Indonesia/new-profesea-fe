import Subscription from "./subcription"
import { IUser } from "./user"


export default interface TransactionSubscription {
    id: number
    user_id: number
    trx_id: string
    payment_type: string
    bank_code: string
    account_number: string
    expiration_date: string
    amount: string
    created_at: string
    updated_at: string
    bank_logo: string
    status: string
    user: IUser
    subscription: Subscription
}

