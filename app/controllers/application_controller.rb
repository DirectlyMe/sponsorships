# Main application controller
class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    # before any action on any controller, make sure the user is authorized
    # can be disabled on a controller with skip_before_action :authorized
    before_action :authorized

    # does the user exist?
    def logged_in?
        return false unless session[:user_id]

        User.find_by_id(session[:user_id]).present?
    end

    def authorized
        redirect_to '/auth/login' unless logged_in?
    end
end
