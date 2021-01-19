class Api::HandlerRelationsController < ApplicationController
    # /api/handler_relations/handlers
    def list_handlers
        handlers = User.handler.all
        handler_relations = handlers.map do |handler|
            {
                handler: handler,
                sponsees: handler.sponsees
            }
        end

        render json: handler_relations, status: 200
    end

    # /api/handler_relations/sponsees
    def list_sponsees
        sponsees = User.sponsee.all
        handler_relations = sponsees.map do |sponsee|
            {
                sponsee: sponsee,
                handlers: sponsee.handlers
            }
        end

        render json: handler_relations, status: 200
    end

    # /api/handler_relations/handler/:id?include_sponsors=true/false
    def handler
        handler = User.handler.find(params.require(:id))
        sponsees = if params.key?(:include_sponsors) && params[:include_sponsors] == 'true'
                       handler.sponsees.map { |sponsee| sponsee.attributes.merge({ sponsors: sponsee.sponsors }) }
                   else
                       handler.sponsees
                   end

        render json: {
            handler: handler,
            sponsees: sponsees
        }, status: 200
    end

    # /api/handler_relations/sponsee/:id
    def sponsee
        sponsee = User.sponsee.find(params[:id])

        render json: {
            sponsee: sponsee,
            handlers: sponsee.handlers
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
