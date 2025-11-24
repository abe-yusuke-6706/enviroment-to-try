class CreateProducts < ActiveRecord::Migration[7.2]
  def change
    create_table :products do |t|
      t.string :name,            null: false
      t.integer :price,          null: false
      t.integer :image,          null: false
      t.string :description,     null: false
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
