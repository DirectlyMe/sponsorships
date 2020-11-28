class Api::SponseesController < ApplicationController
    def list
        render json: Sponsee.all
    end

    def create
    end

    def update
    end

    def delete
    end
end
