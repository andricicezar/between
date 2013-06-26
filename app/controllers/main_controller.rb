class MainController < ApplicationController
  include ApplicationHelper

  before_filter :authenticate_user!
  before_filter :user_online

  def index
    "qqq"	
  end

  def index2
    current_user.online
    respond_to do |format|
      format.json { render :json => 1}
    end
  end

  def ranking
    id = params[:id].to_i
    if id > 1
      @prev = id-1
    end
    @users = User.order('elo DESC').offset((id-1)*7).limit(7)

    if User.offset(id*7).first
      @next = id+1
    end
  end

end
