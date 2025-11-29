class Api::V1::Auth::AvatarsController < ApplicationController
#   before_action :authenticate_api_v1_user!

  def show
    if current_api_v1_user.avatar.attached?
        render json: { avatar_url: rails_blob_url(current_api_v1_user.avatar, only_path: false) }
    else
      render json: { avatar_url: nil }
    end
  end
end
