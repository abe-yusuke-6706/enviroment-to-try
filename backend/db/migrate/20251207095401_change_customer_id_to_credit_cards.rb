class ChangeCustomerIdToCreditCards < ActiveRecord::Migration[7.2]
  def change
    change_column :credit_cards, :customer_id, :string, null: false, default: ""
  end
end
