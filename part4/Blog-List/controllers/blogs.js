const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.title === undefined || body.author === undefined) {
    return response.status(400).json({ error: 'bad request'})
  }
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  console.log(blog);
  const result = await blog.save()
  response.status(201).json(result)

})

module.exports = blogsRouter