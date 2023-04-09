const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

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
      expect(Object.keys(objItem)).toContain("id")

      for (prop in objItem) {
         expect(prop).toBeDefined();
      }
   }
})

test('verify that a POST request to the /api/blogs successfully creates a new blog post', async () => {
   const newBlog = {
      title: "Learning node.js is a lot of fun",
      author: "Selsky Atomov",
      url: "www.focusOnYourAbilities.test",
      likes: "176"
   }

   await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

   const response = await api.get('/api/blogs')

   const titles = response.body.map(r => r.title)

   expect(response.body).toHaveLength(initialBlogs.length + 1)
   expect(titles).toContain(
      'Learning node.js is a lot of fun'
   )
})

afterAll(async () => {
   await mongoose.connection.close()
})