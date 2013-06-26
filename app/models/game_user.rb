class GameUser < ActiveRecord::Base
  attr_accessible :user_id, :game_id, :num_airplanes
  belongs_to :game
  belongs_to :user
  default_scope order('created_at ASC')
  
end
