import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    // function has been passed from App component as a prop
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewUrl('')
    setNewAuthor('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            value={newTitle}
            name='newTitle'
            onChange={({ target }) => setNewTitle(target.value)}
            placeholder='write blog title here'
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={newAuthor}
            name='newAuthor'
            onChange={({ target }) => setNewAuthor(target.value)}
            placeholder='write blog author here'
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={newUrl}
            name='newUrl'
            onChange={({ target }) => setNewUrl(target.value)}
            placeholder='write blog url here'
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm
