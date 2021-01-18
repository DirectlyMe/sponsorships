class UsersController < ApplicationController
    include UserConcerns
    skip_before_action :authorized, only: [:new, :create, :current_user]

    def index
        @users = User.all
    end

    def new
        @user = User.new
    end

    # /users/:id
    def show
        user = User.find(params[:id])
        profile_image_path = user.profile_image.attached? ? rails_blob_path(user.profile_image) : nil
        render json: {
            user_id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            description: user.description,
            employee_id: user.employee_id,
            action_items: user.action_items,
            sponsees: user.sponsees,
            profile_image: profile_image_path
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

    # /users/current_user
    def current_user
        # return the user_id or a -1 if they are not authenticated
        render json: {
            user_id: !session[:user_id].nil? && session[:user_id].positive? ? session[:user_id] : -1
        }
    end

    def update
        user = User.find_by(id: params.require(:id))
        return not_found if user.nil?

        # did they send a new profile image?
        user.profile_image.attach(update_params[:profile_image]) if update_params.key?(:profile_image)

        # updated values, don't update the profile_image
        user.assign_attributes(update_params.reject { |attr| attr == :profile_image })
        user.save!

        render json: {
            status: 'updated'
        }
    end

    private

    def user_params
        params.require(:user).permit(:username, :password, :salt, :encrypted_password, :user_types_id)
    end

    def update_params
        params.permit(:first_name, :last_name, :email, :image_url, :phone, :description, :employee_id)
    end
end
