# メインのテストユーザー
first_user = User.create!(
  name: "テストユーザー",
  nickname: "ニックネーム",
  email: "hoge@example.com",
  password: "password",
  confirmed_at: Time.current
)

second_user = User.create!(
  name: "テストユーザー2",
  nickname: "ニックネーム2",
  email: "hoge2@example.com",
  password: "password",
  confirmed_at: Time.current
)

# クレジットカードはAPI側とずれが発生する可能性があるのでコメントアウトしている
# CreditCard.create!(user: user1, token: "tok_test_123", customer_id: "cus_test_abc")

products_data = [
  { name: "カナダ産メイプルシロップ", price: 2500, description: "芳醇な香りの100%天然シロップ", stock: 50 },
  { name: "スイス製高級腕時計", price: 150000, description: "精密なムーブメントを搭載した逸品", stock: 5 },
  { name: "エンジニア向けHHKBキーボード", price: 35000, description: "最高の打鍵感を提供するキーボード", stock: 15 },
  { name: "セルコホーム風 模型ハウス", price: 5000, description: "輸入住宅の美しさを再現したミニチュア", stock: 10 },
  { name: "プログラミング実践ガイド", price: 3800, description: "Rails 7.2対応の最新解説書", stock: 100 }
]

products = products_data.map do |data|
  Product.create!(
    data.merge(user_id: second_user.id) 
  )
end

CartItem.create!(user: first_user, product: products[0], quantity: 2)
CartItem.create!(user: second_user, product: products[2], quantity: 1)

order_items_data = [
  { user: first_user, product: products[1], price: products[1].price, quantity: 1 },
  { user: second_user, product: products[4], price: products[4].price, quantity: 1 }
]

order_items_data.each do |item|
  OrderItem.create!(item)
end

puts "Seeds created successfully!"