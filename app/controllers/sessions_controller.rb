# app/controllers/sessions_controller.rb
class SessionsController < ApplicationController

  def omniauth
    user = User.from_omniauth(request.env['omniauth.auth'])
    if user.valid?
      session[:user_id] = user.id
      redirect_to "/"
    else 
      redirect_to "/login"
    end
  end

  def logout
    session.delete(:user_id)
    redirect_to "/login"
  end
end