5.times do |n|
  user = User.first

  Product.create!(
    name: Faker::Commerce.product_name,
    price: Faker::Commerce.price(range: 1000..5000).to_i,
    image: "../nothing_image.png",
    description: Faker::Lorem.characters(number: 150),
    user: user
  )
end