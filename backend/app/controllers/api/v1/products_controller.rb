class Api::V1::ProductsController < ApplicationController
    # before_action :authenticate_user!, except: [:index,:show]

    def index
        @products = Product.includes(images_attachments: :blob).all

        render json: @products.map { |product|
        {
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          stock: product.stock,
          user_id: product.user_id,
          images: product.images.map { |img|
            {
              id: img.id,
              filename: img.filename.to_s,
              url: url_for(img)
            }
          }
        }
      }
    end

    def show
        product = Product.find(params[:id])

        render json: {
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          stock: product.stock,
          user_id: product.user_id,
          images: product.images.map { |img|
            {
              id: img.id,
              filename: img.filename.to_s,
              url: url_for(img)
            }
          }
        }
    end

  def create
    @product = Product.new(product_params.merge(user_id: current_api_v1_user.id))
    
    begin
      @product.save!

      render json: @product, status: :created
    rescue => e
      Rails.logger.error e.full_message
      render json: { error: e.message }, status: 500
    end
  end

  def update
    product = Product.find(params[:id])
    
    scalar_attributes = update_product_attributes
    
    image_ids_to_purge = update_product_params[:image_ids]
    new_images = update_product_params[:images]

    begin
      product.update!(scalar_attributes)
      
      if image_ids_to_purge.present?
        product.images.attachments.where(id: image_ids_to_purge).each(&:purge)
      end

      if new_images.present?
        product.images.attach(new_images)
      end
    
      render json: product, status: :ok
    rescue => e
      Rails.logger.error e.full_message
      render json: { error: e.message }, status: 500
    end
  end

  private

    def product_params
      params.require(:product).permit(:name, :price, :stock, :description, images: [])
    end

    def update_product_params
      params.require(:product).permit(:name, :price, :stock, :description, images: [], image_ids: [])
    end

    def update_product_attributes
      params.require(:product).permit(:name, :price, :stock, :description)
    end

end
