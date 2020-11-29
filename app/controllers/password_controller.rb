# handle all forgot and reset password requests
class PasswordController < ApplicationController
    def reset
        # check for the token in a form submission
        token ||= params['token']
        # check if the token came in through the URL on a GET request
        token ||= request.query_parameters['token']
        render status: 404 unless token

        @user = User.find_by_reset(token) or not_found
        # is this a form submission with a new password?
        return unless params['password']

        @user.password = params['password']
        @user.save
        render plain: 'Successfully reset password'
    end

    def forgot
        return unless params['email']

        user = User.find_by_email(params['email']) or not_found
        if user
            token = SecureRandom.hex(10)
            user.reset = token
            user.save
            ResetMailer.with(user: user).reset_password.deliver_now
        end
        render plain: 'A link has been sent to that email if it exists'
    end
end
