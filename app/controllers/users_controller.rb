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
            role: user.role,
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

        # filter all updatable parameters that were provided and update them
        updated_attrs = params.select { |attr| (user.attributes.include? attr) && (!READ_ONLY_ATTRS.include? attr.to_sym) }
        user.assign_attributes(updated_attrs)

        # did they send a new profile image?
        user.profile_image.attach(params[:profile_image]) if params.key?(:profile_image)

        # save all updated values
        user.save!

        render json: {
            status: 'updated'
        }
    end

    private

    def user_params
        params.require(:user).permit(:username, :password, :salt, :encrypted_password, :user_types_id)
    end
end
