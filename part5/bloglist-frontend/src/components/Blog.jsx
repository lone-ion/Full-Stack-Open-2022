import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, buttonReveal, userName, updateLikes, deleteBlog }) => {
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
      <div className='non-detailed-blog' style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setDetailsVisible(true)}>show</button>
      </div>
    )

  return (
    <div className='detailed-blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setDetailsVisible(false)}>hide</button>
      <br />
      {blog.url} <br />
      likes {blog.likes}
      <button onClick={updateLikes}>like</button>
      <br />
      {blog.user.name || userName} <br />
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
  userName: PropTypes.string,
  buttonReveal: PropTypes.bool,
}

export default Blog
