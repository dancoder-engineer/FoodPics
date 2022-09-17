class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :UserName
      t.string :password_digest
      t.string :ActualName
      t.text :Description
      t.string :Pronouns
      t.string :Website
      t.timestamps

      
    end
  end
end

=begin



HM	Followings
HM	Posts 

=end
