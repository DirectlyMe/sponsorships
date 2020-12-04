# Main application controller
class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    before_action :authorized
    helper_method :current_user
    helper_method :logged_in?

    def current_user
        # make sure the session has a user_id key
        return false unless session.key?(:user_id)

        p session[:user_id]
        # does the user_id exist?
        User.find(session[:user_id])
    end

    def logged_in?
        current_user
    end

    def authorized
        redirect_to '/auth/login' unless logged_in?
    end
end
