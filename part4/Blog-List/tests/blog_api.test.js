const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
   await Blog.deleteMany({})
   let blogObject = new Blog(helper.initialBlogs[0])
   await blogObject.save()
   blogObject = new Blog(helper.initialBlogs[1])
   await blogObject.save()
})

describe('fetching blogs from database', () => {

   test('blogs are returned as json', async () => {
      await api
         .get('/api/blogs')
         .expect(200)
         .expect('Content-Type', /application\/json/)
   })

   test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')

      expect(response.body).toHaveLength(helper.initialBlogs.length)
   })

   test('unique identifier property of the blog posts is named id', async () => {
      const response = await api.get('/api/blogs')

      for (objItem of response.body) {
         expect(Object.keys(objItem)).toContain("id")

         for (prop in objItem) {
            expect(prop).toBeDefined();
         }
      }
   })
})

describe('blog posts and errors', () => {

   test('verify that a POST request to the /api/blogs successfully creates a new blog post', async () => {
      const newBlog = {
         title: "Learning node.js is a lot of fun",
         author: "Selsky Atomov",
         url: "www.focusOnYourAbilities.test",
         likes: 176
      }

      await api
         .post('/api/blogs')
         .send(newBlog)
         .expect(201)
         .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const titles = response.body.map(r => r.title)

      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
      expect(titles).toContain(
         'Learning node.js is a lot of fun'
      )
   })

   test('if the likes property is missing, it will default to 0', async () => {
      const newBlog = {
         title: "Advancing to a new era",
         author: "Abdel Chustra",
         url: "www.moretocome.test"
      }

      await api
         .post('/api/blogs')
         .send(newBlog)
         .expect(201)

      const response = await api.get('/api/blogs')
      const savedBlog = response.body.find(blog => blog.title === "Advancing to a new era")
      expect(Object.keys(savedBlog)).toContain("likes")
      expect(savedBlog.likes).toBe(0)
   })

   test('verify missing title or url properties', async () => {
      const newBlog1 = {
         title: "The harder the better",
         url: "www.findnewideas.test",
         likes: 218
      }

      const newBlog2 = {
         author: "Anuli Wangui",
         url: "www.fineprogramms.test",
         likes: 86
      }

      await api
         .post('/api/blogs')
         .send(newBlog1)
         .expect(400)

      await api
         .post('/api/blogs')
         .send(newBlog2)
         .expect(400)
   })
})


test('verify functionality for deleting a single blog post', async () => {
   const blogsAtStart = await api.get('/api/blogs')
   const blogToDelete = blogsAtStart.body[0]

   await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

   const blogsAtEnd = await api.get('/api/blogs')

   expect(blogsAtEnd.body).toHaveLength(
      blogsAtStart.body.length - 1
   )

   const titles = blogsAtEnd.body.map(r => r.title)

   expect(titles).not.toContain(blogToDelete.title)
})

test('verify functionality for updating the information of an individual blog post', async () => {
   const blogsAtStart = await api.get('/api/blogs')
   const blogToUpdate = blogsAtStart.body[0]

   const updateToProperty = {
      likes: 55
   }

   await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateToProperty)
      .expect(200)

   const resultBlog = await api
      .get(`/api/blogs/${blogToUpdate.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

   expect(resultBlog.body.likes).toBe(updateToProperty.likes)
})

describe('when there is initially one user in db', () => {
   beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()
   })

   test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
         username: 'mluukkai',
         name: 'Matti Luukkainen',
         password: 'salainen',
      }

      await api
         .post('/api/users')
         .send(newUser)
         .expect(201)
         .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
   })

   test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
         username: 'root',
         name: 'Superuser',
         password: 'salainen',
      }

      const result = await api
         .post('/api/users')
         .send(newUser)
         .expect(400)
         .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('expected `username` to be unique')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toEqual(usersAtStart)
   })
})

afterAll(async () => {
   await mongoose.connection.close()
})