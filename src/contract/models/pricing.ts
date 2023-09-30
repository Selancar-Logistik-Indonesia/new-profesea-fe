export interface PricingItem {
    id: number
    code: string
    name: string
    fname: string
    created_at: string
    updated_at: string
}

export default interface Pricing {
    id: number
    plan_type: string
    rule_type: string
    account_type: string
    credit?: number
    item_id: number
    price: number
    created_at: string
    updated_at: string
    item: PricingItem
}
