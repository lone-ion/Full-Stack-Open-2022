import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, buttonReveal, updateLikes, deleteBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const showDeleteButton = { display: buttonReveal ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!detailsVisible)
    return (
      <div
        data-testid='blog-list'
        className='non-detailed-blog'
        style={blogStyle}
      >
        {blog.title} {blog.author}
        <button onClick={() => setDetailsVisible(true)}>show</button>
      </div>
    )

  return (
    <div data-testid='blog-list' className='detailed-blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setDetailsVisible(false)}>hide</button>
      <br />
      {blog.url} <br />
      likes {blog.likes}
      <button onClick={updateLikes}>like</button>
      <br />
      {blog.user.name} <br />
      <button onClick={deleteBlog} style={showDeleteButton}>
        delete
      </button>
    </div>
  )
}

Blog.propTypes = {
  deleteBlog: PropTypes.func,
  updateLikes: PropTypes.func,
  blog: PropTypes.object.isRequired,
  buttonReveal: PropTypes.bool,
}

export default Blog
