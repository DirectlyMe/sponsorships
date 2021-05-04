# Main entry point for sponsorship functionality
class Api::SponsorshipsController < ApplicationController
    # /api/sponsorships/sponsors
    def list_sponsors
        sponsors = User.sponsor.all
        sponsorships = sponsors.map do |sponsor|
            {
                sponsor: sponsor,
                sponsees: sponsor.sponsees
            }
        end

        render json: sponsorships, status: 200
    end

    # /api/sponsorships/sponsees
    def list_sponsees
        sponsees = User.sponsee.all
        sponsorships = sponsees.map do |sponsee|
            {
                sponsee: sponsee,
                sponsors: sponsee.sponsors
            }
        end

        render json: sponsorships, status: 200
    end

    # /api/sponsorships/sponsor/:id
    def sponsor
        sponsor = User.sponsor.find(params[:id])

        render json: {
            sponsor: sponsor,
            sponsees: sponsor.sponsees
        }, status: 200
    end

    # /api/sponsorships/sponsee/:id
    def sponsee
        sponsee = User.sponsee.find(params[:id])

        render json: {
            sponsee: sponsee,
            sponsors: sponsee.sponsors
        }, status: 200
    end

    def show
    end

    def new
    end

    # POST /api/sponsorships
    # Allow a Handler to create a Sponsorship between a Sponsor and Sponsee
    def create
        create_params = params.require([:sponsor_id, :sponsee_id, :handler_id])
        sponsor = User.sponsor.find_by(id: create_params[:sponsor_id])
        sponsee = User.sponsee.find_by(id: create_params[:sponsee_id])
        creator = User.handler.find_by(id: create_params[:creator_id])

        return unless sponsor.present? && sponsee.present? && creator.present?

        if creator.sponsees.include?(sponsee)
            Sponsorship.create(sponsor_id: sponsor.id, sponsee_id: sponsee.id)
            render plain: 'Sponsorship created', status: 200
        else
            render plain: 'User does not have permission to assign sponsorship to provided sponsee', status: 401
        end
    end

    def edit
    end

    def update
    end

    def delete
    end
end
