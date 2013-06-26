class CreateGameUsers < ActiveRecord::Migration
  def change
    create_table :game_users do |t|
      t.integer :game_id
      t.integer :user_id
      t.integer :num_airplanes, :default => 3
      t.timestamps
    end
  end
end
