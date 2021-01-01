# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_01_01_025827) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "action_items", force: :cascade do |t|
    t.bigint "user_id"
    t.string "subject"
    t.jsonb "detail"
    t.boolean "complete"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_action_items_on_user_id"
  end

  create_table "agreed_services", force: :cascade do |t|
    t.bigint "sponsorships_id", null: false
    t.bigint "assistances_id", null: false
    t.string "notes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["assistances_id"], name: "index_agreed_services_on_assistances_id"
    t.index ["sponsorships_id"], name: "index_agreed_services_on_sponsorships_id"
  end

  create_table "assistances", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "handler_relations", force: :cascade do |t|
    t.bigint "handler_id", null: false
    t.bigint "sponsee_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["handler_id"], name: "index_handler_relations_on_handler_id"
    t.index ["sponsee_id"], name: "index_handler_relations_on_sponsee_id"
  end

  create_table "needs", force: :cascade do |t|
    t.bigint "sponsee_id", null: false
    t.bigint "assistances_id", null: false
    t.string "notes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["assistances_id"], name: "index_needs_on_assistances_id"
    t.index ["sponsee_id"], name: "index_needs_on_sponsee_id"
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "services", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "sponsor_id", null: false
    t.bigint "assistances_id", null: false
    t.string "notes"
    t.index ["assistances_id"], name: "index_services_on_assistances_id"
    t.index ["sponsor_id"], name: "index_services_on_sponsor_id"
  end

  create_table "sponsorships", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "sponsor_id", null: false
    t.bigint "sponsee_id", null: false
    t.index ["sponsee_id"], name: "index_sponsorships_on_sponsee_id"
    t.index ["sponsor_id"], name: "index_sponsorships_on_sponsor_id"
  end

  create_table "user_types", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "email"
    t.string "reset"
    t.bigint "user_types_id", null: false
    t.string "first_name"
    t.string "last_name"
    t.bigint "organization_id"
    t.index ["organization_id"], name: "index_users_on_organization_id"
    t.index ["user_types_id"], name: "index_users_on_user_types_id"
  end

  add_foreign_key "agreed_services", "assistances", column: "assistances_id"
  add_foreign_key "agreed_services", "sponsorships", column: "sponsorships_id"
  add_foreign_key "handler_relations", "users", column: "handler_id"
  add_foreign_key "handler_relations", "users", column: "sponsee_id"
  add_foreign_key "needs", "assistances", column: "assistances_id"
  add_foreign_key "needs", "users", column: "sponsee_id"
  add_foreign_key "services", "assistances", column: "assistances_id"
  add_foreign_key "services", "users", column: "sponsor_id"
  add_foreign_key "sponsorships", "users", column: "sponsee_id"
  add_foreign_key "sponsorships", "users", column: "sponsor_id"
  add_foreign_key "users", "user_types", column: "user_types_id"
end
