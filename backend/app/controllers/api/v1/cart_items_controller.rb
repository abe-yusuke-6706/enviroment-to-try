class Api::V1::CartItemsController < ApplicationController
    def index
        items = current_api_v1_user.cart_items.includes(product: [images_attachments: :blob])

        render json: items.map { |item|
            {
                quantity: item.quantity,
                product: {
                    id: item.product.id,
                    name: item.product.name,
                    price: item.product.price,
                    description: item.product.description,
                    stock: item.product.stock,
                    images: item.product.images.map { |img|
                        {
                            id: img.id,
                            url: url_for(img)
                        }
                    }
                }
            }
        }
    end
    
    def create
        item = current_api_v1_user.cart_items.find_or_initialize_by(product_id: params[:product_id])
        item.quantity += params[:quantity].to_i
        item.save!

        render json: item, status: :created
    end
end
