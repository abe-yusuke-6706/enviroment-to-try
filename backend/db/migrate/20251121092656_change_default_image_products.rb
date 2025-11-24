class ChangeDefaultImageProducts < ActiveRecord::Migration[7.2]
  def change
    change_column_default :products, :image, "../nothing_image.png"
  end
end
