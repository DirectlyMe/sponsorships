class ServicesController < ApplicationController
    def list
        render json: Service.all
    end
end
