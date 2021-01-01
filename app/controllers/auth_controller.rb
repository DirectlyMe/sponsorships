# Handle login page and authentication
class AuthController < ApplicationController
    include UserRoles
    skip_before_action :authorized

    def show; end

    def login
        return unless params['username'] && params['password']

        user = User.find_by_username(params['username'])

        # check user permissions
        unless ADMIN_CONSOLE_ROLES.include? user.role
            flash.alert = 'You do not have the appropriate role'
            redirect_to '/auth/login'
            return
        end

        @valid = user.authenticate(params['password']) unless user.nil?
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
