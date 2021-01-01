# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

test_password = 'Test!123'

# create user_types
admin_type = UserType.create! name: 'admin'
sponsor_type = UserType.create! name: 'sponsor'
sponsee_type = UserType.create! name: 'sponsee'
handler_type = UserType.create! name: 'handler'

# create assistances
free_room = Assistance.create! name: 'Free Room'
teach_cooking = Assistance.create! name: 'Teach Cooking'

# create an organization
org = Organization.create! name: 'Hope Institute'

# create an admin user
admin = User.create! username: 'admin', password_digest: BCrypt::Password.create(test_password),
                     email: 'admin@sponsorships-app.com', user_types_id: admin_type.id, first_name: 'Admin',
                     last_name: 'Sponsor'

# create a test sponsor and sponsee
sponsor = User.create! username: 'testa', password_digest: BCrypt::Password.create(test_password),
                       email: 'testing20191@tester.com', user_types_id: sponsor_type.id, first_name: 'Joshua',
                       last_name: 'Schneider'
sponsee = User.create! username: 'Pete', password_digest: BCrypt::Password.create(test_password),
                       email: 'test@tester21231.com', user_types_id: sponsee_type.id, first_name: 'Pete', last_name: 'Fleb'
handler = User.create! username: 'DefaultHandler', password_digest: BCrypt::Password.create(test_password),
                       email: 'handler@tester21231.com', user_types_id: handler_type.id, first_name: 'Handy',
                       last_name: 'McHand', organization_id: org.id


# create an association between the sponsor and sponsee
sponsorship = Sponsorship.create! sponsor_id: sponsor.id, sponsee_id: sponsee.id

# create an associate between the handler and the sponsee
HandlerRelation.create! handler_id: handler.id, sponsee_id: sponsee.id

# create an agreed upon services for the sponsorship
AgreedService.create! sponsorships_id: sponsorship.id, assistances_id: free_room.id
AgreedService.create! sponsorships_id: sponsorship.id, assistances_id: teach_cooking.id

# create action items
ActionItem.create user_id: admin.id, subject: 'test subject', detail: { test: 'testing detail' }, complete: false
ActionItem.create user_id: handler.id, subject: 'test subject', detail: { test: 'testing detail' }, complete: false
