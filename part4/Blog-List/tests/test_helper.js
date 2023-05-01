const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
   {
      title: "Super easy programming tools",
      author: "Mia Lasa",
      url: "www.searchTech.test",
      likes: "115"
   },
   {
      title: "There is something out there",
      author: "Pietr Blachos",
      url: "www.theUnknown.test",
      likes: "307"
   },
]

const initialUsers = [
   {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen"
   },
   {
      username: "root",
      name: "superuser",
      password: "biscot"
   },
   {
      username: "hellas",
      name: "Arto Hellas",
      password: "forever"
   }
]

const blogsInDb = async () => {
   const blogs = await Blog.find({})
   return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
   const users = await User.find({})
   return users.map(u => u.toJSON())
}

module.exports = {
   initialBlogs, initialUsers, blogsInDb, usersInDb
}