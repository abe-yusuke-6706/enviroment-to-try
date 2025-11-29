# require 'user_serializer'

class Api::V1::Auth::TokenValidationsController < ApplicationController
    def validate_token
        if current_api_v1_user
            render json: current_api_v1_user
        else
            render json: { data: nil }
        end
    end
end
