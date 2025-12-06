class Api::V1::CreditCardsController < ApplicationController
  def create
    card_token = credit_card_params[:card_token]

    begin
      charge = Payjp::Charge.create(
        :description => "user_id: #{current_api_v1_user.id}",
        :card => card_token,
        :email => current_api_v1_user.email,
      )

      credit_card = CreditCard.new(token: card_token, user_id: current_api_v1_user.id)
      credit_card.save!

      render json: { user_id: current_api_v1_user.id }, status: :ok
    rescue => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  private

  def credit_card_params
    params.require(:credit_card).permit(:card_token)
  end
end
