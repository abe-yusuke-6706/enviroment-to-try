class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

  def sign_up_params
    params.permit(:email, :password, :password_confirmation, :name)
  end

  def account_update_params
    params.permit(:email, :password, :password_confirmation, :name, :avatar)
  end

  def update_resource(resource, account_update_params)

    begin
      if account_update_params[:password].present?
        resource.update(account_update_params)
      else
        resource.update_without_password(account_update_params)
      end
    rescue => e
      Rails.logger.info e.full_message
    end
    
  end
end