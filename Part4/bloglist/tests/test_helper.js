const Blog = require('../models/blog')

const initialBlog = [
  {
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    url: 'https://www.amazon.com/s?k=Robert+T.+Kiyosaki&i=audible&ref=dp_byline_sr_audible_1',
    likes: 10,
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    url: 'https://www.amazon.com/dp/0374533555?tag=investopedia-onsite-prod-20&linkCode=ogi&th=1&psc=1&ascsubtag=5093331%7Cn89600ad299054c5581819fe5c6c54add17Robert T. Kiyosaki%7C',
    likes: 5,
  },
  {
    title: 'Warren Buffett and the Business of Life',
    author: ' Alice Schroeder',
    url: 'https://www.amazon.com/dp/0553805096?tag=investopedia-onsite-prod-20&linkCode=ogi&th=1&psc=1&ascsubtag=5093331%7Cn89600ad299054c5581819fe5c6c54add17%7C',
    likes: 7,
  },
  {
    title: 'A Random Walk Down Wall Street',
    author: 'Burton G. Malkiel',
    url: 'https://www.amazon.com/dp/0393352242?tag=investopedia-onsite-prod-20&linkCode=ogi&th=1&psc=1&ascsubtag=5093331%7Cn89600ad299054c5581819fe5c6c54add17%7C',
    likes: 8,
  },
  {
    title: 'The Basics of Bitcoins and Blockchains',
    author: 'Antony Lewis',
    url: 'https://www.amazon.com/dp/1633538001?tag=investopedia-onsite-prod-20&linkCode=ogi&th=1&psc=1&ascsubtag=5093331%7Cn89600ad299054c5581819fe5c6c54add17%7C',
    likes: 4,
  },
]

const notExistingId = async () => {
  const blog = new Blog({ title: 'React fullstack', author: 'flame' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogInDb = async () => {
  const blog = await Blog.find({})
  return blog.map((blog) => blog.toJSON())
}

module.exports = { initialBlog, notExistingId, blogInDb }
