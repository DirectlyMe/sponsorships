class UsersController < ApplicationController
    # TODO: in the future we'll need to change what can be accessed without being authorized
    skip_before_action :authorized, only: [:new, :create]

    def index
        @users = User.all
    end

    def new
        @user = User.new
    end

    def show
        user = User.find(params[:id])
        render json: {
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
            action_items: user.action_items
        }
    end

    def create
        @user = User.new(user_params)
        if @user.save
            p @user.errors.count
            redirect_to @user, alert: 'User created successfully'
        else
            redirect_to new_user_path, alert: 'Error creating user'
        end
    end

    def current_user
        render json: {
            user_id: session[:user_id]
        }
    end

    private

    def user_params
        params.require(:user).permit(:username, :password, :salt, :encrypted_password, :user_types_id)
    end
end
