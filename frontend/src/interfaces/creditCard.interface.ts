export interface CreateCreditCard {
    number: number,
    deadline: number,
    securityCode: number,
}

export interface ShowCreditCard {
    brand: string,
    last4: number,
    expYear: number,
    expMonth: number
}
