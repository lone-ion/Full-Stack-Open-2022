import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect, test } from 'vitest'

test('renders title and author only', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Helsinki Uni',
    url: 'https://fullstackopen.com',
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText(
    'Component testing is done with react-testing-library Helsinki Uni',
  )
})

test('clicking the button returns also url and likes', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Helsinki Uni',
    url: 'https://fullstackopen.com',
    likes: 17,
    user: {
      name: 'Sotiris'
    }
  }

const { container } = render(<Blog blog={blog} />)

const user = userEvent.setup()
const button = screen.getByText('show')
await user.click(button)

const div = container.querySelector('.detailed-blog')
expect(div).toHaveTextContent('https://fullstackopen.com')
expect(div).toHaveTextContent('likes 17')
})