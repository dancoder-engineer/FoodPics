#!/usr/bin/env bash
# exit on error
set -o errexit

# Add build commands for front end

npm install && npm run build
mv ./build/* public

bundle install
bundle exec rake db:migrate 
bundle exec rake db:seed 


