import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const input1 = screen.getByPlaceholderText('write blog title here')
  const sendButton = screen.getByText('create')

  await user.type(input1, 'testing title input...')

  const input2 = screen.getByPlaceholderText('write blog author here')
  await user.type(input2, 'testing author input...')

  const input3 = screen.getByPlaceholderText('write blog url here')
  await user.type(input3, 'testing url input...')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing title input...')
  expect(createBlog.mock.calls[0][0].author).toBe('testing author input...')
  expect(createBlog.mock.calls[0][0].url).toBe('testing url input...')
})
