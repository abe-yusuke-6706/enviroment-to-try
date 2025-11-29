class Api::V1::OrderItemsController < ApplicationController
    def create

        begin
            created_items = order_items_params.each do |item_params|
                order_item = OrderItem.create!(item_params.merge(user_id: current_api_v1_user.id))
                cart_item = current_api_v1_user.cart_items.find_by(product_id: order_item.product_id)
                cart_item.destroy
            end

            render json: created_items, status: :created
        rescue => e
            Rails.logger.error e.full_message
            render json: { error: e.message }, status: 500
        end
    end

    def order_items_params
        params.require(:order_items).values.map(&:permit!)
    end
end
