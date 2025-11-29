export interface ProductImage {
    id: number;
    filename: string;
    url: string;
}

export interface Product {
    id: number,
    name: string,
    price: number,
    stock: number,
    description: string,
    user_id: number,
    images: ProductImage[]
}

export interface LocationProduct {
    id: number,
    name: string,
    price: number,
    stock: number,
    description: string,
    user_id: number,
    images: File[]
}

export interface createProduct {
    name: string,
    price: number,
    stock: number,
    image: File[] | null,
    description: string,
}

export interface CartProduct {
  quantity: number,
  product: Product,
}
