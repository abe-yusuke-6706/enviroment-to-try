// ポスト一覧
export interface Product {
    id: number,
    name: string,
    price: number,
    stock: number,
    description: string,
    user_id: number
}

export interface ProductProps {
    products: Product[],
}