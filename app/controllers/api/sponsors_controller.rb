class Api::SponsorsController < ApplicationController
    def list
        render json: Sponsor.all
    end
    
    def create
    end
    
    def update
    end
    
    def delete
    end
end
