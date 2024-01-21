
export default interface TrxDetail {
    id: number
    transaction_id: number
    trxable_id: number
    trxable_type: string
    item_price: string
    qty: string
    created_at: string
    updated_at: string
    measure: string
    trxable: any;
}