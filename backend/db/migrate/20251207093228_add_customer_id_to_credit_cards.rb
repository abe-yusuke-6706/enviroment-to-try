class AddCustomerIdToCreditCards < ActiveRecord::Migration[7.2]
  def change
    add_column :credit_cards, :customer_id, :integer, null: false
  end
end
