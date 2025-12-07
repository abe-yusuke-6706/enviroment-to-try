# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_one_attached :avatar
  has_many :cart_items, dependent: :destroy
  has_many :products, through: :cart_items

  has_many :order_items, dependent: :destroy
  has_many :ordering_products, through: :order_items

  has_many :credit_cards, dependent: :destroy
end
