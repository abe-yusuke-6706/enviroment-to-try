class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::Cookies
  # class CsrfProtectionError < StandardError; end
  
  # skip_before_action :verify_authenticity_token
  # helper_method :current_user, :user_signed_in?
  # before_action :check_csrf
  
  private

  # def check_csrf
  #   return if request.get? || request.head?

  #   allowed_origins = [
  #     "http://localhost:3000",
  #     "http://localhost:5173" 
  #   ]

  #   origin = request.headers["Origin"]

  #   if origin.blank? || !allowed_origins.include?(origin)
  #     raise CsrfProtectionError
  #   end

  #   allowed_values = ["same-origin", "same-site"]
  #   sec_fetch_site = request.headers["Sec-Fetch-Site"]

  #   if sec_fetch_site.present? && !allowed_values.include?(sec_fetch_site.downcase)
  #     raise CsrfProtectionError
  #   end
  # end
end
