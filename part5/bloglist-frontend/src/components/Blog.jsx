import { useState } from 'react'

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!detailsVisible)
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setDetailsVisible(true)}>show</button>
      </div>
    )

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <br />
      {blog.url} <br />
      likes {blog.likes} <button>like</button> <br />
      {blog.user.name} <br />
      <button onClick={() => setDetailsVisible(false)}>hide</button>
    </div>
  )
}

export default Blog
