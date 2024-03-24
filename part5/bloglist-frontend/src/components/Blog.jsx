import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateLikes }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

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
      likes {blog.likes}
      <button onClick={updateLikes}>like</button>
      <br />
      {blog.user.name} <br />
      <button onClick={() => setDetailsVisible(false)}>hide</button>
    </div>
  )
}

export default Blog
