# Sponsorships

This program functions as both the backend API and Web frontend for the Sponsorships application.

# Getting Started
## Install Postgres 13.1:
- For Mac/Linux: `brew install postgresql@13`
- For Windows: [Postgres Install Page](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)


## Create a sponsorships Role:
Once Postgres 13.1 is installed a 'sponsorships' role must be created. 
Running the following commands in your terminal (assuming psql is in your PATH) should create the Super User required by the Rails app. 
- `createdb <your_os_username>`
- `psql -v ON_ERROR_STOP=1 -c "CREATE ROLE sponsorships LOGIN SUPERUSER"`

## Setup language tooling
### Install rbenv:
Rbenv is a ruby version manager, it's typically considered the best way to manage ruby versions on a development system.
- For Mac/Linux: `brew install rbenv`
- For Windows: [rbenv windows installer](https://github.com/nak1114/rbenv-win)

This app relies on ruby version 2.7.1, once rbenv is installed run 
- `rbenv install 2.7.1`
- within your project directory run `rbenv local 2.7.1`

### Install Yarn:
Yarn is responsible for installing javascript dependencies.
- For Mac/Linux: `brew install yarn`
- For Windows: [yarn windows installer](https://classic.yarnpkg.com/en/docs/install/#windows-stable)

## Setting up the App:
Now that we have rbenv and yarn, we should be able to download/build all the app's dependencies.
### Install Gemfile (Ruby) dependencies
- From your projects root directory run `bundle install`
### Install package.json (Javascript) dependencies
- From your projects root directory run `yarn install`

### Scaffold the sponsorships database:
- create the app databases `rake db:create`
- scaffold the new databases `rake db:migrate`
- seed the database with test data `rake db:seed`

### Start the App:
- From the projects root directory run `bundle exec rails server`
- By default the app will be run on `localhost:3000`

## Conclusion:
Once all of the prior steps have been completed you should have a working version of the sponsorships rails app.
I've attempted to cover everything I could think of. If there are any undocumented problems that you encounter while setting up this app please modify the ReadMe.md with the problems you encountered and the steps you employed to solve them.
