# Main entry point for sponsorship functionality
class Api::SponsorshipsController < ApplicationController
    def list_sponsors
        sponsors = Sponsor.all
        sponsorships = sponsors.map do |sponsor|
            {
                sponsor: sponsor,
                sponsees: sponsor.sponsees
            }
        end

        render json: sponsorships, status: 200
    end

    def list_sponsees
        sponsees = Sponsee.all
        sponsorships = sponsees.map do |sponsee|
            {
                sponsee: sponsee,
                sponsors: sponsee.sponsors
            }
        end

        render json: sponsorships, status: 200
    end

    def sponsor
        sponsor = Sponsor.find(params[:id])

        render json: {
            sponsor: sponsor,
            sponsees: sponsor.sponsees
        }, status: 200
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
