interface IAbilities {
    plan_type: string
    start_date: string
    end_date: string
    account_type: string
    items: AbilitiesItem[]
}

interface AbilitiesItem {
    code: string
    rule_type: string
    credit?: number
    name: string
}

export {
    type AbilitiesItem,
}

export default IAbilities;