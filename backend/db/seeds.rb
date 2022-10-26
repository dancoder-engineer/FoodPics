# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Message.destroy_all
Notification.destroy_all
Tag.destroy_all
Posttag.destroy_all
User.destroy_all
Post.destroy_all
Comment.destroy_all
Recipe.destroy_all



user = User.create({
    UserName: "Dan",
    password: "a",
    ActualName: "Dan Seminara",
    Description: "Welcome to my website! Enjoy all the pictures of food and recipes!!",
    Pronouns: "He/Him",
    Website: "http://this.one",
})

user.avatar.attach({io: File.open('./pics/Dan.png'), filename: 'Dan.png'})




post = Post.create({
    title: "Welcome to FoodBook!",
    place: "Right Here",
    description: "Welcome to FoodBook, my Module 5 project for Flatiron School, as well as the future of culinary social media! This post will give you an idea of what you can do here and how it works.\r\n\r\nFirst, you'll notice that posts can have pictures, but if you click on the left or right side of them, you can scroll through all the different pictures in the post. This post has two pictures. Try going between them.",
    user_id: user.id,
    captions: "Here's a pizza in the shape of Pac-Man. It's got vegetables and meat on it and pools of cheese baked into the crust. Good stuff. There's another picture in this post, as well.||Very good! Not you see the delicious bowl of soup! Did you know that this post has a recipe, as well? Below here, you can see a ↓. Try clicking anywhere you see that to open and close the recipe.\r\n\r\nYou might notice a ↓ up there on the header, as well. Try clicking it and see what happens. Incidentally, anytime you open anything like that, you can click the line of text again, now that there's a ↑ there. That will close it.",
})

post.pics.attach([
    {io: File.open('./pics/pizza.jpg'), filename: 'Dan.png'},
     {io: File.open('./pics/soup.jpg'), filename: 'Dan.png'}
    ])

    tag = Tag.create({tag: "foodie"})

posttag = Posttag.create({
    post_id: post.id,
    tag_id: tag.id
})

recipe = Recipe.create({
    title: "Daiya Pizza",
    ingredientlist: "1 Pizza dough\r\nLots of tomato sauce\r\nTons of Daiya Cheese",
    guide: "Roll out the pizza dough, put the tomato sauce on it, and put the Daiya cheese on top. Bake until ready.",
    post_id: post.id,
})

recipe.pic.attach({io: File.open('./pics/daiyapizza.jpg'), filename: 'Dan.png'})







userb = User.create({
    UserName: "Dan2",
    password: "a",
    ActualName: "Dan Seminara",
    Description: "Welcome to my website! Enjoy all the pictures of food and recipes!!",
    Pronouns: "He/Him",
    Website: "http://this.one",
})

userb.avatar.attach({io: File.open('./pics/Dan.png'), filename: 'Dan.png'})

Following.create({
    follower: userb.id,
    followee: user.id
})