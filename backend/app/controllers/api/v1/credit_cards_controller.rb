class Api::V1::CreditCardsController < ApplicationController
  def index
    Payjp.api_key = ENV["PAYJP_SECRET_KEY"]
    card = CreditCard.find_by(user_id: current_api_v1_user.id)

    customer = Payjp::Customer.retrieve(card.customer_id) 
    @credit_cards = customer.cards.data

    render json: { credit_cards: @credit_cards }, status: :ok
  end

  def create
    Payjp.api_key = ENV['PAYJP_SECRET_KEY']
    
    begin
      credit_card = CreditCard.find_by(user_id: current_api_v1_user.id)

      if credit_card.present?
        customer = Payjp::Customer.retrieve(credit_card.customer_id)
        customer.cards.create(
          card: credit_card_params[:card_token] 
        )
      else
        customer = Payjp::Customer.create(
          description: "user_id: #{current_api_v1_user.id}", 
          card: credit_card_params[:card_token] 
        )
      end

      credit_card = CreditCard.new(
        customer_id: customer.id,
        token: credit_card_params[:card_token],
        user_id: current_api_v1_user.id
      )

      credit_card.save!

      render json: { user_id: current_api_v1_user.id }, status: :ok
    rescue => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  # def create
  #   Payjp.api_key = ENV['PAYJP_SECRET_KEY']
  #   card_token = credit_card_params[:card_token]

  #   begin
  #     charge = Payjp::Charge.create(
  #       amount: 50,
  #       currency: 'jpy',
  #       card: card_token,
  #       description: "user_id: #{current_api_v1_user.id}"
  #     )

  #     credit_card = CreditCard.new(token: card_token, user_id: current_api_v1_user.id)
  #     credit_card.save!

  #     render json: { user_id: current_api_v1_user.id }, status: :ok
  #   rescue => e
  #     render json: { error: e.message }, status: :unprocessable_entity
  #   end
  # end

  private

  def credit_card_params
    params.require(:credit_card).permit(:card_token)
  end
end
