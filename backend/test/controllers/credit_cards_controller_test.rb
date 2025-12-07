require "test_helper"

class CreditCardsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get credit_cards_create_url
    assert_response :success
  end
end
