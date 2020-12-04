# Handle login page and authentication
class AuthController < ApplicationController
    skip_before_action :authorized

    def show; end

    def login
        return unless params['username'] && params['password']

        user = User.find_by_username(params['username'])
        @valid = user.authenticate(params['password'])
        if @valid
            session[:user_id] = user.id
            redirect_to '/'
        else
            flash.alert = 'Username or password incorrect'
            redirect_to '/auth/login'
        end
    end

    def logout
        session[:user_id] = nil
    end
end
