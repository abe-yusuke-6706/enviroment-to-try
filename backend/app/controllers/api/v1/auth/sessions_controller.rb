class Api::V1::Auth::SessionsController < ApplicationController
  def index
    user = nil
    begin
      user = current_api_v1_user
    rescue => e
      Rails.logger.error("current_api_v1_user error: #{e.message}")
    end

    if user
      render json: { is_login: true, data: user }
    else
      render json: { is_login: false, message: "ユーザーが存在しません" }
    end
  end
end
