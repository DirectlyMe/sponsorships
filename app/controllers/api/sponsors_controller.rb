class Api::SponsorsController < ApplicationController
    def list
        render json: User.sponsor.all
    end
    
    def create
    end
    
    def update
    end
    
    def delete
    end
end
