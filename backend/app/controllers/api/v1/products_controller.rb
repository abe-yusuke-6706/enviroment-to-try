class Api::V1::ProductsController < ApplicationController
    # before_action :authenticate_user!, except: [:index,:show]

    def index
        @products = Product.all

        render json: @products
    end

    def show
        @product = Product.find(params[:id])

        render json: @product
    end

  def create
    @product = Product.new(product_params.except(:images).merge(user_id: current_api_v1_user.id))
@product.save!    
    # begin


    #   if product_params[:images].present?
    #     product_params[:images].each do |image|
    #       @product.images.attach(image)
    #     end
    #   end

    #   render json: @product, status: :created
    # rescue => e
    #   Rails.logger.error e.full_message
    #   render json: { error: e.message }, status: 500
    # end
  end


  private

    def product_params
        params.require(:product).permit(:name, :price, :stock, :description, images: [])
    end

end
