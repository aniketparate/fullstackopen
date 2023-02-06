const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObject = helper.initialBlog.map((blog) => new Blog(blog))
  const promiseArray = blogObject.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('checking for root', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const blogs = await api.get('/api/blogs')

  expect(blogs.body).toHaveLength(helper.initialBlog.length)
})

test('unique identifier property of blog posts is names id', async () => {
  const blogs = await api.get('/api/blogs')

  blogs.body.forEach((blog) => {
    expect(blog.id).toBeDefined()
  })
})

test('a valid note can be added', async () => {
  const blogObject = {
    title: 'A title',
    author: 'An author',
    url: 'www.somebook.com',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(blogObject)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlog.length + 1)

  const author = blogsAtEnd.map((blog) => blog.author)
  expect(author).toContain('An author')
})

test('like is missing then set 0 by default', async () => {
  const blogObject = {
    title: 'randomTitle',
    author: 'randomAuthor',
    url: 'www.somerandombook.com',
  }

  await api
    .post('/api/blogs')
    .send(blogObject)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogInDb()
  const sendBlog = blogsAtEnd.find((blog) => blog.title === 'randomTitle')
  expect(sendBlog.likes).toBe(0)
})

test('check for missing title and author', async () => {
  const blogObject = {
    author: 'XYZ',
    likes: 9,
  }

  await api.post('/api/blogs').send(blogObject).expect(400)

  const blogsAtEnd = await helper.blogInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlog.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
