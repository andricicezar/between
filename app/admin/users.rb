ActiveAdmin.register User do
  scope_to do
    Class.new do
      def self.users
        User.unscoped
      end
    end
  end

  index do                            
    column :id
    column :nickname do |user|
      if user.deleted
        div :class => "looser" do
          user.nickname
        end
      else
        user.nickname
      end
    end
    column :last_sign_in_at           
    column :wins, :sortable => false
    column :losses, :sortable => false
    default_actions                   
  end                                 

  filter :email                       

  form do |f|                         
    f.inputs "Update Details" do       
      f.input :email                  
      f.input :deleted
      f.input :is_ai 
    end                               
    f.actions                         
  end 
end
