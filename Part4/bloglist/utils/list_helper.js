const dummy = (blogs) => {
  if (blogs) {
    return 1
  } else {
    return 0
  }
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const blog = blogs.map((blog) => blog.likes)
  const max = Math.max(...blog)
  if (blogs.length === 0) {
    return {}
  } else {
    const blogObject = blogs.find((blog) => blog.likes === max)
    return {
      title: blogObject.title,
      author: blogObject.author,
      likes: blogObject.likes,
    }
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    const blog = blogs.map((blog) => blog.author)
    const count = {}
    blog.forEach((b) => (count[b] ? count[b]++ : (count[b] = 1)))
    const max = Math.max(...Object.values(count))
    const author = Object.keys(count).filter((author) => count[author] === max)

    return {
      author: author[0],
      blogs: max,
    }
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    const a = []
    blogs.map((blog) => {
      a.push({ author: blog.author, likes: blog.likes })
    })
    const blog = {}
    a.forEach((x) =>
      blog[x.author] ? (blog[x.author] += x.likes) : (blog[x.author] = x.likes)
    )
    const max = Math.max(...Object.values(blog))
    const author = Object.keys(blog).filter((author) => blog[author] === max)

    return {
      author: author[0],
      likes: max,
    }
  }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
