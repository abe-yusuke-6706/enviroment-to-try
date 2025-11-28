class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
    private

    def sign_up_params
      params.permit(:email, :password, :password_confirmation, :name)
    end

    def update_resource(resource, params)
      resource.update_without_password(params)
  end
end