class Api::SponsorshipsController < ApplicationController
    def list
        sponsors = Sponsor.all
        sponsorships = sponsors.map do |sponsor|
            {
                sponsor: sponsor,
                sponsees: sponsor.sponsees
            }
        end
        
        render json: sponsorships
    end
    
    def show
    end
    
    def new
    end
    
    def create
    end
    
    def edit
    end
    
    def update
    end
    
    def delete
    end
end
