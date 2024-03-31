import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newLikes, setNewLikes] = useState('')
  const [newBlog, setNewBlog] = useState({})

  // not a clever solution but updates the flag triggers the useEffect
  const [displayBlogsAfterDeletion, setDisplayBlogsAfterDeletion] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
  const [createButtonVisible, setCreateButtonVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [newLikes, displayBlogsAfterDeletion, newBlog])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const addBlog = async (blogObject) => {
    const response = await blogService.create(blogObject)
    setNewBlog(response)
    setCreateButtonVisible(false)
    setInfoMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`)
    setTimeout(() => {
      setInfoMessage(null)
    }, 5000)
  }

  const blogForm = () => {
    const hideWhenVisible = { display: createButtonVisible ? 'none' : '' }
    const showWhenVisible = { display: createButtonVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateButtonVisible(true)}>create</button>
        </div>
        <div style={showWhenVisible}>
          <h2>create new</h2>
          <BlogForm createBlog={addBlog} />
          <button onClick={() => setCreateButtonVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const handleUserLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const updateBlog = async (id, likes) => {
    const likesObject = {
      likes,
    }

    await blogService.update(id, likesObject)
    setNewLikes((previousLikes) => previousLikes + 1)
  }

  const handleDelete = async (blogObject) => {
    if (
      window.confirm(
        `Remove blog "${blogObject.title}" by ${blogObject.author}?`
      )
    ) {
      await blogService.remove(blogObject.id)
      // add 1 to change flag and trigger the useEffect hook
      setDisplayBlogsAfterDeletion((previousValue) => previousValue + 1)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={infoMessage} />
      <p>
        {user.name} logged-in
        <button onClick={() => handleUserLogout()}>log out</button>
      </p>
      {blogForm()}
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            buttonReveal={user.name === (blog.user.name || user.name)}
            updateLikes={() => updateBlog(blog.id, blog.likes + 1)}
            deleteBlog={() => handleDelete(blog)}
          />
        ))}
    </div>
  )
}

export default App
