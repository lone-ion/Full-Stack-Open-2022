const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
   {
      content: '',
      important: false,
   },
   {
      content: '',
      important: true,
   },
]

beforeEach(async () => {
   await Blog.deleteMany({})
   let blogObject = new Blog(initialBlogs[0])
   await blogObject.save()
   blogObject = new Blog(initialBlogs[1])
   await blogObject.save()
})

test('blogs are returned as json', async () => {
   await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
   const response = await api.get('/api/blogs')

   expect(response.body).toHaveLength(initialBlogs.length)
})


// test('a specific note is within the returned notes', async () => {
//    const response = await api.get('/api/notes')

//    const contents = response.body.map(r => r.content)
//    expect(contents).toContain('Browser can execute only JavaScript')
// })


test('unique identifier property of the blog posts is named id', async () => {
   const response = await api.get('/api/blogs')

   for (objItem of response.body) {
      for (prop in objItem) {
         expect(prop).toBeDefined();
      }
   }

})

afterAll(async () => {
   await mongoose.connection.close()
})