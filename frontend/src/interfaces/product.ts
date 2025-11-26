export interface ProductImage {
    id: number;
    filename: string;
    url: string;
}

export interface Product {
    id: number,
    name: string,
    price: number,
    stock: number | null,
    description: string,
    user_id: number,
    images: ProductImage[]
}

export interface createProduct {
    name: string,
    price: number,
    stock: number,
    image: File[] | null,
    description: string,
}