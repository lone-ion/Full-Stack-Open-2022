import { render, screen } from '@testing-library/react'
import Blog from './Blog'

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
