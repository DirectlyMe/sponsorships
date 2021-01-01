class Api::SponseesController < ApplicationController
    def list
        render json: User.sponsee.all
    end

    def create
    end

    def update
    end

    def delete
    end
end
