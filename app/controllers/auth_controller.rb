# Handle login page and authentication
class AuthController < ApplicationController
    def show
    end

    def login
        return unless params['username'] && params['password']

        user = User.find_by_username(params['username'])
        @valid = user.authenticate(params['password'])
    end
end
