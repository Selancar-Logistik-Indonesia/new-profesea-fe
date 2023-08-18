import TrxDetail from "./transaction_detail"

export default interface Transaction {
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
    trx_detail: TrxDetail[]
}

