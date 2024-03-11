var mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    emailId: String,
    password: String,

})

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    createdAt : Date,
})
const User = mongoose.model('user', userSchema)
const Blog = mongoose.model('Blog', blogSchema)
module.exports = {
    Blog,
    User
}