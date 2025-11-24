// ポスト一覧
export interface Product {
    id: number,
    name: string,
    price: number,
    stock: number,
    image: string | BigInteger,
    description: string,
    user_id: number
}