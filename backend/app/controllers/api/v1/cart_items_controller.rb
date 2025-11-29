class Api::V1::CartItemsController < ApplicationController
    # before_action :authenticate_user!
    
    def create
        item = current_api_v1_user.cart_items.find_or_initialize_by(product_id: params[:product_id])
        item.quantity += params[:quantity].to_i
        item.save!

        render json: item, status: :created
    end
end
