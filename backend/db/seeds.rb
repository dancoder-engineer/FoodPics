# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Message.destroy_all

Message.create({
    sender: 4,
    recipient: 5,
    content: "Message 1"
})

Message.create({
    sender: 5,
    recipient: 4,
    content: "Message 2"
})

Message.create({
    sender: 5,
    recipient: 4,
    content: "Message 3"
})

Message.create({
    sender: 3,
    recipient: 4,
    content: "Message 4"
})

Message.create({
    sender: 4,
    recipient: 5,
    content: "Message 5"
})

Message.create({
    sender: 3,
    recipient: 4,
    content: "Message 5"
})

Message.create({
    sender: 1,
    recipient: 2,
    content: "Message 6"
})

Message.create({
    sender: 4,
    recipient: 3,
    content: "Message 7"
})

Message.create({
    sender: 1,
    recipient: 4,
    content: "Message 8"
})