import SubscriptionPlanItem from "./subscription_plan_item";

interface SubscriptionPlan {
    account_type: string,
    created_at: string,
    credit: number,
    id: number,
    item: SubscriptionPlanItem,
    item_id: number,
    plan_type: string,
    price: number,
    rule_type: string,
    updated_at: string,
}

export default SubscriptionPlan;