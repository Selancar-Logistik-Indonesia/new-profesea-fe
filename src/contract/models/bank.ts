export interface IBank {
    name: string,
    code: string,
    country: string,
    currency: string,
    is_activated: boolean,
    logo: string,
}

export interface PaymentLogo {
    key?: string
    image: string
}

export interface PaymentItem {
    label: string
    type: string
    code: string
    logo: string | PaymentLogo[]
}

export interface PaymentGroup {
    group: string
    items: PaymentItem[]
}
