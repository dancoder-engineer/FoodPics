# FoodBook 

A Social Media app where people can upload their pictures of food and recipes, along with descriptions. Also has notifications, comments, and private messages - everything you'd expect from a social media site.

## Installation

```bash
npm install
npm run build
mv ./build/* public

bundle install
bundle exec rake db:migrate 
bundle exec rake db:seed 
```

## Usage

```bash
npm start
```

```bash
rails s
```

Then you can make an account and upload all the pics of food and recipes you want (of course, you can also just go to https://foodbook-awo0.onrender.com/ and do that on a live version of the site.)

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)