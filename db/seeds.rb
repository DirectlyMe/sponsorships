# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# create a test sponsor and sponsee
sponsor = Sponsor.create first_name: 'Jack', last_name: 'Testa'
sponsee = Sponsee.create first_name: 'Pete', last_name: 'Fleb'
# create an association between the sponsor and sponsee
Sponsorship.create sponsor_id: sponsor.id, sponsee_id: sponsee.id

# give the sponsor a service
service = Service.create name: 'Free Room'
# associate the service with the sponsor
SponsorService.create sponsor_id: sponsor.id, service_id: service.id
